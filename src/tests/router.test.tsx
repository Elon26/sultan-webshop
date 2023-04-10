import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import MainPage from "../components/pages/mainPage";
import AdminPage from "../components/pages/adminPage";
import { HOMEPAGE } from "../constats";
import userEvent from "@testing-library/user-event";
import * as reduxHooks from "react-redux";

jest.mock("react-redux");

/** Тест проверяет функционал маршрутизации компонентов. */
describe("router", () => {
    test("Проверка перехода с главной страницы на страницу администратора", () => {
        jest.spyOn(reduxHooks, "useSelector").mockReturnValue([]);

        render(
            <MemoryRouter initialEntries={[HOMEPAGE]}>
                <Route path={HOMEPAGE + "admin/"} component={AdminPage} />
                <Route path={HOMEPAGE} exact component={MainPage} />
            </MemoryRouter>
        );

        const adminPageRouterLink = screen.getByTestId(/adminPageRouterLink/i);
        expect(screen.getByTestId("mainPageOuter")).toBeInTheDocument();
        expect(screen.queryByTestId("adminPageOuter")).toBeNull();
        userEvent.click(adminPageRouterLink);
        expect(screen.getByTestId("adminPageOuter")).toBeInTheDocument();
        expect(screen.queryByTestId("mainPageOuter")).toBeNull();
    });
});
