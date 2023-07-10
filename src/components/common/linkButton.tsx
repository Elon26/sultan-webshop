import React from "react";
import { Link } from "react-router-dom";
import "../../styles/button.scss";

interface LinkButtonProps {
    link: string;
    classEl: string;
    text: string;
    icon: React.ReactElement;
    title?: string;
    handleClick?(): void;
    testid?: string;
    absolute?: boolean;
}

/** Компонент кнопки со ссылкой. */
const LinkButton = ({
    link,
    classEl,
    text,
    icon,
    title,
    handleClick,
    testid,
    absolute
}: LinkButtonProps): React.ReactElement => {
    return (
        <>
            {!absolute && <Link
                to={link}
                className={classEl + " button"}
                title={title}
                onClick={handleClick}
                data-testid={testid}
            >
                <span>{text}</span>
                {icon}
            </Link>}
            {absolute && <a
                href={link}
                className={classEl + " button"}
                target="blank"
                data-testid={testid}
            >
                <span>{text}</span>
                {icon}
            </a>}
        </>
    );
};

export default LinkButton;
