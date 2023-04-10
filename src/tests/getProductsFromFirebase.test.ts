import getProductsFromFirebase from "../services/getProductsFromFirebase";
import { defaultDataBase } from "../testsConstats";

/** Тест проверяет базу данных Firebase на полное соответствие с её изначальным состоянием. */
describe("getProductsFromFirebase", () => {
    test("Проверка наличия изменений в Firebase", async () => {
        const data = await getProductsFromFirebase();
        expect(data).toEqual(defaultDataBase);
    });
});
