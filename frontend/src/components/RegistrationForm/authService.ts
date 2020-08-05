import { callApi } from "helpers/api.helper";
import {IRegistrationRequest} from "./IRegistrationRequest";
import {IFetchArgsData} from "../../models/IFetchArgsData";

export const registration = async (request: IRegistrationRequest) => {
    const response = await callApi( {
        endpoint: "/api/auth/register",
        type: "POST",
        requestData: request as object
    } as IFetchArgsData);

    return response.json();
};
