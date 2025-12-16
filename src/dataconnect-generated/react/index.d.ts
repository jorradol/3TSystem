import { CreateMaintenanceLogData, CreateMaintenanceLogVariables, ListAvailableDevicesData, UpdateRentalNotesData, UpdateRentalNotesVariables, ListStaffUsersCreatedBeforeData, ListStaffUsersCreatedBeforeVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateMaintenanceLog(options?: useDataConnectMutationOptions<CreateMaintenanceLogData, FirebaseError, CreateMaintenanceLogVariables>): UseDataConnectMutationResult<CreateMaintenanceLogData, CreateMaintenanceLogVariables>;
export function useCreateMaintenanceLog(dc: DataConnect, options?: useDataConnectMutationOptions<CreateMaintenanceLogData, FirebaseError, CreateMaintenanceLogVariables>): UseDataConnectMutationResult<CreateMaintenanceLogData, CreateMaintenanceLogVariables>;

export function useListAvailableDevices(options?: useDataConnectQueryOptions<ListAvailableDevicesData>): UseDataConnectQueryResult<ListAvailableDevicesData, undefined>;
export function useListAvailableDevices(dc: DataConnect, options?: useDataConnectQueryOptions<ListAvailableDevicesData>): UseDataConnectQueryResult<ListAvailableDevicesData, undefined>;

export function useUpdateRentalNotes(options?: useDataConnectMutationOptions<UpdateRentalNotesData, FirebaseError, UpdateRentalNotesVariables>): UseDataConnectMutationResult<UpdateRentalNotesData, UpdateRentalNotesVariables>;
export function useUpdateRentalNotes(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateRentalNotesData, FirebaseError, UpdateRentalNotesVariables>): UseDataConnectMutationResult<UpdateRentalNotesData, UpdateRentalNotesVariables>;

export function useListStaffUsersCreatedBefore(vars: ListStaffUsersCreatedBeforeVariables, options?: useDataConnectQueryOptions<ListStaffUsersCreatedBeforeData>): UseDataConnectQueryResult<ListStaffUsersCreatedBeforeData, ListStaffUsersCreatedBeforeVariables>;
export function useListStaffUsersCreatedBefore(dc: DataConnect, vars: ListStaffUsersCreatedBeforeVariables, options?: useDataConnectQueryOptions<ListStaffUsersCreatedBeforeData>): UseDataConnectQueryResult<ListStaffUsersCreatedBeforeData, ListStaffUsersCreatedBeforeVariables>;
