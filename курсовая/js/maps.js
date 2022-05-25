// maps

ymaps.ready(function() {
  var myMap = new ymaps.Map('map', {
          center: [55.75846806898367,37.60208849999989],
          zoom: 15,
          controls: [],
      }),
      myPlacemark = new ymaps.Placemark(
        myMap.getCenter(),
        {
          hintContent: '',
        },
        {
          iconLayout: 'default#imageWithContent',
          iconImageHref: '../img/contacts/contacts-metka.svg',
          iconImageSize: [20, 20],
      }
      );
  var zoomControl = new ymaps.control.ZoomControl({
      options: {
          position: { right: 0, top: 100 },
          size: 'small',
      },
  });
  var geolocationControl = new ymaps.control.GeolocationControl({
      options: {
          position: { right: 0, top: 170 },
      },
  });
  myMap.controls.add(zoomControl);
  myMap.controls.add(geolocationControl);
  myMap.geoObjects.add(myPlacemark);
  myMap.behaviors.disable('scrollZoom');
});
