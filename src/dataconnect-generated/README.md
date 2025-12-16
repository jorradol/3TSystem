# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListAvailableDevices*](#listavailabledevices)
  - [*ListStaffUsersCreatedBefore*](#liststaffuserscreatedbefore)
- [**Mutations**](#mutations)
  - [*CreateMaintenanceLog*](#createmaintenancelog)
  - [*UpdateRentalNotes*](#updaterentalnotes)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListAvailableDevices
You can execute the `ListAvailableDevices` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listAvailableDevices(): QueryPromise<ListAvailableDevicesData, undefined>;

interface ListAvailableDevicesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAvailableDevicesData, undefined>;
}
export const listAvailableDevicesRef: ListAvailableDevicesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAvailableDevices(dc: DataConnect): QueryPromise<ListAvailableDevicesData, undefined>;

interface ListAvailableDevicesRef {
  ...
  (dc: DataConnect): QueryRef<ListAvailableDevicesData, undefined>;
}
export const listAvailableDevicesRef: ListAvailableDevicesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAvailableDevicesRef:
```typescript
const name = listAvailableDevicesRef.operationName;
console.log(name);
```

### Variables
The `ListAvailableDevices` query has no variables.
### Return Type
Recall that executing the `ListAvailableDevices` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAvailableDevicesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListAvailableDevicesData {
  devices: ({
    id: UUIDString;
    model: string;
    manufacturer?: string | null;
    screenSizeInches?: number | null;
  } & Device_Key)[];
}
```
### Using `ListAvailableDevices`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAvailableDevices } from '@dataconnect/generated';


// Call the `listAvailableDevices()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAvailableDevices();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAvailableDevices(dataConnect);

console.log(data.devices);

// Or, you can use the `Promise` API.
listAvailableDevices().then((response) => {
  const data = response.data;
  console.log(data.devices);
});
```

### Using `ListAvailableDevices`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAvailableDevicesRef } from '@dataconnect/generated';


// Call the `listAvailableDevicesRef()` function to get a reference to the query.
const ref = listAvailableDevicesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAvailableDevicesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.devices);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.devices);
});
```

## ListStaffUsersCreatedBefore
You can execute the `ListStaffUsersCreatedBefore` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listStaffUsersCreatedBefore(vars: ListStaffUsersCreatedBeforeVariables): QueryPromise<ListStaffUsersCreatedBeforeData, ListStaffUsersCreatedBeforeVariables>;

interface ListStaffUsersCreatedBeforeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListStaffUsersCreatedBeforeVariables): QueryRef<ListStaffUsersCreatedBeforeData, ListStaffUsersCreatedBeforeVariables>;
}
export const listStaffUsersCreatedBeforeRef: ListStaffUsersCreatedBeforeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listStaffUsersCreatedBefore(dc: DataConnect, vars: ListStaffUsersCreatedBeforeVariables): QueryPromise<ListStaffUsersCreatedBeforeData, ListStaffUsersCreatedBeforeVariables>;

interface ListStaffUsersCreatedBeforeRef {
  ...
  (dc: DataConnect, vars: ListStaffUsersCreatedBeforeVariables): QueryRef<ListStaffUsersCreatedBeforeData, ListStaffUsersCreatedBeforeVariables>;
}
export const listStaffUsersCreatedBeforeRef: ListStaffUsersCreatedBeforeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listStaffUsersCreatedBeforeRef:
```typescript
const name = listStaffUsersCreatedBeforeRef.operationName;
console.log(name);
```

### Variables
The `ListStaffUsersCreatedBefore` query requires an argument of type `ListStaffUsersCreatedBeforeVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListStaffUsersCreatedBeforeVariables {
  createdAt: TimestampString;
}
```
### Return Type
Recall that executing the `ListStaffUsersCreatedBefore` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListStaffUsersCreatedBeforeData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListStaffUsersCreatedBeforeData {
  staffUsers: ({
    id: UUIDString;
    fullName?: string | null;
    username: string;
    email?: string | null;
  } & StaffUser_Key)[];
}
```
### Using `ListStaffUsersCreatedBefore`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listStaffUsersCreatedBefore, ListStaffUsersCreatedBeforeVariables } from '@dataconnect/generated';

// The `ListStaffUsersCreatedBefore` query requires an argument of type `ListStaffUsersCreatedBeforeVariables`:
const listStaffUsersCreatedBeforeVars: ListStaffUsersCreatedBeforeVariables = {
  createdAt: ..., 
};

// Call the `listStaffUsersCreatedBefore()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listStaffUsersCreatedBefore(listStaffUsersCreatedBeforeVars);
// Variables can be defined inline as well.
const { data } = await listStaffUsersCreatedBefore({ createdAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listStaffUsersCreatedBefore(dataConnect, listStaffUsersCreatedBeforeVars);

console.log(data.staffUsers);

// Or, you can use the `Promise` API.
listStaffUsersCreatedBefore(listStaffUsersCreatedBeforeVars).then((response) => {
  const data = response.data;
  console.log(data.staffUsers);
});
```

### Using `ListStaffUsersCreatedBefore`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listStaffUsersCreatedBeforeRef, ListStaffUsersCreatedBeforeVariables } from '@dataconnect/generated';

// The `ListStaffUsersCreatedBefore` query requires an argument of type `ListStaffUsersCreatedBeforeVariables`:
const listStaffUsersCreatedBeforeVars: ListStaffUsersCreatedBeforeVariables = {
  createdAt: ..., 
};

// Call the `listStaffUsersCreatedBeforeRef()` function to get a reference to the query.
const ref = listStaffUsersCreatedBeforeRef(listStaffUsersCreatedBeforeVars);
// Variables can be defined inline as well.
const ref = listStaffUsersCreatedBeforeRef({ createdAt: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listStaffUsersCreatedBeforeRef(dataConnect, listStaffUsersCreatedBeforeVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.staffUsers);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.staffUsers);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateMaintenanceLog
You can execute the `CreateMaintenanceLog` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createMaintenanceLog(vars: CreateMaintenanceLogVariables): MutationPromise<CreateMaintenanceLogData, CreateMaintenanceLogVariables>;

interface CreateMaintenanceLogRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateMaintenanceLogVariables): MutationRef<CreateMaintenanceLogData, CreateMaintenanceLogVariables>;
}
export const createMaintenanceLogRef: CreateMaintenanceLogRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createMaintenanceLog(dc: DataConnect, vars: CreateMaintenanceLogVariables): MutationPromise<CreateMaintenanceLogData, CreateMaintenanceLogVariables>;

interface CreateMaintenanceLogRef {
  ...
  (dc: DataConnect, vars: CreateMaintenanceLogVariables): MutationRef<CreateMaintenanceLogData, CreateMaintenanceLogVariables>;
}
export const createMaintenanceLogRef: CreateMaintenanceLogRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createMaintenanceLogRef:
```typescript
const name = createMaintenanceLogRef.operationName;
console.log(name);
```

### Variables
The `CreateMaintenanceLog` mutation requires an argument of type `CreateMaintenanceLogVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateMaintenanceLogVariables {
  deviceId: UUIDString;
  staffUserId: UUIDString;
  cost?: number | null;
  description: string;
  maintenanceDate: DateString;
  notes?: string | null;
  type: string;
}
```
### Return Type
Recall that executing the `CreateMaintenanceLog` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateMaintenanceLogData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateMaintenanceLogData {
  maintenanceLog_insert: MaintenanceLog_Key;
}
```
### Using `CreateMaintenanceLog`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createMaintenanceLog, CreateMaintenanceLogVariables } from '@dataconnect/generated';

// The `CreateMaintenanceLog` mutation requires an argument of type `CreateMaintenanceLogVariables`:
const createMaintenanceLogVars: CreateMaintenanceLogVariables = {
  deviceId: ..., 
  staffUserId: ..., 
  cost: ..., // optional
  description: ..., 
  maintenanceDate: ..., 
  notes: ..., // optional
  type: ..., 
};

// Call the `createMaintenanceLog()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createMaintenanceLog(createMaintenanceLogVars);
// Variables can be defined inline as well.
const { data } = await createMaintenanceLog({ deviceId: ..., staffUserId: ..., cost: ..., description: ..., maintenanceDate: ..., notes: ..., type: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createMaintenanceLog(dataConnect, createMaintenanceLogVars);

console.log(data.maintenanceLog_insert);

// Or, you can use the `Promise` API.
createMaintenanceLog(createMaintenanceLogVars).then((response) => {
  const data = response.data;
  console.log(data.maintenanceLog_insert);
});
```

### Using `CreateMaintenanceLog`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createMaintenanceLogRef, CreateMaintenanceLogVariables } from '@dataconnect/generated';

// The `CreateMaintenanceLog` mutation requires an argument of type `CreateMaintenanceLogVariables`:
const createMaintenanceLogVars: CreateMaintenanceLogVariables = {
  deviceId: ..., 
  staffUserId: ..., 
  cost: ..., // optional
  description: ..., 
  maintenanceDate: ..., 
  notes: ..., // optional
  type: ..., 
};

// Call the `createMaintenanceLogRef()` function to get a reference to the mutation.
const ref = createMaintenanceLogRef(createMaintenanceLogVars);
// Variables can be defined inline as well.
const ref = createMaintenanceLogRef({ deviceId: ..., staffUserId: ..., cost: ..., description: ..., maintenanceDate: ..., notes: ..., type: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createMaintenanceLogRef(dataConnect, createMaintenanceLogVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.maintenanceLog_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.maintenanceLog_insert);
});
```

## UpdateRentalNotes
You can execute the `UpdateRentalNotes` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateRentalNotes(vars: UpdateRentalNotesVariables): MutationPromise<UpdateRentalNotesData, UpdateRentalNotesVariables>;

interface UpdateRentalNotesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateRentalNotesVariables): MutationRef<UpdateRentalNotesData, UpdateRentalNotesVariables>;
}
export const updateRentalNotesRef: UpdateRentalNotesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateRentalNotes(dc: DataConnect, vars: UpdateRentalNotesVariables): MutationPromise<UpdateRentalNotesData, UpdateRentalNotesVariables>;

interface UpdateRentalNotesRef {
  ...
  (dc: DataConnect, vars: UpdateRentalNotesVariables): MutationRef<UpdateRentalNotesData, UpdateRentalNotesVariables>;
}
export const updateRentalNotesRef: UpdateRentalNotesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateRentalNotesRef:
```typescript
const name = updateRentalNotesRef.operationName;
console.log(name);
```

### Variables
The `UpdateRentalNotes` mutation requires an argument of type `UpdateRentalNotesVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateRentalNotesVariables {
  id: UUIDString;
  notes?: string | null;
}
```
### Return Type
Recall that executing the `UpdateRentalNotes` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateRentalNotesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateRentalNotesData {
  rental_update?: Rental_Key | null;
}
```
### Using `UpdateRentalNotes`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateRentalNotes, UpdateRentalNotesVariables } from '@dataconnect/generated';

// The `UpdateRentalNotes` mutation requires an argument of type `UpdateRentalNotesVariables`:
const updateRentalNotesVars: UpdateRentalNotesVariables = {
  id: ..., 
  notes: ..., // optional
};

// Call the `updateRentalNotes()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateRentalNotes(updateRentalNotesVars);
// Variables can be defined inline as well.
const { data } = await updateRentalNotes({ id: ..., notes: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateRentalNotes(dataConnect, updateRentalNotesVars);

console.log(data.rental_update);

// Or, you can use the `Promise` API.
updateRentalNotes(updateRentalNotesVars).then((response) => {
  const data = response.data;
  console.log(data.rental_update);
});
```

### Using `UpdateRentalNotes`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateRentalNotesRef, UpdateRentalNotesVariables } from '@dataconnect/generated';

// The `UpdateRentalNotes` mutation requires an argument of type `UpdateRentalNotesVariables`:
const updateRentalNotesVars: UpdateRentalNotesVariables = {
  id: ..., 
  notes: ..., // optional
};

// Call the `updateRentalNotesRef()` function to get a reference to the mutation.
const ref = updateRentalNotesRef(updateRentalNotesVars);
// Variables can be defined inline as well.
const ref = updateRentalNotesRef({ id: ..., notes: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateRentalNotesRef(dataConnect, updateRentalNotesVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.rental_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.rental_update);
});
```

