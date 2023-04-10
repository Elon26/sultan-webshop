import { AxiosError } from "axios";
import { toast } from "react-toastify";

/** Функция принимает ошибку и выводит сообщение пользователю с её кодом и содержанием. */
function catchError(error: AxiosError): void {
    if (error.response) {
        if (error.response.status >= 400 && error.response.status < 500) {
            toast.error(
                `Ошибка клиента, код: ${error.response.status}, ${error.message}`
            );
        } else {
            toast.error(
                `Ошибка сервера, код: ${error.response.status}, ${error.message}`
            );
        }
    } else {
        toast.error(`Неизвестная ошибка, ${error.message}`);
        console.log(error);
    }
}

export default catchError;
