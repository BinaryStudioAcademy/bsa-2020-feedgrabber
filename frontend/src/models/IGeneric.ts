export interface IGeneric<T> {
    data: {
        data: T;
        error: string;
    };
}
