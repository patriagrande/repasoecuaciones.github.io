/* ============================================================
   MATEMÁTICA 1 — UNCo | Presentación: Ecuaciones
   slides.js
   ============================================================

   ╔══════════════════════════════════════════════════════════╗
   ║  CÓMO AGREGAR O ELIMINAR DIAPOSITIVAS                   ║
   ╠══════════════════════════════════════════════════════════╣
   ║                                                          ║
   ║  ► AGREGAR UNA DIAPOSITIVA:                              ║
   ║    1. En index.html, buscá la sección de slides          ║
   ║       (divs con clase "slide").                          ║
   ║    2. Copiá el bloque de una diapositiva existente       ║
   ║       y pegalo a continuación del último .slide.         ║
   ║    3. Cambiá el contenido (título, párrafos, etc.).       ║
   ║    4. Listo. El JS numera y registra todo automáticamente.║
   ║                                                          ║
   ║  ► ELIMINAR UNA DIAPOSITIVA:                             ║
   ║    1. En index.html, localizá el div.slide que querés    ║
   ║       borrar.                                            ║
   ║    2. Eliminá ese bloque completo (desde <div class=     ║
   ║       "slide"> hasta el </div> de cierre).               ║
   ║    3. El JS reindexará todo automáticamente.             ║
   ║                                                          ║
   ║  ► AGREGAR CONTENIDO DENTRO DE UNA DIAPOSITIVA:          ║
   ║    Usá las clases CSS disponibles (ver styles.css):       ║
   ║    .def-box, .note-box, .eq-display, .prop-grid,         ║
   ║    .prop-card, .steps, .resolution, .two-col, etc.       ║
   ║    Para fórmulas: \( ... \) inline, \[ ... \] bloque.    ║
   ║                                                          ║
   ╚══════════════════════════════════════════════════════════╝
*/

(function () {
  "use strict";

  /* ── Estado ── */
  let current  = 0;
  let slides   = [];
  let dots     = [];
  let total    = 0;
  let animating = false;

  /* ── Referencias DOM ── */
  const stage       = document.getElementById("stage");
  const dotsContainer = document.getElementById("dots");
  const btnPrev     = document.getElementById("btn-prev");
  const btnNext     = document.getElementById("btn-next");
  const progressFill = document.getElementById("progress-fill");
  const counterSpan  = document.getElementById("slide-current");
  const totalSpan    = document.getElementById("slide-total");

  /* ── Inicialización ── */
  function init() {
    slides = Array.from(document.querySelectorAll(".slide"));
    total  = slides.length;

    /* Inyectar data-index para el ornamento de esquina */
    slides.forEach((s, i) => {
      s.setAttribute("data-index", String(i + 1).padStart(2, "0"));
    });

    totalSpan.textContent = total;

    /* Crear dots */
    dotsContainer.innerHTML = "";
    slides.forEach((_, i) => {
      const d = document.createElement("button");
      d.className = "dot";
      d.setAttribute("aria-label", `Diapositiva ${i + 1}`);
      d.addEventListener("click", () => goTo(i));
      dotsContainer.appendChild(d);
      dots.push(d);
    });

    goTo(0, true);
    bindKeys();
  }

  /* ── Navegación ── */
  function goTo(index, instant = false) {
    if (index < 0 || index >= total) return;
    if (animating && !instant) return;

    const prev = current;
    current    = index;

    if (!instant) {
      animating = true;
      slides[prev]?.classList.remove("active");
      setTimeout(() => {
        activateSlide(current);
        animating = false;
      }, 40);
    } else {
      slides.forEach(s => s.classList.remove("active"));
      activateSlide(current);
    }

    updateUI();
    typeset();        // re-renderizar MathJax si hay fórmulas nuevas
  }

  function activateSlide(index) {
    slides.forEach(s => s.classList.remove("active"));
    slides[index].classList.add("active");
  }

  function updateUI() {
    counterSpan.textContent = current + 1;

    /* Progress */
    const pct = total <= 1 ? 100 : (current / (total - 1)) * 100;
    progressFill.style.width = pct + "%";

    /* Buttons */
    btnPrev.disabled = current === 0;
    btnNext.disabled = current === total - 1;

    /* Dots */
    dots.forEach((d, i) => {
      d.classList.toggle("active", i === current);
    });
  }

  /* ── MathJax re-renderizado ── */
  function typeset() {
    if (window.MathJax && window.MathJax.typesetPromise) {
      MathJax.typesetPromise([slides[current]]).catch(console.error);
    }
  }

  /* ── Keyboard ── */
  function bindKeys() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        goTo(current + 1);
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        goTo(current - 1);
      }
      if (e.key === "Home") goTo(0);
      if (e.key === "End")  goTo(total - 1);
    });
  }

  /* ── Touch / swipe ── */
  let touchStartX = null;
  stage.addEventListener("touchstart", e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  stage.addEventListener("touchend",   e => {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) goTo(current + (dx < 0 ? 1 : -1));
    touchStartX = null;
  });

  /* ── Botones ── */
  btnPrev.addEventListener("click", () => goTo(current - 1));
  btnNext.addEventListener("click", () => goTo(current + 1));

  /* ── Arranque ── */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
