export const SERVER_URL =
    "https://sultan-68796-default-rtdb.asia-southeast1.firebasedatabase.app/";
export const HOMEPAGE = "/sultan-webshop/";
export const LOCALSTORAGE_CART_NAME = "sultanUserCartByElon";

export const menu = [{
    title: "О компании",
    link: "about"
}, {
    title: "Доставка и оплата",
    link: "delivery"
}, {
    title: "Возврат",
    link: "refund"
}];
export const productFieldOrderToShow = [
    "name",
    "purposes",
    "manufacturer",
    "brand",
    "barcode",
    "price",
    "dimensionType",
    "dimension",
    "imgBig",
    "imgSmall",
    "description"
];
export const defaultProduct = {
    imgBig: "",
    imgSmall: "",
    name: "",
    dimensionType: "мл",
    dimension: "",
    barcode: "",
    manufacturer: "",
    brand: "",
    description: "",
    price: 0,
    purposes: []
};
export const defaultPurposes = [
    "Для мытья посуды",
    "Для мытья фруктов",
    "Для мытья полов",
    "Для мытья стен",
    "Для мытья сантехники",
    "Для мытья окон",
    "Для мытья зеркал"
];
export const categories = [
    "Бытовая химия",
    "Косметика и гигиена",
    "Товары для дома",
    "Товары для детей и мам",
    "Посуда"
];
export const linkDisabledMessage =
    "Ссылка временно недоступна, повторите позднее.";
export const priceListDisabledMessage =
    "Прайс-лист обновляется, повторите позднее.";
export const formDisabledMessage =
    "Операция временно недоступна, повторите позднее.";
export const callbackRequestedMessage =
    "Спасибо за обращение! С Вами свяжется первый освободившийся оператор.";
export const addToCartMessage =
    "Товар успешно добавлен в корзину. Спасибо, что пользуетесь нашими услугами!";
export const counterMistakeMessage =
    "Количество товаров не должно быть меньше единицы.";
export const removeFromCartMessage =
    "Товар успешно удалён из корзины. Надеемся, Вы подберете что-нибудь взамен.";
export const removeFromCartConfirmMessage =
    "Вы уверены, что хотите безвозвратно удалить товар из корзины?";
export const restoreDBMessage =
    "Все изменения базы данных будут утеряны. Подтвердите операцию.";
export const removeFromDBConfirmMessage =
    "Вы уверены, что хотите безвозвратно удалить товар из базы данных?";
export const removeFromDBSuccessMessage =
    "Продукт успешно удалён из базы данных";
export const changeDBSuccessMessage =
    "Изменения успешно загружены в базу данных";
