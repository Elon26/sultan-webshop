import axios from "axios";
import { SERVER_URL } from "../constats";
import { ICatalogItem } from "../models";

/** Функция выполняет загрузку в Firebasе товара, принятого в качестве аргумента. */
async function addProductToFirebase(
    id: string,
    data: ICatalogItem
): Promise<void> {
    await axios.put(SERVER_URL + "catalog/" + id + ".json", data);
}

export default addProductToFirebase;
