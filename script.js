const form = document.querySelector("#filterForm");
const result = document.querySelector("#result");
const clearBtn = document.querySelector("#clearBtn");
const themeToggle = document.querySelector("#themeToggle");

const fields = ["brand", "model", "year", "engine"].map((id) =>
  document.getElementById(id)
);

function normalize(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function showResult(title, message, type = "") {
  result.hidden = false;
  result.className = `result ${type}`;

  result.innerHTML = `
    <h3>${title}</h3>
    <p>${message}</p>
  `;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const [brand, model, year, engine] = fields.map(
    (field) => field.value
  );

  if (!brand.trim() || !model.trim() || !year.trim()) {
    showResult(
      "Datos incompletos",
      "⚠️ Ingresa marca, modelo y año.",
      "warning"
    );

    return;
  }

  const demoMatch =
    normalize(brand) === "toyota" &&
    normalize(model) === "corolla" &&
    year.trim() === "2016" &&
    normalize(engine) === "1.8 2zr-fe";

  if (demoMatch) {
    showResult(
      "Filtro: 04152-YZZA6",
      "✓ Aplicación encontrada · DEMO",
      "success"
    );
  } else {
    showResult(
      "Pendiente de consulta",
      "⚠️ La búsqueda externa y la conexión con el Excel se agregarán posteriormente.",
      "warning"
    );
  }
});

clearBtn.addEventListener("click", () => {
  form.reset();
  result.hidden = true;
  result.innerHTML = "";
});

themeToggle.addEventListener("click", () => {
  const dark = document.body.classList.toggle("dark");

  themeToggle.innerHTML = dark
    ? "☀ <span>Modo día</span>"
    : "☾ <span>Modo nocturno</span>";

  localStorage.setItem(
    "filterFinderTheme",
    dark ? "dark" : "light"
  );
});

if (localStorage.getItem("filterFinderTheme") === "dark") {
  document.body.classList.add("dark");
  themeToggle.innerHTML = "☀ <span>Modo día</span>";
}
