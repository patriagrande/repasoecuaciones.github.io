# Cuestionario de autoevaluación — Parámetros de URL

Guía de uso de los parámetros que acepta el cuestionario. Está pensada para quien
edita o publica el material; el estudiante no necesita conocer nada de esto: abre
la dirección sin parámetros y funciona.

---

## Resumen rápido

| Parámetro | Ejemplo | Qué hace |
|---|---|---|
| *(ninguno)* | `index.html` | Cuestionario completo, todo al azar. |
| `ask` | `index.html?ask=2` | Sortea 2 preguntas **de cada categoría**. |
| `debug` | `index.html?debug=1` | Vista de revisión: todas las preguntas listadas. |
| `q` | `index.html?q=F5` | Ejecuta **una sola** pregunta, la indicada. |
| `q` + `debug` | `index.html?q=F5&debug=1` | Esa pregunta, con las opciones **sin barajar**. |

---

## Sin parámetros — el modo del estudiante

```
index.html
```

Es la forma en que se publica y la que van a usar las y los estudiantes.

Entran **todas** las preguntas del cuestionario. Tanto el orden de las preguntas
como el orden de las opciones dentro de cada una se sortean **en cada carga de la
página**. Dos estudiantes sentados uno al lado del otro ven cosas distintas, y la
misma persona que recarga la página vuelve a encontrar otro orden.

---

## `ask=N` — sortear N preguntas de cada categoría

```
index.html?ask=2
```

El cuestionario está organizado en categorías temáticas (¿es o no función?,
determinar el dominio, del gráfico a la función, etc.). El parámetro `ask` indica
**cuántas preguntas se sortean de cada una de esas categorías**, no cuántas en
total.

Con seis categorías de cinco preguntas cada una:

| URL | Preguntas por categoría | Total |
|---|---|---|
| `?ask=1` | 1 | 6 |
| `?ask=2` | 2 | 12 |
| `?ask=3` | 3 | 18 |
| `?ask=5` | 5 (todas) | 30 |

**El orden final es completamente aleatorio.** El sorteo por categoría solo
decide *cuáles* entran; una vez elegidas, se mezclan todas entre sí. El
estudiante no percibe ningún agrupamiento: puede tocarle una de dominio, después
una de gráficos y después otra de dominio. Las opciones también se barajan.

La ventaja frente a un sorteo global: con `?ask=2` hay garantía de que los seis
temas están representados. Un sorteo global de 12 preguntas podría, por mala
suerte, dejar un tema afuera y cargar cuatro de otro.

**Valores fuera de rango.** Si `N` es mayor que el tamaño de una categoría, de esa
categoría entran todas las que tenga. Si `N` no es un número entero, o es menor
que 1, el parámetro se ignora y entran todas las preguntas.

**Usos típicos.** `?ask=1` para un repaso corto de seis preguntas, una por tema.
`?ask=2` o `?ask=3` para una práctica de duración intermedia. Sin parámetro, para
la autoevaluación completa.

---

## `debug=1` — vista de revisión

```
index.html?debug=1
```

Modo pensado para quien edita el material. Muestra **todas** las preguntas
listadas una debajo de la otra, agrupadas por categoría y en el mismo orden en que
están escritas en el archivo fuente. No se sortea nada: ni las preguntas ni las
opciones.

Qué se ve en cada una: el enunciado, las opciones en su orden original, el gráfico
ya dibujado (útil para verificar cómo se ve en pantalla chica), la pista y la
explicación.

Incluye un **panel de categorías** con casillas para mostrar y ocultar cada
bloque, de modo de poder concentrarse en el tema que se está editando sin
recorrer toda la página.

Cada pregunta lleva además un **botón para probarla aislada**, que la abre en una
pestaña nueva funcionando de verdad (ver `q` más abajo). Ese es el ciclo de
trabajo previsto: se edita una pregunta en el archivo fuente, se recarga la
pestaña de `debug=1`, se hace clic en el botón y se la prueba tal como la vería un
estudiante.

**`debug=1` ignora `ask`.** El modo de revisión siempre lista el cuestionario
completo, porque su razón de ser es poder ver todo el material junto.

---

## `q=ID` — ejecutar una sola pregunta

```
index.html?q=F5
```

Arma un cuestionario de **una sola pregunta**: la que tenga ese identificador.
Funciona igual que el cuestionario normal —se responde, se cuentan los intentos,
aparece la pista al fallar, se muestra la explicación y el puntaje final—, solo
que con una única pregunta.

Los identificadores son los que figuran en el archivo fuente y en el documento de
preguntas: `A1` a `A5`, `B1` a `B5`, `C1` a `C5`, y así con el resto de las
categorías.

Por defecto **las opciones aparecen barajadas**, para probar la pregunta tal como
la va a encontrar el estudiante.

Si el identificador no existe, el parámetro se ignora y se carga el cuestionario
completo.

### `q=ID&debug=1` — una sola pregunta, con las opciones sin barajar

```
index.html?q=F5&debug=1
```

Misma pregunta, ejecutable igual que antes, pero con las **opciones en el orden
del archivo fuente**. Sirve para cotejar contra el documento mientras se edita:
si en el archivo la correcta es la primera, en pantalla también va a ser la
primera.

Combinación útil cuando se está corrigiendo la redacción de las opciones o
revisando que los distractores estén bien ubicados.

---

## Prioridad entre parámetros

Cuando aparece más de uno, se resuelven en este orden:

1. **`q`** manda sobre todo lo demás: si es válido, el cuestionario es de una sola
   pregunta. (`debug` sigue teniendo efecto sobre el barajado de opciones.)
2. **`debug=1`**, si no hay `q`: vista de revisión con todas las preguntas, e
   ignora `ask`.
3. **`ask`**, si no hay ninguno de los dos anteriores.
4. Sin ninguno: cuestionario completo, todo al azar.

---

## Ejemplos de uso

```
index.html                    → autoevaluación completa (esto es lo que se publica)
index.html?ask=1              → repaso corto: 6 preguntas, una por tema
index.html?ask=3              → práctica intermedia: 18 preguntas, 3 por tema
index.html?debug=1            → revisar todo el material, con panel de categorías
index.html?q=C4               → probar la pregunta C4 como la vería un estudiante
index.html?q=C4&debug=1       → probar C4 con las opciones en el orden del fuente
```

---

## Nota sobre la publicación

El enlace que se comparta con las y los estudiantes debe ir **sin parámetros**, o
a lo sumo con `ask`. Los modos `debug` y `q` son herramientas de edición: dejan a
la vista el orden original de las opciones y no aportan nada a quien está
resolviendo la autoevaluación.
