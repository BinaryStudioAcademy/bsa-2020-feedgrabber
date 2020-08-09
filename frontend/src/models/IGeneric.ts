import {AxiosResponse} from "axios";

export type IGeneric<T> = AxiosResponse<AppResponse<T>>

type AppResponse<T> = {
        data: T;
        error: string;
        statusCode: number;
}
