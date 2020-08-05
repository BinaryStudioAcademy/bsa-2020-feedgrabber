import apiClient from "../../../helpers/apiClient";

export const getData = async () => (await apiClient.get('/api/data')).data;
