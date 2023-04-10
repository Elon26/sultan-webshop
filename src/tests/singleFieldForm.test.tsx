import { fireEvent, render, screen } from "@testing-library/react";
import SingleFieldForm from "../components/common/singleFieldForm";
import { BsChevronRight } from "react-icons/bs";

/** Тест проверяет корректную работу события input - синхронного изменения поля ввода и переменной, связанной с ним при помощи useState. */
describe("singleFieldForm", () => {
    test("Проверка взаимодействия input и useState", () => {
        render(
            <SingleFieldForm
                classEl=""
                placeholder=""
                icon={<BsChevronRight />}
                broken={true}
            />
        );

        const input = screen.getByTestId(/singleFieldFormInput/i);
        expect(screen.getByTestId(/singleFieldFormInput/i)).toContainHTML(``);
        fireEvent.input(input, {
            target: { value: "Тест" }
        });
        expect(screen.getByTestId(/singleFieldFormInput/i)).toContainHTML(
            `Тест`
        );
    });
});
