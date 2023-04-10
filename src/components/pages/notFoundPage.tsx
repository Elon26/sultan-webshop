import React from "react";

/** Компонент страницы 404. */
const NotFoundPage = (): React.ReactElement => {
    return (
        <section>
            <div className="container">
                <h1 className="pageTitle pageTitle_withoutMargin">
                    Страница не найдена
                </h1>
            </div>
        </section>
    );
};

export default NotFoundPage;
