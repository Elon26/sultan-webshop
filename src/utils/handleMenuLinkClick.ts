import { toast } from "react-toastify";
import { linkDisabledMessage } from "../constats";

/** Функция делегирует клик элементу меню и выводит сообщение о том, что ссылка недоступна. */
const handleMenuLinkClick = (e: React.MouseEvent<HTMLElement>): void => {
    if (e.target instanceof HTMLElement && e.target.closest(".menuLink")) {
        toast.error(linkDisabledMessage);
    }
};

export default handleMenuLinkClick;
