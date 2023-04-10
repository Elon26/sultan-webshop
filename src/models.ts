export interface ICatalogItem {
    imgBig: string;
    imgSmall: string;
    name: string;
    dimensionType: string;
    dimension: string;
    barcode: string;
    manufacturer: string;
    brand: string;
    description: string;
    price: number;
    purposes: string[];
}

export interface ICatalog {
    [key: string]: ICatalogItem;
}

export interface ICartItem {
    barcode: string;
    price: number;
    quantity: number;
}

export interface ICart {
    [key: string]: ICartItem;
}

export interface ISort {
    name: string;
    direction: "asc" | "desc";
}

export interface IOtherFilters {
    minPrice: number;
    maxPrice: number;
    manufacturers: string[];
}

export interface IFormError {
    [key: string]: string;
}

export interface IStringObject {
    minPrice: string;
    maxPrice: string;
    [key: string]: string;
}
