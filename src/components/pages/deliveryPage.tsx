import React from "react";
import "../../styles/deliveryPage.scss";

const DeliveryPage = () => {
    return (
        <div className="delivery">
            <div className="container">
                <h1 className="delivery__title">Доставка</h1>
                <section className="delivery__section">
                    <h2>Стоимость доставки</h2>
                    <p>Доставка по городу - 599 руб.</p>
                    <p>Доставка за город - от 1 000 руб.</p>
                </section>
                <section className="delivery__section">
                    <h2>Сроки доставки</h2>
                    <p><b>Доставка по городу</b> осуществляется ежедневно, на следующий день после оформления заказа, с 10:00 до 21:00 </p>
                    <p><b>Доставка за пределы города</b> осуществляется ежедневно, на следующий день после оформления заказа, с 10:00 до 21:00</p>
                </section>
                <section className="delivery__section">
                    <h2>Условия  доставки</h2>
                    <p>1. Доставка проводится до дверей квартиры или офиса.</p>
                    <p>2. Доставка товара осуществляется при наличии подъездных путей.</p>
                    <p>3. Лестничные проходы и дверные проемы должны быть свободны и позволять свободно занести товар в помещение в упаковке. В случае отсутствия возможности занести товар в квартиру (офис), товар может остаться на месте, до которого удалось осуществить доставку.</p>
                    <p>4. Обращаем Ваше внимание, что доставку товара мы осуществляем в интервале времени, а не к определенному часу.</p>
                    <p>5. За 1 час перед осуществлением доставки с Вами свяжется экспедитор и предупредит о времени визита. В случае отсутствия получателя на адресе доставки экспедитор будет ожидать 15 минут.</p>
                    <p>6. В случае несоблюдения Вами условий доставки и приемки товара, повторная доставка оплачивается отдельно.</p>
                    <p>7. Если Вы желаете изменить дату доставки, пожалуйста, сообщите новую дату менеджеру интернет-магазина по телефону 8-800-600-8080</p>
                    <p>8. Доставленный товар распаковывается для осмотра и проверки на наличие возможных дефектов, которые могли возникнуть во время транспортировки товара. Проверьте комплектацию и внешний вид получаемого товара до подписания соответствующих документов. Не должно быть механических повреждений. Вмятины, царапины, потёртости не допускаются. Проверьте работу ручек, запоров, защёлок. Будьте внимательны и не спешите! Проверяйте наличие и правильность заполнения всех документов. Вам выдадут полный пакет документов:</p>
                    <p>- кассовый чек и акт приема-передачи товара,</p>
                    <p>- инструкция к товару на русском языке,</p>
                    <p>- гарантийный талон</p>
                    <p>9. В случае возврата товара надлежащего качества, стоимость доставки не возвращается.</p>
                    <p>10. При наличии претензий к внешнему виду и комплектности товара Вы можете отказаться от товара.</p>
                </section>
            </div>
        </div>
    );
};

export default DeliveryPage;
