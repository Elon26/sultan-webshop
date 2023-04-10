import { render, screen } from "@testing-library/react";
import MainPage from "../components/pages/mainPage";
import { MemoryRouter } from "react-router-dom";

/** Тест проверяет наличие главной страницы в DOM-дереве, с сопуствующей проверкой основных её элементов на соответствие сохранённым snapshots'ам. */
describe("mainPage", () => {
    test("Проверка наличия в DOM-дереве и соответствия snapshots'ам", () => {
        render(
            <MemoryRouter>
                <MainPage />
            </MemoryRouter>
        );
        const header = screen.getByText(/Главная страница/i);
        const firstButton = screen.getByText(/Каталог/i);
        const secondButton = screen.getByText(/Админ-панель/i);
        expect(header).toBeInTheDocument();
        expect(firstButton).toBeInTheDocument();
        expect(secondButton).toBeInTheDocument();
        expect(header).toMatchSnapshot();
        expect(firstButton).toMatchSnapshot();
        expect(secondButton).toMatchSnapshot();
    });
});
