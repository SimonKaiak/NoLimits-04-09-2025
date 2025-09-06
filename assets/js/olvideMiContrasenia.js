// ../js/olvideMiContrasenia.js
window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formOlvide");
  const emailInput = document.getElementById("email");
  const errorMsg = document.getElementById("errorMsg");

  // ==== helpers de storage (mismos que usas en registro/inicioSesion) ====
  function cargarUsuarios() {
    try { return JSON.parse(localStorage.getItem("usuarios_nl") || "[]"); }
    catch { return []; }
  }
  function buscarUsuarioPorCorreo(correo) {
    const list = cargarUsuarios();
    const needle = (correo || "").trim().toLowerCase();
    return list.find(u => (u.correo || "").toLowerCase() === needle) || null;
  }

  const showError  = (msg) => { errorMsg.textContent = msg; emailInput.classList.add("input-error"); };
  const clearError = () =>   { errorMsg.textContent = "";  emailInput.classList.remove("input-error"); };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email   = (emailInput.value || "").trim();
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // Vacío / formato inválido
    if (!email)    { showError("* Ingrese un correo electrónico."); return; }
    if (!isEmail)  { showError("* Formato de correo inválido.");   return; }

    // ¿Existe en localStorage?
    const user = buscarUsuarioPorCorreo(email);
    if (!user) {
      showError("* El correo no está asociado a ninguna cuenta registrada.");
      return;
    }

    // OK
    clearError();
    alert(`Enviamos un enlace de recuperación a: ${email}`);

    // OJO: dale un delay, por ejemplo 1500 ms (1.5 s)
    setTimeout(() => { window.location.href = "../index.html"; }, 1500);
  });

  // Limpia error al tipear
  emailInput.addEventListener("input", () => { if (errorMsg.textContent) clearError(); });
});
