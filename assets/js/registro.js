// ../assets/js/registro.js

// =============================
// Funciones auxiliares (storage)
// =============================
function cargarUsuarios() {
  return JSON.parse(localStorage.getItem("usuarios_nl") || "[]");
}
function guardarUsuarios(usuarios) {
  localStorage.setItem("usuarios_nl", JSON.stringify(usuarios));
}
function buscarUsuarioPorCorreo(correo) {
  return cargarUsuarios().find(u => u.correo.toLowerCase() === correo.toLowerCase()) || null;
}

// =============================
// Utilidades de validación UI
// =============================
function setError(idCampo, mensaje) {
  const errorEl = document.getElementById(`error-${idCampo}`);
  if (errorEl) errorEl.textContent = mensaje || "";
  const input = document.getElementById(idCampo);
  if (input) input.classList.toggle("is-invalid", Boolean(mensaje));
}
function limpiarErrores() {
  document.querySelectorAll(".error").forEach(el => (el.textContent = ""));
  document.querySelectorAll(".is-invalid").forEach(el => el.classList.remove("is-invalid"));
}

// Validaciones de formato
function esEmailValido(correo) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
}
function esTelefonoCLValido(telefono) {
  // Acepta "+56 9 1234 5678", "+56912345678" o "56912345678"
  const t = telefono.replace(/\s|-/g, "");
  return /^(\+?56)?9\d{8}$/.test(t);
}

// =============================
// Lógica principal
// =============================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form.cajita.form-grid");
  if (!form) return;

  // Limpia el error al escribir/cambiar en cada input
  ["username","apellido","correo","telefono","contrasena","contrasena2"].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("input", () => setError(id, ""));
    el.addEventListener("blur",  () => setError(id, "")); // opcional
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    limpiarErrores();

    // Tomar valores
    const nombre      = document.getElementById("username").value.trim();
    const apellidos   = document.getElementById("apellido").value.trim();
    const correo      = document.getElementById("correo").value.trim();
    const telefono    = document.getElementById("telefono").value.trim();
    const contrasena  = document.getElementById("contrasena").value;
    const contrasena2 = document.getElementById("contrasena2").value;

    let valido = true;

    // -------- Validaciones por campo --------
    if (!nombre) {
      setError("username", "* El nombre es obligatorio.");
      valido = false;
    }
    if (!apellidos) {
      setError("apellido", "* Los apellidos son obligatorios.");
      valido = false;
    }
    if (!correo) {
      setError("correo", "* El correo es obligatorio.");
      valido = false;
    } else if (!esEmailValido(correo)) {
      setError("correo", "* Ingresa un correo válido.");
      valido = false;
    }
    if (!telefono) {
      setError("telefono", "* El teléfono es obligatorio.");
      valido = false;
    } else if (!esTelefonoCLValido(telefono)) {
      setError("telefono", "* Formato válido: +56 9 1234 5678.");
      valido = false;
    }
    if (!contrasena) {
      setError("contrasena", "* La contraseña es obligatoria.");
      valido = false;
    } else if (contrasena.length < 8) {
      setError("contrasena", "* La contraseña requiere de almenos 8 caracteres.");
      valido = false;
    }
    if (!contrasena2) {
      setError("contrasena2", "* Repite la contraseña.");
      valido = false;
    } else if (contrasena && contrasena !== contrasena2) {
      setError("contrasena2", "* Las contraseñas no coinciden.");
      valido = false;
    }

    // Correo duplicado
    if (valido && buscarUsuarioPorCorreo(correo)) {
      setError("correo", "* Ya existe un usuario con ese correo.");
      valido = false;
    }

    if (!valido) return; // hay errores, no seguimos

    // -------- Guardar usuario --------
    const usuarios = cargarUsuarios();
    usuarios.push({ nombre, apellidos, correo, telefono, contrasena });
    guardarUsuarios(usuarios);
    alert("Usuario registrado con éxito")
    // Éxito: redirige sin alertas
    window.location.href = "../html/inicioSesion.html"; // ajusta la ruta si es distinta
  });
});
