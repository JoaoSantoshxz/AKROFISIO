const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const navList = document.querySelector('#nav-list');

menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.classList.toggle('open');
    mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', !isExpanded);
});

navList.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
        menuToggle.classList.remove('open');
        mainNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
    }
});

document.addEventListener("scroll", () => {
    document.querySelectorAll(".servico-item").forEach((item) => {
        const posicao = item.getBoundingClientRect().top;
        const alturaTela = window.innerHeight;

        if (posicao < alturaTela - 100) {
            item.classList.add("aparecer");
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const openFormButton = document.getElementById('open-form-button');
    const closeFormButton = document.getElementById('close-form-button');
    const contactFormContent = document.getElementById('contact-form-content');
    const quickContactForm = document.getElementById('quick-contact-form');
    const formFeedback = document.querySelector('.form-feedback');

    // Função para alternar a visibilidade do formulário
    function toggleFormVisibility() {
        contactFormContent.classList.toggle('form-hidden');
        contactFormContent.classList.toggle('form-visible');
        openFormButton.setAttribute('aria-expanded', contactFormContent.classList.contains('form-visible'));
    }

    // Event listeners para abrir e fechar o formulário
    if (openFormButton) {
        openFormButton.addEventListener('click', toggleFormVisibility);
    }

    if (closeFormButton) {
        closeFormButton.addEventListener('click', toggleFormVisibility);
    }

    // Lidar com o envio do formulário (usando Formspree)
    if (quickContactForm) {
        quickContactForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Impede o envio padrão do formulário

            const formData = new FormData(quickContactForm);
            const response = await fetch(quickContactForm.action, {
                method: quickContactForm.method,
                body: formData,
                headers: {
                    'Accept': 'application/json' // Importante para o Formspree retornar JSON
                }
            });

            if (response.ok) {
                formFeedback.textContent = 'Mensagem enviada com sucesso! Em breve entraremos em contato.';
                formFeedback.classList.remove('error');
                formFeedback.classList.add('success');
                formFeedback.style.display = 'block';
                quickContactForm.reset(); // Limpa o formulário
                // Opcional: Esconder o formulário após alguns segundos
                setTimeout(() => {
                    formFeedback.style.display = 'none';
                    toggleFormVisibility(); // Esconde o formulário
                }, 5000);
            } else {
                const data = await response.json();
                if (data.errors) {
                    formFeedback.textContent = data.errors.map(error => error.message).join(', ');
                } else {
                    formFeedback.textContent = 'Ocorreu um erro ao enviar a mensagem. Tente novamente.';
                }
                formFeedback.classList.remove('success');
                formFeedback.classList.add('error');
                formFeedback.style.display = 'block';
                 setTimeout(() => {
                    formFeedback.style.display = 'none';
                }, 5000);
            }
        });
    }

    // --- Lógica para o menu hamburguer (se ainda não tiver no seu script.js) ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.getElementById('nav-list');

    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            const expanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !expanded);
            navList.classList.toggle('active'); // Adiciona/remove uma classe 'active' para mostrar/esconder o menu
        });
    }
});

 document.addEventListener('DOMContentLoaded', function() {
        // ... (seu código JavaScript existente aqui, como feedback de formulário, menu toggle, draggable form) ...

        // --- NOVA LÓGICA: Esconder/Mostrar navegação ao rolar ---
        const mainNav = document.querySelector('.main-nav');
        let lastScrollY = window.scrollY; // Armazena a última posição de rolagem

        // Verifica se o elemento mainNav existe na página
        if (mainNav) {
            window.addEventListener('scroll', function() {
                // Se o menu mobile estiver ativo, não esconda/mostre a navegação
                if (mainNav.classList.contains('active')) {
                    return; 
                }

                // Esconde a navegação se a rolagem for para baixo E a posição for maior que um limiar
                // (ex: 150px para evitar esconder logo no início da página)
                if (window.scrollY > lastScrollY && window.scrollY > 150) {
                    mainNav.classList.add('hidden');
                } 
                // Mostra a navegação se a rolagem for para cima ou se estiver muito no topo da página
                else if (window.scrollY < lastScrollY || window.scrollY <= 50) { 
                    mainNav.classList.remove('hidden');
                }

                lastScrollY = window.scrollY; // Atualiza a última posição de rolagem
            });
        }
    });


    document.addEventListener('DOMContentLoaded', function() {
        // ... (seu código JavaScript existente aqui, como feedback de formulário, menu toggle, draggable form) ...

        // --- NOVA LÓGICA: Esconder/Mostrar HEADER ao rolar ---
        const pageHeader = document.querySelector('header'); // Seleciona o elemento <header>
        const mainNav = document.querySelector('.main-nav'); // Mantém para verificar o estado do menu mobile
        let lastScrollY = window.scrollY; // Armazena a última posição de rolagem

        // Verifica se o elemento header existe na página
        if (pageHeader && mainNav) { // Verifica ambos para o controle do menu mobile
            window.addEventListener('scroll', function() {
                // Se o menu mobile estiver ativo, não esconda/mostre o header
                // (Isso permite que o menu mobile permaneça aberto mesmo se o usuário rolar)
                if (mainNav.classList.contains('active')) {
                    pageHeader.classList.remove('hidden'); // Garante que o header esteja visível quando o menu mobile está aberto
                    return; 
                }

                // Esconde o header se a rolagem for para baixo E a posição for maior que um limiar
                if (window.scrollY > lastScrollY && window.scrollY > 150) { // Ajuste 150px conforme necessário
                    pageHeader.classList.add('hidden');
                } 
                // Mostra o header se a rolagem for para cima OU se estiver muito no topo da página
                else if (window.scrollY < lastScrollY || window.scrollY <= 50) { // Ajuste 50px conforme necessário
                    pageHeader.classList.remove('hidden');
                }

                lastScrollY = window.scrollY; // Atualiza a última posição de rolagem
            });
        }
    });