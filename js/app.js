import Ingreso from './Ingreso.js';
import Egreso from './Egreso.js';

const ingresos = [
    new Ingreso('Salario', 25000),
    new Ingreso('Venta de laptop', 12000),
    new Ingreso('Proyecto freelance', 5000)
];

const egresos = [
    new Egreso('Renta', 5000),
    new Egreso('Comida', 2500),
    new Egreso('Mantenimiento auto', 1200)
];


const cargarCabecero = () => {
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos() / totalIngresos();
    document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuesto);
    document.getElementById("porcentaje").innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById("ingresos").innerHTML = formatoMoneda(totalIngresos());
    document.getElementById("egresos").innerHTML = formatoMoneda(totalEgresos());
}

const totalIngresos = () => {
    let totalIngreso = 0;
    for (const ingreso of ingresos) {
        totalIngreso += ingreso.valor
    }
    return totalIngreso
}

const totalEgresos = () => {
    let totalEgreso = 0;
    for (const egreso of egresos) {
        totalEgreso += egreso.valor
    }
    return totalEgreso;
}


const formatoMoneda = valor => {
    return valor.toLocaleString('es-MX', {
        style: 'currency',
        currency: 'MXN',
        minimumFractionDigits: 2
    });
};

const formatoPorcentaje = valor => {
    return valor.toLocaleString('es-MX', {
        style: 'percent',
        minimumFractionDigits: 2
    });
};

const cargarApp = () => {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
};


const cargarIngresos = () => {
    let ingresosHTML = "";

    for (const ingreso of ingresos) {
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    document.getElementById("lista-ingresos").innerHTML = ingresosHTML;

}

const crearIngresoHTML = ingreso => {
    const ingresoHTML = `
      <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${ingreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
          <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
          <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn" onclick="eliminarIngreso(${ingreso.id})">
              <ion-icon name="close-circle-outline"></ion-icon>
            </button>
          </div>
        </div>
      </div>
    `;
    return ingresoHTML;
};

const crearEgresoHTML = egreso => {
    const egresoHTML = `
      <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${egreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
          <div class="elemento_valor">${formatoMoneda(egreso.valor)}</div>
          <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn" onclick="eliminarEgreso(${egreso.id})">
              <ion-icon name="close-circle-outline"></ion-icon>
            </button>
          </div>
        </div>
      </div>
    `;
    return egresoHTML;
};

const cargarEgresos = () => {
    let egresosHTML = "";

    for (const egreso of egresos) {
        egresosHTML += crearEgresoHTML(egreso);
    }

    document.getElementById("lista-egresos").innerHTML = egresosHTML;
};


const eliminarEgreso = id => {
    // Buscar el índice del egreso con el id recibido
    const indiceEliminar = egresos.findIndex(egreso => egreso.id === id);

    // Eliminar ese elemento del arreglo
    if (indiceEliminar !== -1) {
        egresos.splice(indiceEliminar, 1);
    }

    // Volver a calcular y actualizar la vista
    cargarCabecero();
    cargarEgresos();
};

const eliminarIngreso = id => {
    // Buscar el índice del ingreso con el id recibido
    const indiceEliminar = ingresos.findIndex(ingreso => ingreso.id === id);

    // Eliminar ese elemento del arreglo
    if (indiceEliminar !== -1) {
        ingresos.splice(indiceEliminar, 1);
    }

    // Volver a calcular y actualizar la vista
    cargarCabecero();
    cargarIngresos();
};

const agregarDato = () => {
    const forma = document.getElementById("forma");

    const tipo = forma.tipo.value;
    const descripcion = forma.descripcion.value;
    const valor = parseFloat(forma.valor.value);

    // Validar que los campos no estén vacíos
    if (descripcion !== "" && !isNaN(valor) && valor > 0) {
        if (tipo === "ingreso") {
            ingresos.push(new Ingreso(descripcion, valor));
            cargarCabecero();
            cargarIngresos();
        } else if (tipo === "egreso") {
            egresos.push(new Egreso(descripcion, valor));
            cargarCabecero();
            cargarEgresos();
        }

        // Limpiar campos del formulario después de agregar
        forma.reset();
    } else {
        alert("Por favor completa la descripción y un valor numérico válido.");
    }
};



window.cargarApp = cargarApp;
window.eliminarEgreso = eliminarEgreso;
window.eliminarIngreso = eliminarIngreso;
window.agregarDato = agregarDato;

