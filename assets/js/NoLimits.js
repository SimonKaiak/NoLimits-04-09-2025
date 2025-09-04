// ============================
// Bootstrap Carousel (autoplay)
// ============================
document.addEventListener('DOMContentLoaded', () => {
  const el = document.querySelector('#carouselExampleAutoplaying');
  if (el && window.bootstrap?.Carousel) {
    // Por defecto Bootstrap usa 5000ms. Aquí 4000ms.
    new bootstrap.Carousel(el, { interval: 4000, ride: 'carousel' });
  }

  // Engancha el botón "Salir"
  const btnSalir = document.querySelector('.btn_salir');
  if (btnSalir) {
    btnSalir.addEventListener('click', () => cerrarVentana());
  }
});

// =======================================
// Cerrar pestaña/ventana con fallback útil
// =======================================
function cerrarVentana(urlFallback = 'https://google.com') {
  // 1) Si la ventana fue abierta con window.open, se podrá cerrar
  if (window.opener && !window.opener.closed) {
    window.close();
    return;
  }

  // 2) Intento adicional
  window.open('', '_self'); // reasigna el contexto en algunos navegadores
  window.close();

  // 3) Fallback: si no se cerró, redirige
  setTimeout(() => {
    if (!document.hidden) {
      window.location.replace(urlFallback);
    }
  }, 50);
}

// ==========================
// Lógica de Login (opcional)
// ==========================
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  const userInput = document.getElementById('username');
  const passInput = document.getElementById('password');
  const errorMessage = document.getElementById('error-message');

  // Limpia el error al tipear
  [userInput, passInput].forEach(inp => {
    if (inp) {
      inp.addEventListener('input', () => {
        if (errorMessage) errorMessage.textContent = '';
      });
    }
  });

  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = userInput?.value.trim();
    const password = passInput?.value.trim();

    const validUsername = 'admin';
    const validPassword = '1234';

    if (username === validUsername && password === validPassword) {
      window.location.href = 'Inicio.html';
    } else {
      if (errorMessage) errorMessage.textContent = 'Usuario o contraseña incorrectos.';
    }
  });
}
