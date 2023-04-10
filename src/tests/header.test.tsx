import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "../components/ui/header";
import * as reduxHooks from "react-redux";

jest.mock("react-redux");

/** Тест проверяет отрисовку шапки и основных её элементов. */
describe("header", () => {
    test("Проверка статуса отрисовки", () => {
        jest.spyOn(reduxHooks, "useSelector").mockReturnValue({});

        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );

        const headerLogo = screen.getByTestId(/headerLogo/i);
        const headerAddress = screen.getByTestId(/headerAddress/i);
        const headerInfoBlock = screen.getByTestId(/headerInfoBlock/i);
        expect(headerLogo).toBeInTheDocument();
        expect(headerAddress).toBeInTheDocument();
        expect(headerInfoBlock).toBeInTheDocument();
    });
});
