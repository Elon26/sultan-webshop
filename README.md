<h1>Интернет-магазин Султан</h1>
<h2>Общее описание функционала:</h2>
<ul>
    <li>Проект реализован с использованием стека: React + TypeScript + Firebase + Redux.</li>
    <li>На текущий момент в проекте реализованы следующие страницы - Главная (только ссылки), Каталог, Страница товара, Корзина, Страница администратора.</li>
    <li>Проект оперирует двумя сущностями - catalog (перечень товаров) и cart (карзина с выбранными товарами пользователя).</li>
    <li>Сущность catalog за пределами пользовательской сессии хранится в Farebase.</li>
    <li>Сущность cart за пределами пользовательской сессии хранится в LocalStorage.</li>
    <li>В пределах пользовательской сессии обе сущности хранятся в Redux, чтобы обеспечить доступ к данным из всех частей приложения.</li>
    <li>Любое изменение пользователем данных обеих сущностей приводит к сохранению этих данных в пределах сессии (в Redux) и за её пределами (в Farebase и LocalStorage).</li>
    <li>На всех страницах приложения предусмотрена адаптивная вёрстка, максимально приближенная к макету.</li>
    <li>В случае попыток перехода на несуществующую страницу, предусмотрена переадресация на страницу 404.</li>
    <li>Любые действия, подразумевающие ожидание, сопровождаются анимацией loader'а (спиннера).</li>
    <li>В шапке предусмотрень блок корзины, в динамическом режиме отображающий общее количество единиц товаров (не количество номенклатурных единиц) и общую стоимость товаров в корзине.</li>
    <li>Все значимые действия пользователя сопровождаются соответствующими информационными сообщениями в правой-верхней части экрана.</li>
    <li>Все функции в коде описаны при помощи нотации JSDoc.</li>
</ul>
<h2>Главная страница:</h2>
<ul>
    <li>Содержит кнопки, позволяющие перейти на страницу каталога и страницу администратора.</li>
</ul>
<h2>Каталог:</h2>
<ul>
    <li>В основной части выводятся карточки всех товаров, присутствующих на момент отрисовки в базе данных.</li>
    <li>Все параметры подтягиваются из базы данных.</li>
    <li>По клику на название товара или фотографию предусмотрена возможность перехода на страницу товара.</li>
    <li>Предусмотрена возможность сортировки по имени и по цене. В обоих случаях есть возможность сортировки как по возрастанию, так и по убыванию.</li>
    <li>Предусмотрено две самостоятельных группы фильтров - "По назначению" (Для мытья посуды, Для мытья фруктов и т.д.), а также по единый фильтр по цене и производителю.</li>  
    <li>Предусмотрена возможность двухуровневой фильтрации, т.е. можно отфильтровать весь набор продукции по назначению (напр., оставить только средства Для мытья посуды), а затем произвести дополнительную фильтрацию оставшихся товаров по цене и по производителю.</li>
    <li>В перечене фильтров "По назначению" отображаются только те фильтры, у которых на текущий момент имеются соответствующие им товары в базе данных.</li>
    <li>В перечене производителей всегда отображаются только те производители, которые на текущий момент присутствуют в базе данных и соответствуют установленому фильтру "По назначению".</li>
    <li>Для перечня производителей также предусмотрен внутренний фильтр по значению, введённому пользователем.</li>
    <li>Предусмотрена кнопка сброса фильтров, которая обнуляет все параметры дополнительной фильтрации. Данная кнопка не выполняет дополнительную фильтрацию по пустому значению сама по себе, для этого необходимо самостоятельно вызвать фильтрацию по обнуленным параметрам.</li>
    <li>В фильтрах по цене предусмотрена защита от ошибок, которая синхронизирует значения минимального и максимального полей, чтобы исключить вероятность некорректного запроса (напр, больше трёх и меньше двух).</li>
    <li>По нажатию на кнопку "В корзину" соответствующий товар добавляется в сущность корзины (в количестве 1 шт.), что приводит к перерисовке соответствующих компонентов в шапке и корзине.</li>
    <li>После добавления товара в корзину, кнопка "В корзину" меняет функционал и становится ссылкой, по которой можно осуществить переход в корзину.</li>
</ul>
<h2>Страница товара:</h2>
<ul>
    <li>На странице отображаются параметры конкретного товара.</li>
    <li>Все параметры подтягиваются из базы данных.</li>
    <li>Предусмотрен функционал, при помощи которого можно выбрать количество товаров для последующего добавления в корзину.</li>    
    <li>По нажатию на кнопку "В корзину" соответствующий товар добавляется в сущность корзины (в указанном пользователем количестве), с сопутствующим сохранением в LocalStorage, что приводит к перерисовке соответствующих компонентов в шапке и корзине.</li>
    <li>После добавления товара в корзину, кнопка "В корзину" меняет функционал и становится ссылкой, по которой можно осуществить переход в корзину.</li>
</ul>
<h2>Корзина:</h2>
<ul>
    <li>На странице отображается перечень товаров, добавленных пользователем в корзину на текущий момент, а также общая сумма товаров в корзине.</li>
    <li>Предусмотрена возможность изменить количество единиц товаров для каждой номенклатурной единицы, а также удалить всю номеклатурную единицу из корзины.</li>
    <li>Все действия, упомянутые в прошлом пункте, в оперативном режиме вносят соответствующие изменения в сущность корзины, с сопутствующим сохранением в LocalStorage, что приводит к перерисовке соответствующего компонента в шапке.</li>
    <li>По нажатию на кнопку Оформить заказ, выводится всплывающее окно с информационным сообщением, а также производится очистка корзины.</li>
</ul>
<h2>Страница администратора:</h2>
<ul>
    <li>На странице предусмотрена возможность откатить базу данных до состояния "По умолчанию", создать новый товар, а также удалить или изменить любой из существующих.</li>
    <li>Откат базы данных до состояния "По умолчанию" подразумевает удаление всех существующих товаров из Firebase, затем загрузку сохранённой копии данных из json-файла.</li>
    <li>Функционал создания и изменения товаров сопровождается валидацией данных, чтобы исключить ввод любых некорректных данных, которые могли бы спровоцировать ошибки.</li>
    <li>Любые действия создания/изменения/удаления товаров сопровождаются оперативным изменением базы данных.</li>
</ul>
<h2>Перечень реализованных тестов:</h2>
<ol>
    <li>src\tests\divideNumber.test.ts - проверка возвращаемых значений простой функции.</li>
    <li>src\tests\getProductsFromFirebase.test.ts - асинхронная проверка наличия изменений в базе данных Firebase, по сравнению с её изначальным состоянием.</li>
    <li>src\tests\mainPage.test.tsx - проверка наличия главной страницы в DOM-дереве, с сопуствующей проверкой основных её элементов на соответствие сохранённым snapshots'ам.</li>
    <li>src\tests\singleFieldForm.test.tsx - проверка корректной работы события input - синхронного изменения поля ввода и переменной, связанной с ним при помощи useState.</li>
    <li>src\tests\сatalogPage.test.tsx - проверка открытия/скрытия окна выбора критериев сортировки по нажатию на соответствующую клавишу.</li>
    <li>src\tests\header.test.tsx - проверка отрисовки шапки и основных её элементов.</li>
    <li>src\tests\productPage.test.tsx - проверка отрисовки компонента по передаваемым тестовым данным.</li>
    <li>src\tests\productPage.test.tsx - проверка правильности работы счётчика увеличения и уменьшения товаров для добавления в корзину.</li>
    <li>src\tests\router.test.tsx - проверка функционала маршрутизации компонентов.</li>
    <li>src\tests\cartHeader.test.tsx - проверка динамически изменяемого компонента корзины в шапке страницы на корректность отрисовки после получения данных из Redux, в т.ч. на соответствие сохранённому Snapshot'у.</li>
    <li>src\tests\сatalogPage.test.tsx - проверка правильности отбора уникальных значений критериев сортировки по назначению на основании данных, полученных из Redux.</li>
</ol>