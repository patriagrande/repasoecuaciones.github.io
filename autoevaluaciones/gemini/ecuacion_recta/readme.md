📝 PROMPT

Te estoy adjuntando dos textos:

    Cuadernillo para estudiantes: es un cuaderno/libro de actividades para estudiar función lineal en un curso de matemática de 3er año del colegio secundario.

    Notas para el docente: en este texto está el marco teórico que sostiene la propuesta, las justificaciones, muchas decisiones didácticas que se han tomado, y una descripción del recorrido por esta propuesta a lo largo de dos experiencias de implementación.

Con todo esto presente, quiero que me armes una aplicación dinámica web (que yo pueda descargar e instalar en mi servidor de GitHub Pages) para que mis estudiantes puedan autoevaluarse en su comprensión respecto de:

    Identificar la ecuación de la recta, tanto en su forma explícita como implícita.

    Convertir de una a la otra forma (evitemos operatoria algebraica complicada, que sea dentro del campo de los enteros o con fracciones fáciles de operar). No quiero que la dificultad algebraica obstruya el avance de los estudiantes (visibilidad de recurso).

    Discriminar puntos que son parte de una recta de aquellos que no lo sean.

    Reconocer los parámetros de la ecuación explícita de la recta a partir de información gráfica.

Pretendo que las actividades de autoevaluación tengan la siguiente lógica de puntuación y retroalimentación:

    Primer intento fallido: Admite un error (que baje el puntaje) y dispara una ayuda.

    Segundo intento fallido: Si luego de ese error y de revisar la respuesta, responde mal: simplemente no suma puntos, pero recibe una explicación de la respuesta correcta.

    Intento exitoso: En caso de que responda bien, obtiene el puntaje que corresponda y además un mensaje no solo de felicitación, sino de corroboración de lo que ha respondido.

Requisitos técnicos:

    Quiero al menos 10 preguntas.

    Al momento de cargarse la página, las preguntas deben ordenarse aleatoriamente.

Luego de este experimento, iremos puliendo mejoras. Si considerás que deberías realizarme preguntas antes de comenzar, hacelo.
🛠️ MALA MÍA (Aclaraciones y agregados)

Faltó indicar que todo lo relativo a texto matemático (expresiones aritméticas y algebraicas) debe estar formateado en LaTeX.

Vuelvo a olvidarme algo: al pedirle que use alguna librería para LaTeX, omití pedirle que las fórmulas queden expresadas explícitamente entre $ o $$. Necesito que sea así porque, de lo contrario, el código se hace ilegible y muy difícil de intervenir o modificar a mano.
