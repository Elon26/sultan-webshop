import divideNumber from "../utils/divideNumber";

/** Тест проверяет корректность установки разделителя у функции. */
describe("divideNumber", () => {
    test("Число 1-3 порядка с разделителем", () => {
        expect(divideNumber(500)).toEqual("500");
    });
    test("Число 4-6 порядка с разделителем", () => {
        expect(divideNumber(1000)).toEqual("1 000");
    });
    test("Число 7-9 порядка с разделителями", () => {
        expect(divideNumber(1000000)).toEqual("1 000 000");
    });
    test("Число 4-6 порядка без разделителя", () => {
        expect(divideNumber(2000)).not.toEqual("2000");
    });
    test("Число 7-9 порядка без разделителя в начале", () => {
        expect(divideNumber(2000000)).not.toEqual("2000 000");
    });
    test("Число 7-9 порядка без разделителя в конце", () => {
        expect(divideNumber(2000000)).not.toEqual("2 000000");
    });
    test("Число 7-9 порядка без обоих разделителей", () => {
        expect(divideNumber(2000000)).not.toEqual("2000000");
    });
});
