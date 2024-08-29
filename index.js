// Objeto que contiene los porcentajes de impuestos
const impuestos = {
    IVA: 0.21,
    PAIS: 0.08,
    GANANCIAS: 0.30,
    PROVINCIA: 0.02
};

// Recuperar el historial del localStorage o inicializarlo si no existe
let historial = JSON.parse(localStorage.getItem('historial')) || [];

// Mostrar historial en el DOM
function mostrarHistorial() {
    const historialElement = document.getElementById('historial');
    historialElement.innerHTML = '';
    historial.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. Monto original: $${item.montoOriginal.toFixed(2)}, Monto con impuesto: $${item.montoConImpuesto.toFixed(2)}`;
        historialElement.appendChild(li);
    });
}

// Función para calcular el costo con impuesto
function calcularCostoConImpuesto(monto) {
    return monto + (monto * impuestos.IVA) + (monto * impuestos.PAIS) + (monto * impuestos.GANANCIAS) + (monto * impuestos.PROVINCIA);
}

// Manejar el envío del formulario
document.getElementById('formImpuestos').addEventListener('submit', function(e) {
    e.preventDefault();

    const montoOriginal = parseFloat(document.getElementById('monto').value);
    if (isNaN(montoOriginal) || montoOriginal <= 0) {
        alert('Por favor, ingrese un monto válido.');
        return;
    }

    const montoConImpuesto = calcularCostoConImpuesto(montoOriginal);

    // Guardar el cálculo en el historial
    const nuevoCalculo = {
        montoOriginal: montoOriginal,
        montoConImpuesto: montoConImpuesto
    };
    historial.push(nuevoCalculo);

    // Guardar el historial en localStorage
    localStorage.setItem('historial', JSON.stringify(historial));

    // Mostrar el resultado en el DOM
    document.getElementById('resultado').innerHTML = `
        <p>Monto original: $${montoOriginal.toFixed(2)}</p>
        <p>IVA (21%): $${(montoOriginal * impuestos.IVA).toFixed(2)}</p>
        <p>PAIS (8%): $${(montoOriginal * impuestos.PAIS).toFixed(2)}</p>
        <p>Ganancias (30%): $${(montoOriginal * impuestos.GANANCIAS).toFixed(2)}</p>
        <p>Provincia (2%): $${(montoOriginal * impuestos.PROVINCIA).toFixed(2)}</p>
        <p><strong>Monto total a pagar: $${montoConImpuesto.toFixed(2)}</strong></p>
    `;

    // Actualizar y mostrar el historial en el DOM
    mostrarHistorial();
});

// Mostrar el historial al cargar la página
document.addEventListener('DOMContentLoaded', mostrarHistorial);
