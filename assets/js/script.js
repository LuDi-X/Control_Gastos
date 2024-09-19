let list_gasto_nom=[];
let list_gasto_val=[];
let list_gasto_des=[];
let sw=false; //Switch el cual se activa cuando se realiza una modificacion
let posicion_mod=0; //Variable que captura la posicion del elemento a modificar

//Función se invoca al momento que el usario haga click en el boton
function clickBoton(){
    let gasto_nom = document.getElementById("nombreGasto").value;
    let gasto_val = document.getElementById("valorGasto").value;
    let gasto_des = document.getElementById("descripcionGasto").value;
    
    
    //Mensaje de Alerta
    if (gasto_nom=="" || gasto_des=="" || gasto_val=="") {
        alerta();    
    }else{
        //Condicion para el switch
        if (gasto_val>150) {
            mostrar_alerta();
        }
        if (sw==false) {
            list_gasto_nom.push(gasto_nom);
            list_gasto_val.push(gasto_val);
            list_gasto_des.push(gasto_des);    
        }else{
            //
            list_gasto_nom.splice(posicion_mod,1,gasto_nom);
            list_gasto_val.splice(posicion_mod,1,gasto_val);
            list_gasto_des.splice(posicion_mod,1,gasto_des);
            sw=false;
        }
        actualizar_lista_gastos();
    }
}
function actualizar_lista_gastos(){
    const list_element = document.getElementById("listaDeGastos");
    const total_html = document.getElementById("totalGastos");
    let html_list = '';
    let total_gastos = 0;
    list_gasto_nom.forEach((elemento,posicion)=>{
        let gastos_val = Number(list_gasto_val[posicion]);
        let gastos_des = list_gasto_des[posicion];
        html_list += `<li>${elemento} ||| ${gastos_des} ||| USD ${gastos_val.toFixed(2)} 
        <button class="btn_actualizar" onclick="modificar_gastos(${posicion});"> 
        <img src="assets/img/icons/update.png" width="30px" height="30px">Modificar
        </button>
        <button class="btn_eliminar" onclick="eliminar_gastos(${posicion});"> 
        <img src="assets/img/icons/delete.png" width="30px" height="30px">Eliminar
        </button>
        </li>`;
        //Calculo del Total de Gastos
        total_gastos+= Number(gastos_val);
    });
    list_element.innerHTML = html_list;
    total_html.innerHTML=total_gastos.toFixed(2);
    limpiar();
}
function limpiar(){
    document.getElementById("nombreGasto").value='';
    document.getElementById("valorGasto").value='';
    document.getElementById("descripcionGasto").value='';
    document.getElementById("nombreGasto").focus();
}
function eliminar_gastos(posicion){
    list_gasto_nom.splice(posicion,1);
    list_gasto_val.splice(posicion,1);
    actualizar_lista_gastos();
}
function modificar_gastos(posicion) {
    document.getElementById("nombreGasto").value=list_gasto_nom[posicion];
    document.getElementById("descripcionGasto").value=list_gasto_des[posicion];
    document.getElementById("valorGasto").value=list_gasto_val[posicion];
    sw=true;
    posicion_mod=posicion;
}

//Alertas
function mostrar_alerta() {
    Swal.fire({
        icon: 'info',
        title: '¡Alerta!',
        text: 'Tomar encuenta el precio elevado.',
        confirmButtonText: 'Entendido'
    });
}
function alerta() {
    Swal.fire({
        icon: 'warning',
        title: '¡Error!',
        text: 'Todos los campos deben de estar llenados',
        confirmButtonText: 'Entendido'
    });
}