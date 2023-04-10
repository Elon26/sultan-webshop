import { ICatalogItem } from "../models";

/** Функция создаёт строку с номерами страниц. */
const paginate = (
    items: ICatalogItem[],
    pageNumber: number,
    pageSize: number
): ICatalogItem[] => {
    const startIndex = (pageNumber - 1) * pageSize;
    return [...items].splice(startIndex, pageSize);
};

export default paginate;
