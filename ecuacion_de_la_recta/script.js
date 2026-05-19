// Definimos la relación matemática oculta (y = mx + b)
const m = 2;
const b = 1;

// Definimos el dominio visible para el gráfico
const xMin = 0;
const xMax = 10;

// 1. ESTADO INICIAL: 6 puntos discretos bien separados
let xData = [1, 2.5, 4, 6, 7.5, 9];
let yData = xData.map(x => m * x + b);

// Configuración de la "traza" (los datos) para Plotly
const trace = {
    x: xData,
    y: yData,
    mode: 'markers', // Solo puntos, sin líneas uniéndolos
    type: 'scatter',
    marker: {
        size: 10,
        color: '#e74c3c',
        opacity: 0.8
    },
    name: 'Puntos'
};

// Configuración del entorno visual (ejes)
const layout = {
    margin: { t: 40, r: 40, b: 40, l: 40 },
    xaxis: {
        title: 'Variable Independiente (x)',
        range: [xMin, xMax],
        zeroline: true
    },
    yaxis: {
        title: 'Variable Dependiente (y)',
        range: [m * xMin + b - 2, m * xMax + b + 2],
        zeroline: true
    },
    hovermode: 'closest',
    showlegend: false
};

// Renderizamos el gráfico inicial
Plotly.newPlot('grafico', [trace], layout, {responsive: true});

// 2. LÓGICA DE ACTUALIZACIÓN: Completando la recta
document.getElementById('btn-agregar').addEventListener('click', () => {
    const nuevosX = [];
    const nuevosY = [];

    // Generar 10 puntos aleatorios dentro del dominio
    for (let i = 0; i < 10; i++) {
        // Obtenemos un x aleatorio entre xMin y xMax
        const xAleatorio = xMin + Math.random() * (xMax - xMin);

        // Calculamos su y correspondiente obligándolo a pertenecer a la recta
        nuevosX.push(xAleatorio);
        nuevosY.push(m * xAleatorio + b);
    }

    // Extendemos el gráfico existente inyectando los nuevos arrays de datos
    // Esto es mucho más eficiente a nivel de rendimiento que redibujar todo
    Plotly.extendTraces('grafico', {
        x: [nuevosX],
        y: [nuevosY]
    }, [0]);
});
