import React from "react";
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";
import { ISort } from "../../models";

interface CatalogSortBlockProps {
    sortParams: ISort;
    handleClick(e: React.MouseEvent<HTMLElement>): void;
}

/** Компонент, отображающий интерактивный блок с критериями сортировки массива товаров. */
const CatalogSortBlock = ({ sortParams, handleClick }: CatalogSortBlockProps): React.ReactElement => {
    return (
        <div
            className="catalog__sortBlock"
            onClick={handleClick}
        >
            <div
                className="catalog__currentSort"
                data-testid="sortDropdownButton"
            >
                <span className="catalog__defaultText">
                    Сортировка:
                </span>
                <span className="catalog__selectedSort">
                    {sortParams.name === "name"
                        ? "Название"
                        : "Цена"}
                </span>
                <span className="catalog__arrowIcon">
                    {sortParams.direction === "asc" ? (
                        <BsCaretDownFill />
                    ) : (
                        <BsCaretUpFill />
                    )}
                </span>
            </div>
            <div
                className="catalog__sortDropdown sortDropdown invisible"
                data-testid="sortDropdownArea"
            >
                <div className="sortDropdown__body">
                    <div
                        className="sortDropdown__item"
                        data-sort-value="1"
                    >
                        По названию: от А к Я
                    </div>
                    <div
                        className="sortDropdown__item"
                        data-sort-value="2"
                    >
                        По названию: от Я к А
                    </div>
                    <div
                        className="sortDropdown__item"
                        data-sort-value="3"
                    >
                        От дешёвых к дорогим
                    </div>
                    <div
                        className="sortDropdown__item"
                        data-sort-value="4"
                    >
                        От дорогих к дешёвым
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CatalogSortBlock;
