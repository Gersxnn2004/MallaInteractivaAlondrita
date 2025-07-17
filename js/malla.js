const estructuraMalla = {
  "NÚMEROS": [
    "Conjuntos de numeros enteros y racionales",
    "Porcentajes",
    "Potencias y Raices Enesimas"
  ],
  "ÁLGEBRA Y FUNCIONES": [
    "Expresiones algebraicas",
    "Proporcionalidad",
    "Ecuaciones e inecuaciones de primer grado",
    "Sistemas de ecuaciones lineales (2x2)",
    "funcion lineal y afin",
    "Funcion Cuadratica"
  ],
  "GEOMETRÍA": [
    "Figuras Geometricas",
    "Cuerpos Geometricos",
    "Transformaciones isometricas"
  ]
};

const estado = JSON.parse(localStorage.getItem("estadoMalla")) || {};

function guardarEstado() {
  localStorage.setItem("estadoMalla", JSON.stringify(estado));
}

function crearMalla() {
  const contenedor = document.getElementById("contenedorMalla");
  for (const contenido in estructuraMalla) {
    const bloque = document.createElement("div");
    bloque.className = "bloque-contenido";
    bloque.textContent = contenido;

    const subcontenedor = document.createElement("div");
    subcontenedor.className = "subcontenidos";

    let todosSubcontenidosOpacos = true;

    estructuraMalla[contenido].forEach((sub, idx) => {
      const key = `${contenido}_${idx}`;
      const subDiv = document.createElement("div");
      subDiv.className = "subcontenido";
      subDiv.textContent = sub;

      if (estado[key]) subDiv.classList.add("opaco");
      else todosSubcontenidosOpacos = false;

      subDiv.addEventListener("click", () => {
        estado[key] = !estado[key];
        subDiv.classList.toggle("opaco");
        verificarBloqueCompleto(bloque, contenido);
        guardarEstado();
      });

      subcontenedor.appendChild(subDiv);
    });

    if (todosSubcontenidosOpacos) bloque.classList.add("opaco");

    bloque.appendChild(subcontenedor);
    contenedor.appendChild(bloque);
  }
}

function verificarBloqueCompleto(bloque, contenido) {
  const total = estructuraMalla[contenido].length;
  let completados = 0;

  estructuraMalla[contenido].forEach((_, idx) => {
    const key = `${contenido}_${idx}`;
    if (estado[key]) completados++;
  });

  if (completados === total) bloque.classList.add("opaco");
  else bloque.classList.remove("opaco");
}

crearMalla();

document.getElementById("btnBorrar").addEventListener("click", () => {
  if (confirm("¿Estás seguro de que quieres borrar todo tu progreso?")) {
    localStorage.removeItem("estadoMalla");
    Object.keys(estado).forEach(k => delete estado[k]);
    location.reload();
  }
});
