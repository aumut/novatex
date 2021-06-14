// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.

const map = document.getElementById('map');
console.log(map);
if (map) ymaps.ready(init);
function init(){
    // Создание карты.
    var myMap = new ymaps.Map("map", {
        // Координаты центра карты.
        // Порядок по умолчанию: «широта, долгота».
        // Чтобы не определять координаты центра карты вручную,
        // воспользуйтесь инструментом Определение координат.
        center: [51.1254529,71.5276715],
        // Уровень масштабирования. Допустимые значения:
        // от 0 (весь мир) до 19.
        zoom: 15,
        controls: ['zoomControl']
        //controls: ['zoomControl', 'searchControl', 'typeSelector',  'fullscreenControl', 'routeButtonControl']
    });

    //myMap.controls.add('smallZoomControl', { top: 25, left: 5 });
    var myPlacemark = new ymaps.Placemark([51.1254529,71.5276715], {
        balloonContent: '<span class="hintContent">ул. Шарбакты, д.12/3, Нур-Султан, Казахстан </span>',
        hintContent: '<span class="hintContent">ул. Шарбакты, д.12/3, Нур-Султан, Казахстан </span>'
    });
    myMap.geoObjects.add(myPlacemark);
    //myPlacemark.balloon.open();
}
