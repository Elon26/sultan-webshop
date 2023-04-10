import React, { useContext, useState } from "react";

interface IClickCatcherContextProps {
    sortInFocus: boolean;
}

const defaultSort = {
    sortInFocus: false
};

const ClickCatcherContext =
    React.createContext<IClickCatcherContextProps>(defaultSort);

/** Кастомный хук, отслеживающий на уровне всего приложения, был ли сделан клик по заданному классу. */
export const useClickCatcher = () => {
    return useContext(ClickCatcherContext);
};

/** Higher-Order Component, предназначенный для отлавливания кликов на уровне всего приложения. */
const ClickCatcherProvider = ({
    children
}: {
    children: React.ReactElement;
}) => {
    const [sortInFocus, setSortInFocus] = useState(false);

    /** Функция отслеживает клик на всей площади экрана и меняет заранее заготовленный переключатель, по факту клика на заданный HTML-элемент. */
    const clickCatcher = (e: React.MouseEvent<HTMLElement>) => {
        if (e.target instanceof Element) {
            if (e.target.closest(".catalog__sortBlock")) {
                setSortInFocus(true);
            } else {
                setSortInFocus(false);
            }
        }
    };

    return (
        <ClickCatcherContext.Provider
            value={{
                sortInFocus
            }}
        >
            <div className="clickCatcher" onClick={clickCatcher}>
                {children}
            </div>
        </ClickCatcherContext.Provider>
    );
};

export default ClickCatcherProvider;
