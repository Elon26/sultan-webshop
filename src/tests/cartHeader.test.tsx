import { render, screen } from "@testing-library/react";
import * as reduxHooks from "react-redux";
import CartHeader from "../components/ui/cartHeader";
import { MemoryRouter } from "react-router-dom";
import { testTotalPriceAndQuantity } from "../testsConstats";

jest.mock("react-redux");

/** Тест проверяет динамически изменяемый компонент корзины в шапке страницы на корректность отрисовки после получения данных из Redux, в т.ч. на соответствие сохранённому Snapshot'у. */
describe("CartHeader", () => {
    test("Проверка корректности блока корзины из шапки", () => {
        jest.spyOn(reduxHooks, "useSelector").mockReturnValue(
            testTotalPriceAndQuantity
        );

        const component = render(
            <MemoryRouter>
                <CartHeader windowWidth={1500} />
            </MemoryRouter>
        );

        const cartHeaderTotalPrice =
            screen.getByTestId(/cartHeaderTotalPrice/i);
        const cartHeaderTotalQuantity = screen.getByTestId(
            /cartHeaderTotalQuantity/i
        );
        expect(cartHeaderTotalPrice.textContent).toEqual("777 777 ₽");
        expect(cartHeaderTotalQuantity.textContent).toEqual("42");
        expect(component).toMatchSnapshot();
    });
});
