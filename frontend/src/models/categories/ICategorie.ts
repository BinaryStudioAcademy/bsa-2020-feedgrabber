export interface ICategorie{
    id: string;
    title: string;
    companyName: string;
}

export interface ICategoriesState {
    list: string[];
    isLoading: boolean;
}
