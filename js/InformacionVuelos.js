const baseUrl = $('meta[name="base-url"]').attr('content');

function MostrarInformacionVuelo(vuelo){
    const baseUrl = $('meta[name="base-url"]').attr('content');

// Construye la URL completa usando el nombre de la ruta
    const url = `${baseUrl}/vuelos/escala?idVuelo=${vuelo.idVuelo}`;

    const url2 = `${baseUrl}/vuelos/escala?idVuelo=${vuelo.idVuelo}`;

    var html="";
    $.ajax({
        url: url,  
        type: "GET",
        dataType: "json",
        success: function(response){
            // console.log(response.escalas);
            for (let index = 0; index < response.escalas.length-1; index++) {
                element = response.escalas[index];
                html += `
                <div class="tramaIndividual">
                    <div class="circulo"></div>
                    <div class="aeropuerto"><h4>${element.vuelo.ruta.destino}</h4></div>
                </div>
                `

            }
            document.getElementById('espacioVuelos').innerHTML =`
            <div id="bordeInfo1">
            <div style="display:flex;justify-content: space-around;width: 20%;">
                <h3 style="color: white">Vuelo:</h3>
                <h3 style="color: white">${vuelo.idVuelo}</h3>
            </div>
            <div style="display:flex;justify-content: space-around;width: 30%;">
                <h3 style="color: white">Fecha de Partida</h3>
                <h3 style="color: white">${vuelo.fechaPartida}</h3>
            </div>
            </div>
            <div class="espacioInfo" id="espacioInfoIda">
                <div class="infoInfo">
                    <div class="horaSalida">
                        <h4>Salida</h4>
                        <h3>${vuelo.horaPartida}</h3>
                    </div>
                    <div class="tramas">
                        <hr class="lineas">
                        ${html}
                    </div>
                    <div class="horaSalida">
                        <h4>Llegada</h4>
                        <h3>${vuelo.horaLlegada}</h3>
                    </div>
                </div>
                <div class="irAvion">
                    <button id="botonViajar" onclick="cargarAvion('${vuelo.idVuelo}')">Comprar</button>
                </div>
            </div>
        `

            
        },
        
        error: function(error){
            console.log(error);
        }
    })
    // console.log(vuelo);

    

}

function MostrarInformacionVuelo2(vuelo){


    // Construye la URL completa usando el nombre de la ruta
    const url = `${baseUrl}/vuelos/escala?idVuelo=${vuelo.idVuelo}`;
    var html="";
    $.ajax({
        url: url,  
        type: "GET",
        dataType: "json",
        success: function(response){
            // console.log(response.escalas);
            for (let index = 0; index < response.escalas.length-1; index++) {
                element = response.escalas[index];
                html += `
                <div class="tramaIndividual">
                    <div class="circulo"></div>
                    <div class="aeropuerto"><h4>${element.vuelo.ruta.destino}</h4></div>
                </div>
                `

            }
            document.getElementById('espacioVuelos2').innerHTML =`
            <div id="bordeInfo2">
            <div style="display:flex;justify-content: space-around;width: 20%;">
                <h3 style="color: white">Vuelo:</h3>
                <h3 style="color: white">${vuelo.idVuelo}</h3>
            </div>
            <div style="display:flex;justify-content: space-around;width: 30%;">
                <h3 style="color: white">Fecha de Partida</h3>
                <h3 style="color: white">${vuelo.fechaPartida}</h3>
            </div>
            </div>
            <div class="espacioInfo" id="espacioInfoIda2">
                <div class="infoInfo">
                    <div class="horaSalida">
                        <h4>Salida</h4>
                        <h3>${vuelo.horaPartida}</h3>
                    </div>
                    <div class="tramas">
                        <hr class="lineas">
                        ${html}
                    </div>
                    <div class="horaSalida">
                        <h4>Llegada</h4>
                        <h3>${vuelo.horaLlegada}</h3>
                    </div>
                </div>
                <div class="irAvion">
                    <button id="botonViajar">Comprar</button>
                </div>
            </div>
        `

            
        },
        
        error: function(error){
            console.log(error);
        }
    })


    

}

function cargarAvion(idVuelo) {
    // Obtener los parámetros de la URL
    var urlParams = new URLSearchParams(window.location.search);

// Obtener el valor del parámetro idCliente
    var idCliente = urlParams.get('User');
    var tipo = urlParams.get('tipo')
    const url = `${baseUrl}/asientoPorVuelo/${idVuelo}?user=${idCliente}&tipo=${tipo}`;
    window.location.href=url;
    
}
// "idVuelo" => "BB3C"
// "aerolinea" => array:2 [▶]
// "ruta" => array:4 [▶]
// "fechaPartida" => "2023-07-20"
// "numeroVuelo" => 455
// "horaPartida" => "10:00"
// "horaLlegada" => "13:15"
// "gate" => 5
// "tipoVuelo" => true