import React, { useContext, useEffect, useState } from "react";

interface IWindowDimensionsProps {
    windowWidth: number;
}

const windowDimensionsContext = React.createContext<IWindowDimensionsProps>({
    windowWidth: window.innerWidth
});

/** Кастомный хук, предоставляющий текущую ширину экрана пользователя. Необходим для оперативного изменения вёрстки сразу по факту изменения пользователем ширины окна браузера, без необходимости перезагрузки страницы. */
export const useWindowDimensions = () => {
    return useContext(windowDimensionsContext);
};

/** Higher-Order Component, предназначенный для обертывания приложения в кастомный хук. */
const WindowDimensionsProvider = ({
    children
}: {
    children: React.ReactElement;
}): React.ReactElement => {
    const [windowWidth, setwindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener("resize", () =>
            setwindowWidth(window.innerWidth)
        );
    }, []);

    return (
        <windowDimensionsContext.Provider value={{ windowWidth }}>
            {children}
        </windowDimensionsContext.Provider>
    );
};

export default WindowDimensionsProvider;
