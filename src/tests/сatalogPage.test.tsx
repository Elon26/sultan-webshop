import { fireEvent, render, screen } from "@testing-library/react";
import CatalogPage from "../components/pages/catalogPage";
import * as reduxHooks from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { testCatalog } from "../testsConstats";

jest.mock("react-redux");

describe("сatalogPage", () => {
    /** Тест проверяет открытие/скрытие окна выбора критериев сортировки по нажатию на соответствующую клавишу. */
    test("Проверка открытия/скрытия окна выбора критериев сортировки", () => {
        jest.spyOn(reduxHooks, "useSelector").mockReturnValue([]);

        render(<CatalogPage />);

        const button = screen.getByTestId(/sortDropdownButton/i);
        expect(screen.getByTestId(/sortDropdownArea/i)).toHaveClass(
            "invisible"
        );
        fireEvent.click(button);
        expect(screen.getByTestId(/sortDropdownArea/i)).not.toHaveClass(
            "invisible"
        );
    });

    /** Тест проверяет правильность отбора уникальных значений критериев сортировки по назначению на основании данных, полученных из Redux. */
    test("Проверка открытия/скрытия окна выбора критериев сортировки", () => {
        jest.spyOn(reduxHooks, "useSelector").mockReturnValue(testCatalog);

        render(
            <MemoryRouter>
                <CatalogPage />
            </MemoryRouter>
        );

        const purposes = screen.getAllByTestId(/catalogPagePurposes/i);
        const purposesText = purposes.map((purpose) => purpose.textContent);

        expect(purposesText).toEqual([
            "Показать всё",
            "Для мытья посуды",
            "Для мытья фруктов"
        ]);
    });
});
