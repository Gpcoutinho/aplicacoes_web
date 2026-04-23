// Funcionalidade do slider de avaliação
document.addEventListener('DOMContentLoaded', function() {
    const sliderAvaliacao = document.getElementById('avaliacao');
    const valorAvaliacao = document.getElementById('valor-avaliacao');

    if (sliderAvaliacao && valorAvaliacao) {
        sliderAvaliacao.addEventListener('input', function() {
            valorAvaliacao.textContent = this.value;
        });
    }

    // Validação do formulário
    const formulario = document.querySelector('form');
    if (formulario) {
        formulario.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Obrigado por compartilhar sua experiência! Sua avaliação foi registrada com sucesso.');
            this.reset();
        });
    }

    // Sistema de Abas
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');

            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
});

