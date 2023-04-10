import { useEffect, useState } from "react";
import dataBase from "../mockData/dataBase.json";
import addProductToFirebase from "../services/addProductToFirebase";

/** Хук содержит функционал загрузки данных из сохраненной базы данных (json) в Firebase, а также генерации актуальных сообщений о статусе загрузки. */
const useMockData = () => {
    const statusConst = {
        idle: "Не начато",
        pending: "В процессе",
        succesed: "Завершено",
        error: "Ошибка"
    };

    const [status, setStatus] = useState<string>(statusConst.idle);
    const [progress, setProgress] = useState<number>(0);
    const [count, setCount] = useState<number>(0);
    const summCount = dataBase.length;

    /** Функция увеличивет счётчик товаров на единицу. */
    const incrementCount = (): void => {
        setCount((prev: number) => prev + 1);
    };

    /** Функция меняет статус с "Не начато" на "В процессе", при загрузке первого товара, и с "В процессе" на "Завершено", при загрузке последнего, а также отображает процент загруженных товаров. */
    const updateProgress = (): void => {
        if (count !== 0 && status === statusConst.idle) {
            setStatus(statusConst.pending);
        }

        const newProgress = Math.floor((count / summCount) * 100);
        if (newProgress > progress) {
            setProgress(() => newProgress);
        }

        if (newProgress === 100) {
            setStatus(statusConst.succesed);
        }
    };

    useEffect(() => {
        updateProgress();
    }, [count]);

    /** Функция выполняет загрузку товаров из сохраненной базы данных (json) в Firebase */
    async function initialize(): Promise<void> {
        try {
            for (const item of dataBase) {
                await addProductToFirebase(item.barcode, item);
                incrementCount();
            }
        } catch (error) {
            console.log(error);
            setStatus(statusConst.error);
        }
    }

    return { initialize, progress, status };
};

export default useMockData;
