const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: '3t-system-appv3',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const createMaintenanceLogRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateMaintenanceLog', inputVars);
}
createMaintenanceLogRef.operationName = 'CreateMaintenanceLog';
exports.createMaintenanceLogRef = createMaintenanceLogRef;

exports.createMaintenanceLog = function createMaintenanceLog(dcOrVars, vars) {
  return executeMutation(createMaintenanceLogRef(dcOrVars, vars));
};

const listAvailableDevicesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAvailableDevices');
}
listAvailableDevicesRef.operationName = 'ListAvailableDevices';
exports.listAvailableDevicesRef = listAvailableDevicesRef;

exports.listAvailableDevices = function listAvailableDevices(dc) {
  return executeQuery(listAvailableDevicesRef(dc));
};

const updateRentalNotesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateRentalNotes', inputVars);
}
updateRentalNotesRef.operationName = 'UpdateRentalNotes';
exports.updateRentalNotesRef = updateRentalNotesRef;

exports.updateRentalNotes = function updateRentalNotes(dcOrVars, vars) {
  return executeMutation(updateRentalNotesRef(dcOrVars, vars));
};

const listStaffUsersCreatedBeforeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListStaffUsersCreatedBefore', inputVars);
}
listStaffUsersCreatedBeforeRef.operationName = 'ListStaffUsersCreatedBefore';
exports.listStaffUsersCreatedBeforeRef = listStaffUsersCreatedBeforeRef;

exports.listStaffUsersCreatedBefore = function listStaffUsersCreatedBefore(dcOrVars, vars) {
  return executeQuery(listStaffUsersCreatedBeforeRef(dcOrVars, vars));
};
