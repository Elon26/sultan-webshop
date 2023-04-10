import React from "react";
import "../../styles/loader.scss";

/** Компонент, содержащий заглушку-спиннер, отображаемую на время загрузки данных. */
const Loader = (): React.ReactElement => {
    return (
        <div className="loaderBody">
            <span className="loader"></span>
        </div>
    );
};

export default Loader;
