// Funcionalidad para copiar los datos bancarios
document.getElementById('copyBankDetails').addEventListener('click', function() {
    const bankDetails = document.querySelector('.bank-details').textContent.trim();
    navigator.clipboard.writeText(bankDetails).then(() => {
        this.textContent = '¡Copiado!';
        setTimeout(() => {
            this.textContent = 'Copiar datos bancarios';
        }, 2000);
    });
});

// Funcionalidad cuando se confirma la transferencia
document.getElementById('confirmBankTransfer').addEventListener('click', function() {
    localStorage.removeItem('totalCompra'); // Limpiar el total almacenado
    document.getElementById('total-transferir').value = ''; // Limpiar el campo de total
    alert('Gracias por confirmar. Procesaremos tu pedido una vez verifiquemos el pago.');
    redirection.href = 'principal.html';
    window.location.href = 'principal.html';
});