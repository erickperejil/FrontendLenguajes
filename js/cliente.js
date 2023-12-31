function habilitarDestino() {
    var select1 = document.getElementById('origen');
    var select2 = document.getElementById('destino');
  
    if (select1.value !== '') {
      select2.disabled = false;
    } else {
      select2.disabled = true;
    }
  }
  
  const opcion1 = document.getElementById('ida');
  const opcion2 = document.getElementById('idaVuelta');
  const miSelect = document.getElementById('origen');
  
  opcion1.addEventListener('click', habilitarSelect);
  opcion2.addEventListener('click', habilitarSelect);
  
  function habilitarSelect() {
    miSelect.disabled = false;
    opcion1.removeEventListener('click', habilitarSelect);
    opcion2.removeEventListener('click', habilitarSelect);
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    var select1 = document.getElementById('origen');
    var select2 = document.getElementById('destino');
    var miBoton = document.getElementById('buscar');

    select1.addEventListener('change', function() {
        validarSeleccion();
    });

    select2.addEventListener('change', function() {
        validarSeleccion();
    });

    function validarSeleccion() {
        if (select1.value !== '' && select2.value !== '') {
            miBoton.disabled = false;
        } else {
            miBoton.disabled = true;
        }
    }
});


function actualizarDestinos(destinos) {
    var destinoSelect = $('#destino');
    destinoSelect.empty(); // Limpiar select de destinos

    // Agregar opciones al select de destinos con un bucle foreach
    $.each(destinos, function(key, value) {
        destinoSelect.append('<option value="' + key + '">' + value + '</option>');
    });
}



//DESTINOS
$(document).ready(function() {
  $('#origen').change(function() {
      var origenSeleccionado = $(this).val(); // Obtener el valor del origen seleccionado
      obtenerDestinos(origenSeleccionado);
  });

function obtenerDestinos(origen) {
    console.log(origen);
    const baseUrl = $('meta[name="base-url"]').attr('content');

    // Construye la URL completa usando el nombre de la ruta
    const url = `${baseUrl}/destinoOrigen?origen=${origen}`;
    
      $.ajax({
          url: url,
          type: 'GET',
          dataType:"json", 
          success: function(destinos) {
              actualizarDestinos(destinos); // Llamar a la función para actualizar los destinos
              console.log(destinos);
          },
          error: function() {
              console.log('Error al obtener destinos');
          }
      });
  }

  function actualizarDestinos(destinos) {
      var destinoSelect = $('#destino');
      destinoSelect.empty(); // Limpiar select de destinos

      destinos.destinos.forEach(element => {
        destinoSelect.append('<option value="' + element + '">' + element + '</option>');
      });
  }
});

function irAVuelos(idCliente) {
  const baseUrl = $('meta[name="base-url"]').attr('content');

  let ida =""
  if(document.getElementById('ida').checked){
    ida="ida"
  }
  else if(document.getElementById('idaVuelta').checked){
    ida="idaVuelta"
  }

  let origen = document.getElementById('origen').value;
  let destino = document.getElementById('destino').value;
  // Construye la URL completa usando el nombre de la ruta
  const urlVuelos = `${baseUrl}/vuelos?origen=${origen}&destino=${destino}&User=${idCliente}&tipo=${ida}`;
  window.location.href=urlVuelos;

}

function mostrarSideBar(idCliente) {
  if (document.getElementById('sidebar').style.display != "flex") {
    document.getElementById('sidebar').style.display="flex";
    const baseUrl = $('meta[name="base-url"]').attr('content');
    const url = `${baseUrl}/boletosUsuario/${idCliente}`;
    $.ajax({
      url: url,
      type: `GET`,
      dataType: "json",
      success: function(respuesta) {
        console.log(respuesta.boletos);
        document.getElementById('sidebarBoletos').innerHTML = ""
        respuesta.boletos.forEach(element => {
          document.getElementById('sidebarBoletos').innerHTML += `
          <div class="boletodiv" id="renderizadoBoletos">
          <div id="boletoIdVuelo"><h5>Vuelo:</h5><h5>${element.asiento.vuelo.idVuelo}</h5></div>
          <div id="boletoIdDestino"><h5>Destino:</h5><h5>${element.asiento.vuelo.ruta.destino}</h5></div>
          <div id="boletoIdAsiento"><h5>Asiento:</h5><h5>${element.asiento.nombreAsiento}</h5></div>
          </div>
          
          `
        
        
        });
      },
      error: function() {
          console.log('Error al crearBoleto');
      }
    })
  }
  else{
    document.getElementById('sidebar').style.display="none";
  }

}