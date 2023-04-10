import React from "react";
import { BsGrid, BsPersonLinesFill } from "react-icons/bs";
import { HOMEPAGE } from "../../constats";
import LinkButton from "../common/linkButton";
import "../../styles/mainPage.scss";

/** Компонент главной страницы. */
const MainPage = (): React.ReactElement => {
    return (
        <section className="mainPage" data-testid="mainPageOuter">
            <div className="container">
                <h1 className="pageTitle">Главная страница</h1>
                <div className="mainPage__buttons">
                    <LinkButton
                        link={HOMEPAGE + "catalog/"}
                        classEl="mainPage__button"
                        text="Каталог"
                        icon={<BsGrid />}
                    />
                    <LinkButton
                        link={HOMEPAGE + "admin/"}
                        classEl="mainPage__button"
                        text="Админ-панель"
                        icon={<BsPersonLinesFill />}
                        testid="adminPageRouterLink"
                    />
                </div>
            </div>
        </section>
    );
};

export default MainPage;
