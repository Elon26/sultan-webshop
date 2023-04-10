import axios from "axios";
import { SERVER_URL } from "../constats";
import { ICatalog } from "../models";

/** Функция запрашивает в Firebasе и возвращает объект базы данных товаров. */
async function getProductsFromFirebase(): Promise<ICatalog> {
    const response = await axios.get<ICatalog>(SERVER_URL + "catalog.json/");
    return response.data;
}

export default getProductsFromFirebase;
