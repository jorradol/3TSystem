import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CreateMaintenanceLogData {
  maintenanceLog_insert: MaintenanceLog_Key;
}

export interface CreateMaintenanceLogVariables {
  deviceId: UUIDString;
  staffUserId: UUIDString;
  cost?: number | null;
  description: string;
  maintenanceDate: DateString;
  notes?: string | null;
  type: string;
}

export interface Customer_Key {
  id: UUIDString;
  __typename?: 'Customer_Key';
}

export interface Device_Key {
  id: UUIDString;
  __typename?: 'Device_Key';
}

export interface ListAvailableDevicesData {
  devices: ({
    id: UUIDString;
    model: string;
    manufacturer?: string | null;
    screenSizeInches?: number | null;
  } & Device_Key)[];
}

export interface ListStaffUsersCreatedBeforeData {
  staffUsers: ({
    id: UUIDString;
    fullName?: string | null;
    username: string;
    email?: string | null;
  } & StaffUser_Key)[];
}

export interface ListStaffUsersCreatedBeforeVariables {
  createdAt: TimestampString;
}

export interface MaintenanceLog_Key {
  id: UUIDString;
  __typename?: 'MaintenanceLog_Key';
}

export interface Rental_Key {
  id: UUIDString;
  __typename?: 'Rental_Key';
}

export interface StaffUser_Key {
  id: UUIDString;
  __typename?: 'StaffUser_Key';
}

export interface UpdateRentalNotesData {
  rental_update?: Rental_Key | null;
}

export interface UpdateRentalNotesVariables {
  id: UUIDString;
  notes?: string | null;
}

interface CreateMaintenanceLogRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateMaintenanceLogVariables): MutationRef<CreateMaintenanceLogData, CreateMaintenanceLogVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateMaintenanceLogVariables): MutationRef<CreateMaintenanceLogData, CreateMaintenanceLogVariables>;
  operationName: string;
}
export const createMaintenanceLogRef: CreateMaintenanceLogRef;

export function createMaintenanceLog(vars: CreateMaintenanceLogVariables): MutationPromise<CreateMaintenanceLogData, CreateMaintenanceLogVariables>;
export function createMaintenanceLog(dc: DataConnect, vars: CreateMaintenanceLogVariables): MutationPromise<CreateMaintenanceLogData, CreateMaintenanceLogVariables>;

interface ListAvailableDevicesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAvailableDevicesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListAvailableDevicesData, undefined>;
  operationName: string;
}
export const listAvailableDevicesRef: ListAvailableDevicesRef;

export function listAvailableDevices(): QueryPromise<ListAvailableDevicesData, undefined>;
export function listAvailableDevices(dc: DataConnect): QueryPromise<ListAvailableDevicesData, undefined>;

interface UpdateRentalNotesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateRentalNotesVariables): MutationRef<UpdateRentalNotesData, UpdateRentalNotesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateRentalNotesVariables): MutationRef<UpdateRentalNotesData, UpdateRentalNotesVariables>;
  operationName: string;
}
export const updateRentalNotesRef: UpdateRentalNotesRef;

export function updateRentalNotes(vars: UpdateRentalNotesVariables): MutationPromise<UpdateRentalNotesData, UpdateRentalNotesVariables>;
export function updateRentalNotes(dc: DataConnect, vars: UpdateRentalNotesVariables): MutationPromise<UpdateRentalNotesData, UpdateRentalNotesVariables>;

interface ListStaffUsersCreatedBeforeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListStaffUsersCreatedBeforeVariables): QueryRef<ListStaffUsersCreatedBeforeData, ListStaffUsersCreatedBeforeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListStaffUsersCreatedBeforeVariables): QueryRef<ListStaffUsersCreatedBeforeData, ListStaffUsersCreatedBeforeVariables>;
  operationName: string;
}
export const listStaffUsersCreatedBeforeRef: ListStaffUsersCreatedBeforeRef;

export function listStaffUsersCreatedBefore(vars: ListStaffUsersCreatedBeforeVariables): QueryPromise<ListStaffUsersCreatedBeforeData, ListStaffUsersCreatedBeforeVariables>;
export function listStaffUsersCreatedBefore(dc: DataConnect, vars: ListStaffUsersCreatedBeforeVariables): QueryPromise<ListStaffUsersCreatedBeforeData, ListStaffUsersCreatedBeforeVariables>;

