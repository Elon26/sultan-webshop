/** Функция принимает название поля продукта из базы данных и возвращает его соответствующую версию на Русском языке. */
function translateProductFieldName(name: string): string {
    if (name === "imgBig") return "URL фото товара в высоком разрешении";
    if (name === "imgSmall") return "URL фото товара в низком разрешении";
    if (name === "name") return "Название товара";
    if (name === "dimensionType") return "Единицы измерения тары";
    if (name === "dimension") return "Вес (гр.) / объем (мл.)";
    if (name === "barcode") return "Штрихкод";
    if (name === "manufacturer") return "Производитель";
    if (name === "brand") return "Бренд";
    if (name === "description") return "Описание";
    if (name === "price") return "Цена";
    if (name === "purposes") return "Назначение";
    return "Такого поля не существует";
}

export default translateProductFieldName;
