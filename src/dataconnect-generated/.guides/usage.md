# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useCreateMaintenanceLog, useListAvailableDevices, useUpdateRentalNotes, useListStaffUsersCreatedBefore } from '@dataconnect/generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useCreateMaintenanceLog(createMaintenanceLogVars);

const { data, isPending, isSuccess, isError, error } = useListAvailableDevices();

const { data, isPending, isSuccess, isError, error } = useUpdateRentalNotes(updateRentalNotesVars);

const { data, isPending, isSuccess, isError, error } = useListStaffUsersCreatedBefore(listStaffUsersCreatedBeforeVars);

```

Here's an example from a different generated SDK:

```ts
import { useListAllMovies } from '@dataconnect/generated/react';

function MyComponent() {
  const { isLoading, data, error } = useListAllMovies();
  if(isLoading) {
    return <div>Loading...</div>
  }
  if(error) {
    return <div> An Error Occurred: {error} </div>
  }
}

// App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyComponent from './my-component';

function App() {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>
    <MyComponent />
  </QueryClientProvider>
}
```



## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createMaintenanceLog, listAvailableDevices, updateRentalNotes, listStaffUsersCreatedBefore } from '@dataconnect/generated';


// Operation CreateMaintenanceLog:  For variables, look at type CreateMaintenanceLogVars in ../index.d.ts
const { data } = await CreateMaintenanceLog(dataConnect, createMaintenanceLogVars);

// Operation ListAvailableDevices: 
const { data } = await ListAvailableDevices(dataConnect);

// Operation UpdateRentalNotes:  For variables, look at type UpdateRentalNotesVars in ../index.d.ts
const { data } = await UpdateRentalNotes(dataConnect, updateRentalNotesVars);

// Operation ListStaffUsersCreatedBefore:  For variables, look at type ListStaffUsersCreatedBeforeVars in ../index.d.ts
const { data } = await ListStaffUsersCreatedBefore(dataConnect, listStaffUsersCreatedBeforeVars);


```