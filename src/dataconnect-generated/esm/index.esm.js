import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: '3t-system-appv3',
  location: 'us-east4'
};

export const createMaintenanceLogRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateMaintenanceLog', inputVars);
}
createMaintenanceLogRef.operationName = 'CreateMaintenanceLog';

export function createMaintenanceLog(dcOrVars, vars) {
  return executeMutation(createMaintenanceLogRef(dcOrVars, vars));
}

export const listAvailableDevicesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAvailableDevices');
}
listAvailableDevicesRef.operationName = 'ListAvailableDevices';

export function listAvailableDevices(dc) {
  return executeQuery(listAvailableDevicesRef(dc));
}

export const updateRentalNotesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateRentalNotes', inputVars);
}
updateRentalNotesRef.operationName = 'UpdateRentalNotes';

export function updateRentalNotes(dcOrVars, vars) {
  return executeMutation(updateRentalNotesRef(dcOrVars, vars));
}

export const listStaffUsersCreatedBeforeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListStaffUsersCreatedBefore', inputVars);
}
listStaffUsersCreatedBeforeRef.operationName = 'ListStaffUsersCreatedBefore';

export function listStaffUsersCreatedBefore(dcOrVars, vars) {
  return executeQuery(listStaffUsersCreatedBeforeRef(dcOrVars, vars));
}

