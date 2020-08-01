export type IBindingCallback1<T> = (arg: T) => void;
export type IBindingCallback2<T1, T2> = (arg1: T1, arg2: T2) => void;
export type IBindingCallback3<T1, T2, T3> = (arg1: T1, arg2: T2, arg3: T3) => void;
export type IBindingAction = () => void;
export type IBindingFunction<T, TResult> = (data: T) => TResult;
