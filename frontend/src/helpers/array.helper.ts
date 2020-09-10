export function replaceAtIndex<T>(arr: T[], val: T, index: number) {
    return [...arr.slice(0, index), val, ...arr.slice(index + 1)];
}

export function deleteAtIndex(arr, index: number) {
    arr.splice(index, 1);
    return [...arr];
}

export function insertAtIndex(arr, index: number, elemenent) {
    arr.splice(index, 0, elemenent);
    return [...arr];
}

export function arrayMove(arr, oldIndex, newIndex) {
    if (newIndex >= arr.length) {
        let k = newIndex - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
    return [...arr];
}
