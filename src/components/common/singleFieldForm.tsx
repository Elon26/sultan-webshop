import React, { useState } from "react";
import { formDisabledMessage } from "../../constats";
import showUserMessage from "../../utils/showUserMessage";
import "../../styles/singleFieldForm.scss";

interface SingleFieldFormProps {
    classEl: string;
    placeholder: string;
    icon: React.ReactElement;
    broken: boolean;
}

/** Компонент формы с единственным полем ввода. */
const SingleFieldForm = ({
    classEl,
    placeholder,
    icon,
    broken
}: SingleFieldFormProps): React.ReactElement => {
    const [inputValue, setInputValue] = useState<string>("");

    /** Функция выводит сообщение о том, что операция недоступна и очищает форму */
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        if (broken) {
            showUserMessage("error", formDisabledMessage);
        }

        if (e.target instanceof HTMLElement) {
            const input = e.target.querySelector("input");
            if (input) input.value = "";
        }
    };

    return (
        <form className={classEl + " singleFieldForm"} onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder={placeholder}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                data-testid="singleFieldFormInput"
            />
            <button type="submit">{icon}</button>
        </form>
    );
};

export default SingleFieldForm;
