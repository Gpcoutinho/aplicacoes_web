// Funcionalidade do slider de avaliação
document.addEventListener('DOMContentLoaded', function() {
    const sliderAvaliacao = document.getElementById('avaliacao');
    const valorAvaliacao = document.getElementById('valor-avaliacao');

    if (sliderAvaliacao && valorAvaliacao) {
        sliderAvaliacao.addEventListener('input', function() {
            valorAvaliacao.textContent = this.value;
        });
    }

    // Cor de placeholder no input de data
    const dataInput = document.getElementById('data');
    if (dataInput) {
        const syncDateStyle = () => dataInput.classList.toggle('is-empty', !dataInput.value);
        dataInput.addEventListener('change', syncDateStyle);
        syncDateStyle();
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

    // Sistema de Abas com ARIA e navegação por teclado
    const tabBtns = document.querySelectorAll('[role="tab"]');
    const tabPanes = document.querySelectorAll('[role="tabpanel"]');

    function activateTab(btn) {
        const tabId = btn.getAttribute('aria-controls');

        tabBtns.forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
            b.setAttribute('tabindex', '-1');
        });
        tabPanes.forEach(pane => pane.classList.remove('active'));

        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        btn.setAttribute('tabindex', '0');
        document.getElementById(tabId).classList.add('active');
    }

    tabBtns.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            activateTab(this);
        });

        btn.addEventListener('keydown', function(e) {
            const tabs = [...tabBtns];
            let newIndex;
            if      (e.key === 'ArrowRight') newIndex = (index + 1) % tabs.length;
            else if (e.key === 'ArrowLeft')  newIndex = (index - 1 + tabs.length) % tabs.length;
            else if (e.key === 'Home')       newIndex = 0;
            else if (e.key === 'End')        newIndex = tabs.length - 1;
            else return;

            e.preventDefault();
            activateTab(tabs[newIndex]);
            tabs[newIndex].focus();
        });
    });

    // Alternância de tema claro / escuro
    const themeToggleBtn = document.getElementById('theme-toggle');

    function setTheme(theme, persist) {
        document.documentElement.setAttribute('data-theme', theme);
        if (persist) localStorage.setItem('theme', theme);
        if (!themeToggleBtn) return;
        const isDark = theme === 'dark';
        themeToggleBtn.setAttribute('aria-label',   isDark ? 'Ativar modo claro'  : 'Ativar modo escuro');
        themeToggleBtn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
        themeToggleBtn.querySelector('[aria-hidden]').textContent = isDark ? '☀️' : '🌙';
    }

    if (themeToggleBtn) {
        // Sincroniza o botão com o tema já aplicado pelo script inline
        setTheme(document.documentElement.getAttribute('data-theme') || 'light');

        themeToggleBtn.addEventListener('click', function() {
            const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            setTheme(next, true);
        });

        // Acompanha mudanças de preferência do sistema enquanto a página está aberta
        // (só aplica se o usuário não tiver escolhido manualmente)
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
            if (!localStorage.getItem('theme')) {
                setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    // Acessibilidade: atualiza aria-label do hamburguer ao abrir/fechar
    const menuToggle = document.getElementById('menu-toggle');
    const menuLabel  = document.querySelector('label[for="menu-toggle"]');

    if (menuToggle && menuLabel) {
        menuToggle.addEventListener('change', function() {
            menuLabel.setAttribute(
                'aria-label',
                this.checked ? 'Fechar menu de navegação' : 'Abrir menu de navegação'
            );
        });
    }
});

