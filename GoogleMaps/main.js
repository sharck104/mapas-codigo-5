import { estiloMapa } from './js/variables.js';

window.onload = () => {

    let coordenadasAnterior;


    let mapaGoogle = new google.maps.Map(document.getElementById('mapa'), {
        center: {
            lat: -70,
            lng: -14
        },
        zoom: 8,
        styles: estiloMapa
    });

    let posicionActual = () => {
        // solicitar permiso de acceso a ubicacion al navegador
        if (navigator.geolocation) {
            // getCurrentPosition(posicion) => funcion que devuelve
            // información de la ubicación del equipo (coordenadas)
            navigator.geolocation.getCurrentPosition(posicion => {
                // forma 1 => xvr
                let { latitude, longitude } = posicion.coords;
                var marcador = new google.maps.Marker(
                    {
                        position: {
                            lat: latitude,
                            lng: longitude
                        },
                        map: mapaGoogle,
                        title: "Aquí estoy"
                    });
                mapaGoogle.setCenter({
                    lat: latitude,
                    lng: longitude
                });
                mapaGoogle.setZoom(16);
            }, error => {
                $.notify("No se han concedido permisos para acceder a tu ubicación", "error");
                console.log(error);
            })
        } else {
            console.log("El navegador no posee geolocalización");
        }
    }


    let configurarListeners = () => {
        mapaGoogle.addListener(`click`, (e) => {
            $.notify("se hizo click en el mapa", "success");

            console.log(e.latLng.lat());
            console.log(e.latLng.lng());

            let marcadorNuevo = new google.maps.Marker({
                position: {
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng()
                },
                map: mapaGoogle,
                icon: "./icons/pin.png"
            });
            if (coordenadasAnterior) {
                console.log("ya existia una cordenada anterior");


                // 

                var coordenadas = [
                    {
                        lat: e.latLng.lat(),
                        lng: e.latLng.lng()
                    },
                    {
                        lat: coordenadasAnterior.lat,
                        lng: coordenadasAnterior.lng
                    },

                ];


                var lineaBlanca = new google.maps.Polyline({
                    path : coordenadas,
                    geodesic:true,
                    strokeColor: '#FFFFFF',
                    strokeOpacity:1.0,
                    strokeWeight:2
                });
                lineaBlanca.setMap(mapaGoogle);

                
                coordenadasAnterior = {
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng(),
                }
            } else {
                console.log("es el primer click");
                coordenadasAnterior = {
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng(),
                }


            }

        })
    }

    posicionActual();
    configurarListeners();
}