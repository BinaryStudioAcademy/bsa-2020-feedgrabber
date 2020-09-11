import {NormalizedState} from "../reducers/formEditor/reducer";

export function getCurrentEntity<T>(table: NormalizedState<T>) {
    return table.entities && table.entities[table.currentId];
}

export function getById<T>(id: string, table: NormalizedState<T>) {
    return table.entities && table.entities[id];
}
