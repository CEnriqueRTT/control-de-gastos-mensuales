let listaNombresGastos = [];
let listaDescripcionesGastos = [];
let listaValoresGastos = [];
let indiceGasto = null; //A "indiceGasto" se le asigna "null", para indicar que "no tiene un valor válido" o que "está intencionalmente vacía". 

//Función que se invoca al momento de que el usuario hace click en "Agregar Gasto"
function AgregarGasto(){
    let nombreGasto = document.getElementById('nombreGasto').value; //"value" es solo para "inputs"
    let descripcionGasto = document.getElementById('descripcionGasto').value;
    let valorGasto = document.getElementById('valorGasto').value;
    console.log(nombreGasto);

    //Validar que "todos los campos" sean completados
    if (!nombreGasto || !descripcionGasto || !valorGasto) {
        alert('Debe completar todos los campos de forma correcta.');
        return; //Salir de la función antes de tiempo
    }
    //Validar que "valorGasto" este en el rango de ]0-150]
    if (valorGasto <=0 || valorGasto > 150) {
        alert('Ingresar un "Valor del gasto" en el rango de ]0-150] $');
        return;
    }

    //Si "se edita" un "gasto existente"
    if (indiceGasto !== null) {
        listaNombresGastos[indiceGasto] = nombreGasto;
        listaDescripcionesGastos[indiceGasto] = descripcionGasto;
        listaValoresGastos[indiceGasto] = valorGasto;
        indiceGasto = null; // Reiniciar la variable para futuras entradas
    } else {
        //Si "se agrega" un "gasto nuevo"
        listaNombresGastos.push(nombreGasto);
        listaDescripcionesGastos.push(descripcionGasto);
        listaValoresGastos.push(valorGasto);
        //console.log(listaNombresGastos);
    }

    actualizarListaGastos();
}

function actualizarListaGastos(){
    const listaGastos = document.getElementById('filaGasto');
    const totalDeGastos = document.getElementById('totalDeGastos');
    let ListaFilasGastos = '';
    let totalGastos = 0;

    listaNombresGastos.forEach((nombreGasto, posicion) => {
        const descripcionGasto = listaDescripcionesGastos[posicion];
        const valorGasto = Number(listaValoresGastos[posicion]);

        ListaFilasGastos += `<li>
                                <b>${posicion+1}. |&nbsp;&nbsp;Nombre:</b> ${nombreGasto}
                                <b>&nbsp;&nbsp;|&nbsp;&nbsp;Descripción:</b> ${descripcionGasto}
                                <b>&nbsp;&nbsp;|&nbsp;&nbsp;Valor:</b> ${valorGasto.toFixed(2)}
                                <b> $&nbsp;&nbsp;|</b>
                                <button onclick="editarGasto(${posicion});"><b><i class="fa-solid fa-pen-to-square"></i> Editar Gasto</b></button>
                                <button onclick="eliminarGasto(${posicion});"><b><i class="fa-solid fa-trash-can"></i> Eliminar Gasto</b></button>
                            </li>`; //Template string           
        //Se calcula el total de gastos
        totalGastos += valorGasto;
    });
    
    listaGastos.innerHTML = ListaFilasGastos;
    totalDeGastos.innerHTML = totalGastos.toFixed(2);
    limpiarInputs();
}

function limpiarInputs(){
    document.getElementById('nombreGasto').value = ''; 
    document.getElementById('descripcionGasto').value = '';
    document.getElementById('valorGasto').value = '';
}

function editarGasto(posicion){
    /* 
    const intputNombreGasto = document.getElementById('nombreGasto');
    intputNombreGasto.value = listaNombresGastos[posicion];
    */
    document.getElementById('nombreGasto').value = listaNombresGastos[posicion];
    document.getElementById('descripcionGasto').value = listaDescripcionesGastos[posicion]; 
    document.getElementById('valorGasto').value = listaValoresGastos[posicion]; 
    indiceGasto = posicion; //A "indiceGasto" se le asigna la "posición" que se esta editando
}

function eliminarGasto(posicion){
    //Eliminar de las listas 1 elemento de la posición ubicada
    listaNombresGastos.splice(posicion, 1);
    listaDescripcionesGastos.splice(posicion, 1);
    listaValoresGastos.splice(posicion, 1);
    actualizarListaGastos();
}
