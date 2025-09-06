// =======================
// Animación del avatar
// =======================
const img = document.querySelector('.avatar');
if (img) {
  img.addEventListener('click', () => {
    img.classList.add('backflip');
    img.addEventListener('animationend', () => {
      img.classList.remove('backflip');
    }, { once: true });
  });
}

// =======================
// Helpers de storage
// =======================
function cargarUsuarios() {
  try {
    return JSON.parse(localStorage.getItem("usuarios_nl") || "[]");
  } catch {
    return [];
  }
}

// (opcional) mock por si no hay nadie registrado aún
const usuariosMock = [
  { correo: "nolimitscorp@gmail.com", contrasena: "NoLimits" },
  { correo: "nolimits@gmail.com",     contrasena: "NoLimits" }
];

function obtenerUsuariosParaLogin() {
  const list = cargarUsuarios();
  return (list && list.length) ? list : usuariosMock;
}

// =======================
// Validación de formulario
// =======================
const emailInput = document.getElementById('email');
const passInput  = document.getElementById('password');
const loginBtn   = document.getElementById('loginBtn');

const emailError = document.getElementById('emailError');
const passError  = document.getElementById('passError');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const MIN_PASS = 6;

function setInvalid(inputEl, errorEl, msg){
  if (errorEl) errorEl.textContent = msg || '';
  if (inputEl) inputEl.classList.toggle('is-invalid', Boolean(msg));
}
function clearInvalid(inputEl, errorEl){
  if (errorEl) errorEl.textContent = '';
  if (inputEl) inputEl.classList.remove('is-invalid');
}

// Validar email (formato)
function validarEmail() {
  const v = (emailInput.value || '').trim();
  if (!v)  { setInvalid(emailInput, emailError, '* Ingresa tu email'); return false; }
  if (!EMAIL_RE.test(v)) { setInvalid(emailInput, emailError, '* Email inválido'); return false; }
  clearInvalid(emailInput, emailError);
  return true;
}

// Validar contraseña (mínimo 6)
function validarPass() {
  const v = (passInput.value || '').trim();
  if (!v) { setInvalid(passInput, passError, '* Ingresa tu contraseña'); return false; }
  if (v.length < MIN_PASS) { setInvalid(passInput, passError, '* Mínimo 6 caracteres'); return false; }
  clearInvalid(passInput, passError);
  return true;
}

// =======================
// Login usando localStorage
// =======================
function login() {
  const okEmail = validarEmail();
  const okPass  = validarPass();
  if (!okEmail || !okPass) return;

  const email = emailInput.value.trim().toLowerCase();
  const pass  = passInput.value.trim();

  const usuarios = obtenerUsuariosParaLogin();

  // Busca por correo (case-insensitive)
  const user = usuarios.find(u => (u.correo || u.email || '').toLowerCase() === email);

  if (!user) {
    setInvalid(emailInput, emailError, '* No existe un usuario con ese correo');
    return;
  }
  if ((user.contrasena || user.password) !== pass) {
    setInvalid(passInput, passError, '* Contraseña incorrecta');
    return;
  }

  // Éxito
  clearInvalid(emailInput, emailError);
  clearInvalid(passInput, passError);
  // Puedes guardar “sesión” simple si quieres:
  // localStorage.setItem('nl_auth_email', email);
  window.location.href = '../html/principal.html';
}

// Click del botón
if (loginBtn) loginBtn.addEventListener('click', login);

// Enter para enviar
[emailInput, passInput].forEach(el => {
  if (!el) return;
  el.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      login();
    }
  });
});

// Limpia errores al escribir
if (emailInput) emailInput.addEventListener('input', () => clearInvalid(emailInput, emailError));
if (passInput)  passInput .addEventListener('input', () => clearInvalid(passInput,  passError));
