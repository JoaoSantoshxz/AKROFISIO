document.addEventListener('DOMContentLoaded', function() {
    // --- Variáveis Globais e Seletores de Elementos ---

    // Menu Hambúrguer (presente em todas as páginas)
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navList = document.querySelector('#nav-list'); // A lista de links dentro de mainNav

    // Formulário de Contato Principal (na página de Contato)
    const mainContactForm = document.querySelector('.main-contact-form');
    const formStatusMessageMain = document.querySelector('.form-status-message-main'); // Para feedback do formulário principal

    // Elementos da Página e Rolagem
    const pageHeader = document.querySelector('header');
    let lastScrollY = window.scrollY; // Armazena a última posição de rolagem para o efeito de esconder/mostrar

    // --- Funções Auxiliares ---

    /**
     * Valida os campos do formulário principal de contato.
     * @returns {boolean} True se o formulário for válido, False caso contrário.
     */
    function validateMainContactForm() {
        // Limpa mensagens de erro anteriores
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

        let isValid = true;

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        const nameError = document.getElementById('name-error');
        const emailError = document.getElementById('email-error');
        const messageError = document.getElementById('message-error');

        // Validação do campo Nome
        if (nameInput && nameError) { // Verifica se os elementos existem
            if (nameInput.value.trim() === '') {
                nameError.textContent = 'O nome é obrigatório.';
                isValid = false;
            }
        }

        // Validação do campo Email
        if (emailInput && emailError) { // Verifica se os elementos existem
            if (emailInput.value.trim() === '') {
                emailError.textContent = 'O e-mail é obrigatório.';
                isValid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
                emailError.textContent = 'Por favor, insira um e-mail válido.';
                isValid = false;
            }
        }

        // Validação do campo Mensagem
        if (messageInput && messageError) { // Verifica se os elementos existem
            if (messageInput.value.trim() === '') {
                messageError.textContent = 'A mensagem é obrigatória.';
                isValid = false;
            } else if (messageInput.value.trim().length < 10) {
                messageError.textContent = 'A mensagem deve ter pelo menos 10 caracteres.';
                isValid = false;
            }
        }

        return isValid;
    }

    // --- Event Listeners e Lógica Principal ---

    // Lógica do Menu Hambúrguer
    if (menuToggle && mainNav && navList) {
        menuToggle.addEventListener('click', function() {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.classList.toggle('open'); // Altera a classe do ícone do hambúrguer
            mainNav.classList.toggle('active'); // Altera a classe da navegação principal (mostra/esconde)
            menuToggle.setAttribute('aria-expanded', !isExpanded);
        });

        // Opcional: Fechar menu mobile ao clicar em um item de link
        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                if (mainNav.classList.contains('active')) {
                    menuToggle.classList.remove('open');
                    mainNav.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // Lógica para Esconder/Mostrar HEADER ao rolar
    if (pageHeader && mainNav) { // Apenas header e mainNav, pois o formulário flutuante não está nesta página
        window.addEventListener('scroll', function() {
            // Se o menu mobile estiver aberto (com a classe 'active' em mainNav), o header não deve ser escondido.
            let shouldKeepHeaderVisible = mainNav.classList.contains('active');

            if (window.scrollY > lastScrollY && window.scrollY > 150 && !shouldKeepHeaderVisible) {
                // Rolando para baixo e já passou do início (150px), e o menu mobile não está aberto
                pageHeader.classList.add('hidden');
            } else if (window.scrollY < lastScrollY || window.scrollY <= 50 || shouldKeepHeaderVisible) {
                // Rolando para cima, ou no topo da página (<= 50px), ou menu mobile está aberto
                pageHeader.classList.remove('hidden');
            }
            lastScrollY = window.scrollY; // Atualiza a última posição de rolagem
        });
    }

    // Lógica para feedback de formulário principal (baseado em parâmetros URL)
    // Se o formulário principal enviar para uma página PHP que redireciona com status na URL
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');

    if (status && formStatusMessageMain) {
        let messageDiv = document.createElement('div');
        messageDiv.classList.add('form-status-message');
        messageDiv.textContent = '';

        if (status === 'success') {
            messageDiv.textContent = 'Mensagem enviada com sucesso! Em breve entraremos em contato.';
            messageDiv.classList.add('success');
        } else if (status === 'error') {
            messageDiv.textContent = 'Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente mais tarde.';
            messageDiv.classList.add('error');
        }

        formStatusMessageMain.appendChild(messageDiv);
        // Limpa os parâmetros da URL para evitar que a mensagem reapareça no refresh
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    // --- Validação do Formulário Principal de Contato ---
    if (mainContactForm) {
        mainContactForm.addEventListener('submit', function(event) {
            // Chama a função de validação
            const isValid = validateMainContactForm();

            if (!isValid) {
                event.preventDefault(); // Impede o envio do formulário se a validação falhar
                // Opcional: Rolagem para o primeiro erro para melhor experiência do usuário (UX)
                const firstInvalidElement = document.querySelector('.error-message:not(:empty)');
                if (firstInvalidElement) {
                    firstInvalidElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            } else {
                // Se o formulário é válido no cliente, ele será enviado normalmente
                // para a URL definida no atributo 'action' do formulário (send_email.php).
                // Certifique-se de que o seu script 'send_email.php' está configurado para lidar
                // com os dados do formulário e retornar a resposta adequada.
            }
        });
    }
});
