import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProductPage from "../components/pages/productPage";
import userEvent from "@testing-library/user-event";
import * as reduxHooks from "react-redux";
import { testProduct } from "../testsConstats";

jest.mock("react-redux");

describe("ProductPage", () => {
    /** Тест проверяет отрисовку компонента по передаваемым тестовым данным. */
    test("Проверка отрисовки компонента", () => {
        jest.spyOn(reduxHooks, "useSelector").mockReturnValue({});

        render(
            <MemoryRouter>
                <ProductPage
                    barcode={testProduct.barcode}
                    product={testProduct}
                />
            </MemoryRouter>
        );

        const testProductName = screen.getByText(`${testProduct.name}`);
        const testProductManufacturer = screen.getByText(
            `${testProduct.manufacturer}`
        );
        const testProductBrand = screen.getByText(`${testProduct.brand}`);
        const testProductBarcode = screen.getByText(`${testProduct.barcode}`);

        expect(testProductName).toBeInTheDocument();
        expect(testProductManufacturer).toBeInTheDocument();
        expect(testProductBrand).toBeInTheDocument();
        expect(testProductBarcode).toBeInTheDocument();
    });

    /** Тест проверяет правильность работы счётчика увеличения и уменьшения товаров для добавления в корзину. */
    test("Проверка работы счётчика", () => {
        jest.spyOn(reduxHooks, "useSelector").mockReturnValue({});

        render(
            <MemoryRouter>
                <ProductPage
                    barcode={testProduct.barcode}
                    product={testProduct}
                />
            </MemoryRouter>
        );

        const currentCounterDecrement = screen.getByTestId(
            /currentCounterDecrement/i
        );
        const currentCounterIncrement = screen.getByTestId(
            /currentCounterIncrement/i
        );
        expect(screen.getByTestId(/currentCounterValue/i).textContent).toEqual(
            "1"
        );
        userEvent.click(currentCounterIncrement);
        expect(screen.getByTestId(/currentCounterValue/i).textContent).toEqual(
            "2"
        );
        userEvent.click(currentCounterIncrement);
        expect(screen.getByTestId(/currentCounterValue/i).textContent).toEqual(
            "3"
        );
        userEvent.click(currentCounterDecrement);
        expect(screen.getByTestId(/currentCounterValue/i).textContent).toEqual(
            "2"
        );
        userEvent.click(currentCounterDecrement);
        expect(screen.getByTestId(/currentCounterValue/i).textContent).toEqual(
            "1"
        );
        userEvent.click(currentCounterDecrement);
        expect(screen.getByTestId(/currentCounterValue/i).textContent).toEqual(
            "1"
        );
    });
});
