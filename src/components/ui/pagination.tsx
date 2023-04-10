import React from "react";
import _ from "lodash";
import "../../styles/pagination.scss";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

interface PaginationProps {
    totalQuantity: number;
    pageSize: number;
    currentPage: number;
    handleClick: (index: number) => void;
}

/** Компонент вычислает и отображает пагинацию карточек товаров. */
const Pagination = ({
    totalQuantity,
    pageSize,
    currentPage,
    handleClick
}: PaginationProps): React.ReactElement | null => {
    const pageCount = Math.ceil(totalQuantity / pageSize);
    if (pageCount <= 1) return null;
    const pages = _.range(1, pageCount + 1);
    const prevPage = currentPage === 1 ? 0 : currentPage - 2;
    const nextPage = currentPage === pageCount ? currentPage - 1 : currentPage;

    /** Функция устанавливает различные классы для активного и прочих элементов пагинации. */
    const setClassName = (index: number) => {
        const className =
            "paginationItem" + (index + 1 === currentPage ? " active" : "");
        return className;
    };

    return (
        <ul className="paginationBody">
            <li
                className="paginationItem"
                onClick={() => handleClick(prevPage)}
            >
                <BsChevronLeft />
            </li>
            {pages.map((page, index) => (
                <li
                    key={"page_" + String(page)}
                    className={setClassName(index)}
                    onClick={() => handleClick(index)}
                >
                    {page}
                </li>
            ))}
            <li
                className="paginationItem"
                onClick={() => handleClick(nextPage)}
            >
                <BsChevronRight />
            </li>
        </ul>
    );
};

export default Pagination;
