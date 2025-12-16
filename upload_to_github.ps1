param([string]$PAT)

if (-not $PAT) { $PAT = $env:GITHUB_PAT }
if (-not $PAT) {
    Write-Error "PAT not provided (parameter -PAT or env GITHUB_PAT). Aborting."
    exit 1
}

$headers = @{ Authorization = "token $PAT"; 'User-Agent' = '3TSystem-Uploader' }
$repoName = '3TSystem'
$body = @{ name = $repoName; description = 'Uploaded by script'; private = $false } | ConvertTo-Json
try {
    $create = Invoke-RestMethod -Uri 'https://api.github.com/user/repos' -Method Post -Headers $headers -Body $body -ContentType 'application/json' -ErrorAction Stop
    $owner = $create.owner.login
    Write-Host "Created repo: $($create.html_url)"
} catch {
    Write-Warning "Create repo failed: $_. Attempting to use existing repo if present."
    try {
        $user = Invoke-RestMethod -Uri 'https://api.github.com/user' -Method Get -Headers $headers -ErrorAction Stop
        $owner = $user.login
        $create = Invoke-RestMethod -Uri "https://api.github.com/repos/$owner/$repoName" -Method Get -Headers $headers -ErrorAction Stop
        Write-Host "Using existing repo: $($create.html_url)"
    } catch {
        Write-Error "Could not access existing repo or determine owner: $_"
        exit 2
    }
}
$files = Get-ChildItem -Recurse -File | Where-Object { $_.FullName -notmatch '\\node_modules\\' -and $_.FullName -notmatch '\\' + '.git' -and $_.FullName -notmatch '\\dist\\' }
foreach ($f in $files) {
    $rel = $f.FullName.Substring((Get-Location).Path.Length+1).Replace('\\','/')
    Write-Host "Uploading: $rel"
    $bytes = [System.IO.File]::ReadAllBytes($f.FullName)
    $b64 = [System.Convert]::ToBase64String($bytes)
    $putBody = @{ message = "Add $rel"; content = $b64; branch = 'main' }
    try {
        $resp = Invoke-RestMethod -Uri "https://api.github.com/repos/$owner/$repoName/contents/$rel" -Method Put -Headers $headers -Body ($putBody | ConvertTo-Json) -ContentType 'application/json' -ErrorAction Stop
        Write-Host "Uploaded: $rel"
    } catch {
        $err = $_
        # If file exists, GET its sha and retry with sha to update
        try {
            $existing = Invoke-RestMethod -Uri "https://api.github.com/repos/$owner/$repoName/contents/$rel?ref=main" -Method Get -Headers $headers -ErrorAction Stop
            $putBody.sha = $existing.sha
            $putBody.message = "Update $rel"
            $resp2 = Invoke-RestMethod -Uri "https://api.github.com/repos/$owner/$repoName/contents/$rel" -Method Put -Headers $headers -Body ($putBody | ConvertTo-Json) -ContentType 'application/json' -ErrorAction Stop
            Write-Host "Updated: $rel"
        } catch {
            Write-Warning ([string]::Format('Failed to upload {0}: {1}', $rel, $_))
        }
    }
}
Write-Host "Upload complete. Repo URL: $($create.html_url)"
