import { toast } from "react-toastify";

/** Функция выводит пользователю заданное сообщение. */
const showUserMessage = (status: string, message: string): void => {
    if (status === "info") {
        toast.info(message);
        return;
    }
    if (status === "error") {
        toast.error(message);
        return;
    }
    if (status === "success") {
        toast.success(message);
    }
};

export default showUserMessage;
