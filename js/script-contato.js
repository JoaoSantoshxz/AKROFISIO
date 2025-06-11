document.addEventListener('DOMContentLoaded', function() {
    // --- Variáveis Globais e Seletores de Elementos ---

    // Menu Hambúrguer
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navList = document.querySelector('#nav-list');
    const pageHeader = document.querySelector('header'); // Seleciona o elemento <header>

    // Formulário de Contato Flutuante (Contato Rápido)
    const contactFormWrapper = document.getElementById('contact-form-wrapper'); // O container arrastável do formulário
    const openFormButton = document.getElementById('open-form-button'); // O botão "Contato Rápido"
    const closeFormButton = document.getElementById('close-form-button');
    const contactFormContent = document.getElementById('contact-form-content'); // O conteúdo do formulário em si
    const quickContactForm = document.getElementById('quick-contact-form');
    const formFeedback = document.querySelector('.form-feedback'); // Parágrafo para feedback do formulário rápido

    // Elementos para animação de aparição ao rolar (Scroll Reveal)
    const ambienteItems = document.querySelectorAll('.ambiente-item');
    const servicoItems = document.querySelectorAll('.servico-item'); // Pode não existir em todas as páginas

    // Para o botão de "Voltar ao Topo"
    const scrollToTopButton = document.getElementById('scroll-to-top');

    // Para a lógica de esconder/mostrar header e formulário flutuante ao rolar
    let lastScrollY = window.scrollY;

    // --- Funções Auxiliares ---

    /**
     * Função para fechar o menu hambúrguer, removendo as classes 'open' e 'active'.
     */
    const closeMenu = () => {
        if (menuToggle && mainNav) {
            menuToggle.classList.remove('open');
            mainNav.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    };

    /**
     * Alterna a visibilidade do formulário de contato flutuante.
     * Esconde o botão 'Contato Rápido' quando o formulário está visível e vice-versa.
     */
    function toggleFormVisibility() {
        if (contactFormContent && openFormButton) {
            // Alterna as classes de visibilidade
            const isVisible = contactFormContent.classList.toggle('form-hidden'); // Retorna true se 'form-hidden' foi adicionado, false se removido
            contactFormContent.classList.toggle('form-visible', !isVisible); // 'form-visible' é o oposto de 'form-hidden'

            // Atualiza o atributo aria-expanded para acessibilidade
            openFormButton.setAttribute('aria-expanded', contactFormContent.classList.contains('form-visible'));

            // Controla a exibição do botão "Contato Rápido"
            if (contactFormContent.classList.contains('form-visible')) {
                openFormButton.style.display = 'none'; // Esconde o botão quando o formulário está aberto
            } else {
                openFormButton.style.display = 'flex'; // Mostra o botão quando o formulário está fechado
            }
        }
    }

    /**
     * Valida os campos do formulário principal de contato (geralmente encontrado em 'contato.html').
     * Assume que os elementos de erro (ex: <span id="name-error" class="error-message"></span>)
     * existem no HTML para cada campo.
     * @returns {boolean} True se o formulário for válido, False caso contrário.
     */
    function validateMainContactForm() {
        // Limpa todas as mensagens de erro anteriores
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

        let isValid = true; // Flag de validação

        // Seletores de campos e mensagens de erro para o formulário principal
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        const nameError = document.getElementById('name-error');
        const emailError = document.getElementById('email-error');
        const messageError = document.getElementById('message-error');

        // Validação do campo Nome
        if (nameInput && nameError) { // Verifica se os elementos existem antes de tentar acessá-los
            if (nameInput.value.trim() === '') {
                nameError.textContent = 'O nome é obrigatório.';
                isValid = false;
            }
        }

        // Validação do campo Email
        if (emailInput && emailError) {
            if (emailInput.value.trim() === '') {
                emailError.textContent = 'O e-mail é obrigatório.';
                isValid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
                emailError.textContent = 'Por favor, insira um e-mail válido.';
                isValid = false;
            }
        }

        // Validação do campo Mensagem
        if (messageInput && messageError) {
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

    // Lógica para Abrir/Fechar o Menu Hambúrguer em telas menores
    if (menuToggle && mainNav && navList) {
        menuToggle.addEventListener('click', function() {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.classList.toggle('open'); // Adiciona/remove classe para animação do ícone
            mainNav.classList.toggle('active'); // Adiciona/remove classe para mostrar/esconder o menu
            menuToggle.setAttribute('aria-expanded', !isExpanded); // Atualiza o estado de acessibilidade
        });

        // Fecha o menu mobile se um link de navegação for clicado
        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                if (mainNav.classList.contains('active')) { // Verifica se o menu está aberto
                    closeMenu(); // Chama a função para fechar o menu
                }
            });
        });
    }

    // --- Animação de Aparição ao Rolar (Scroll Reveal) ---
    // Cria um observador para detectar quando elementos específicos entram na viewport.
    const handleIntersect = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Se o elemento está visível, adiciona a classe 'aparecer'
                entry.target.classList.add('aparecer');
                // Para de observar este elemento para que a animação não se repita
                observer.unobserve(entry.target);
            }
        });
    };

    // Define as opções para o Intersection Observer
    const observerOptions = {
        root: null, // Observa a viewport (elemento raiz padrão)
        threshold: 0.2, // Ativa quando 20% do elemento está visível
        rootMargin: '0px' // Sem margem extra para o root
    };

    // Instancia o Intersection Observer com a função de callback e opções
    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    // Observa todos os elementos com a classe 'ambiente-item' (usados na página de estrutura)
    if (ambienteItems.length > 0) {
        ambienteItems.forEach(item => {
            observer.observe(item);
        });
    }
    // Observa os elementos com a classe 'servico-item' (usados na página de serviços), se existirem
    if (servicoItems.length > 0) {
        servicoItems.forEach(item => {
            observer.observe(item);
        });
    }

    // --- Lógica do Formulário de Contato Flutuante (Abrir/Fechar e Arrastar) ---
    // A variável para controle de arrasto
    let isDraggingForm = false;
    let offsetXForm, offsetYForm;
    const dragHandle = openFormButton; // O botão de abertura serve como a "alça" para arrastar o formulário

    if (contactFormWrapper && dragHandle && contactFormContent) {
        dragHandle.addEventListener('mousedown', (e) => {
            // Captura as coordenadas iniciais do mouse
            let initialX = e.clientX;
            let initialY = e.clientY;
            const moveThreshold = 5; // Limiar de movimento em pixels para considerar arrasto

            // Função para verificar se o mouse se moveu o suficiente para iniciar o arrasto
            const onMouseMoveForDrag = (moveEvent) => {
                const deltaX = Math.abs(moveEvent.clientX - initialX);
                const deltaY = Math.abs(moveEvent.clientY - initialY);

                if (deltaX > moveThreshold || deltaY > moveThreshold) {
                    isDraggingForm = true; // Define o estado de arrasto como verdadeiro
                    contactFormWrapper.classList.add('dragging'); // Adiciona classe visual de arrasto
                    contactFormWrapper.style.position = 'fixed'; // Garante posicionamento fixo
                    contactFormWrapper.style.zIndex = '1000'; // Garante que fique acima de outros elementos
                    contactFormWrapper.style.bottom = 'auto'; // Remove ancoragem ao bottom
                    contactFormWrapper.style.right = 'auto'; // Remove ancoragem ao right

                    // Calcula o offset inicial para o arrasto (distância do clique ao canto do elemento)
                    const rect = contactFormWrapper.getBoundingClientRect();
                    offsetXForm = initialX - rect.left;
                    offsetYForm = initialY - rect.top;

                    // Remove este listener temporário de mousemove assim que o arrasto é detectado
                    document.removeEventListener('mousemove', onMouseMoveForDrag);
                }
            };

            // Função para lidar com a liberação do clique (mouseup)
            const onMouseUpForDrag = () => {
                // Remove os listeners temporários de mousemove e mouseup
                document.removeEventListener('mousemove', onMouseMoveForDrag);
                document.removeEventListener('mouseup', onMouseUpForDrag);

                // Se não houve arrasto (apenas um clique), alterna a visibilidade do formulário
                if (!isDraggingForm) {
                    toggleFormVisibility();
                }
                isDraggingForm = false; // Reseta o estado de arrasto
                contactFormWrapper.classList.remove('dragging'); // Remove a classe visual de arrasto
                contactFormWrapper.style.cursor = 'grab'; // Restaura o cursor
            };

            // Adiciona os listeners temporários
            document.addEventListener('mousemove', onMouseMoveForDrag);
            document.addEventListener('mouseup', onMouseUpForDrag);

            e.preventDefault(); // Previne o comportamento padrão do mousedown (ex: seleção de texto)
        });

        // Este listener de mousemove lida com o movimento real do formulário APÓS o arrasto ter sido iniciado
        document.addEventListener('mousemove', (e) => {
            if (!isDraggingForm) return; // Só move se estiver no estado de arrasto
            e.preventDefault(); // Previne seleção de texto durante o arrasto

            let newX = e.clientX - offsetXForm;
            let newY = e.clientY - offsetYForm;

            // Limita o formulário à área visível da tela
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            const draggableWidth = contactFormWrapper.offsetWidth;
            const draggableHeight = contactFormWrapper.offsetHeight;

            // Garante que o formulário não saia dos limites da viewport
            if (newX < 0) newX = 0;
            if (newX + draggableWidth > viewportWidth) newX = viewportWidth - draggableWidth;
            if (newY < 0) newY = 0;
            if (newY + draggableHeight > viewportHeight) newY = viewportHeight - draggableHeight;

            // Aplica as novas posições
            contactFormWrapper.style.left = `${newX}px`;
            contactFormWrapper.style.top = `${newY}px`;
        });

        // Previne o comportamento padrão de arrastar imagens ou links que podem estar no botão
        dragHandle.ondragstart = function() { return false; };
    }

    // Lógica de Envio do Formulário Rápido (Formspree.io)
    if (quickContactForm && formFeedback) {
        quickContactForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Impede o envio padrão do formulário

            formFeedback.textContent = 'Enviando...'; // Mensagem de feedback inicial
            formFeedback.classList.remove('error', 'success'); // Limpa classes de feedback anteriores

            const formData = new FormData(quickContactForm);
            // ATENÇÃO: Substitua 'YOUR_FORMSPREE_ID' pelo seu ID real do Formspree!
            try {
                const response = await fetch("https://formspree.io/f/YOUR_FORMSPREE_ID", {
                    method: 'POST', // Método de envio sempre POST para Formspree
                    body: formData,
                    headers: {
                        'Accept': 'application/json' // Solicita resposta JSON do Formspree
                    }
                });

                if (response.ok) { // Se a resposta for bem-sucedida (status 2xx)
                    formFeedback.textContent = 'Mensagem enviada com sucesso! Em breve entraremos em contato.';
                    formFeedback.classList.add('success'); // Adiciona classe de sucesso
                    formFeedback.style.display = 'block'; // Garante que a mensagem esteja visível
                    quickContactForm.reset(); // Limpa todos os campos do formulário

                    // Esconde o formulário e a mensagem após 5 segundos
                    setTimeout(() => {
                        formFeedback.style.display = 'none';
                        toggleFormVisibility(); // Esconde o formulário
                    }, 5000);
                } else { // Se a resposta não for bem-sucedida
                    const data = await response.json(); // Tenta parsear a resposta JSON para obter erros
                    let errorMessage = 'Ocorreu um erro ao enviar a mensagem. Tente novamente.';
                    if (data.errors) {
                        errorMessage = data.errors.map(error => error.message).join(', ');
                    }
                    formFeedback.textContent = errorMessage;
                    formFeedback.classList.add('error'); // Adiciona classe de erro
                    formFeedback.style.display = 'block'; // Garante que a mensagem esteja visível

                    // Esconde a mensagem de erro após 5 segundos
                    setTimeout(() => {
                        formFeedback.style.display = 'none';
                    }, 5000);
                }
            } catch (error) { // Lida com erros de rede (ex: sem internet)
                formFeedback.textContent = 'Não foi possível conectar ao servidor. Verifique sua conexão.';
                formFeedback.classList.add('error');
                console.error('Erro de rede ao enviar formulário rápido:', error);
            }
        });
    }


    // Lógica para Esconder/Mostrar o HEADER e o Formulário Flutuante ao rolar a página
    if (pageHeader && contactFormWrapper && contactFormContent) {
        window.addEventListener('scroll', function() {
            // Verifica se o menu mobile está aberto ou o formulário flutuante está visível
            const shouldAlwaysShow = (mainNav && mainNav.classList.contains('active')) || contactFormContent.classList.contains('form-visible');

            if (window.scrollY > lastScrollY && window.scrollY > 150 && !shouldAlwaysShow) {
                // Rolando para baixo, e já passou de 150px, e nem o menu nem o formulário estão abertos
                pageHeader.classList.add('hidden'); // Esconde o header
                contactFormWrapper.classList.add('hidden'); // Esconde o formulário flutuante
            } else if (window.scrollY < lastScrollY || window.scrollY <= 50 || shouldAlwaysShow) {
                // Rolando para cima, ou está nos primeiros 50px do topo, ou o menu/formulário está aberto
                pageHeader.classList.remove('hidden'); // Mostra o header
                contactFormWrapper.classList.remove('hidden'); // Mostra o formulário flutuante
            }
            lastScrollY = window.scrollY; // Atualiza a última posição de rolagem
        });
    }

    // Lógica para feedback de formulário principal usando parâmetros de URL (se a página de contato redirecionar)
    // Esta parte é útil se um formulário principal for enviado para um backend que redireciona com um status na URL.
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    const formStatusMessageMain = document.querySelector('.form-status-message-main'); // O elemento para feedback do formulário principal

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
        // Limpa os parâmetros da URL para evitar que a mensagem reapareça no refresh da página
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    // --- Validação e Envio do Formulário Principal de Contato (se presente na página) ---
    // Este bloco de código se aplica a um formulário de contato "fixo" na página (não o flutuante).
    const mainContactForm = document.querySelector('.main-contact-form');
    if (mainContactForm) {
        mainContactForm.addEventListener('submit', async function(event) {
            event.preventDefault(); // Impede o envio padrão do formulário HTML

            const isValid = validateMainContactForm(); // Executa a validação

            if (!isValid) {
                // Se o formulário não for válido, rola até o primeiro campo com erro para o usuário corrigir
                const firstInvalidElement = document.querySelector('.error-message:not(:empty)');
                if (firstInvalidElement) {
                    firstInvalidElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                return; // Impede o envio do formulário
            }

            // Se o formulário for válido, procede com o envio via AJAX (Formspree)
            const formData = new FormData(mainContactForm);
            const formspreeAction = mainContactForm.action; // Pega o atributo 'action' do HTML do formulário

            try {
                const response = await fetch(formspreeAction, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Exibe feedback de sucesso, se o elemento de feedback estiver disponível
                    if (formStatusMessageMain) {
                        formStatusMessageMain.textContent = 'Mensagem enviada com sucesso! Em breve entraremos em contato.';
                        formStatusMessageMain.classList.remove('error');
                        formStatusMessageMain.classList.add('success');
                        formStatusMessageMain.style.display = 'block';
                        mainContactForm.reset(); // Limpa o formulário
                        setTimeout(() => {
                            formStatusMessageMain.style.display = 'none';
                        }, 5000);
                    } else {
                        // Se o elemento de feedback não existe, loga no console
                        console.log('Mensagem enviada com sucesso! (Feedback via console)');
                        mainContactForm.reset();
                    }
                } else {
                    // Exibe feedback de erro
                    const data = await response.json();
                    let errorMessage = 'Ocorreu um erro ao enviar a mensagem. Tente novamente.';
                    if (data.errors) {
                        errorMessage = data.errors.map(error => error.message).join(', ');
                    }
                    if (formStatusMessageMain) {
                        formStatusMessageMain.textContent = errorMessage;
                        formStatusMessageMain.classList.remove('success');
                        formStatusMessageMain.classList.add('error');
                        formStatusMessageMain.style.display = 'block';
                        setTimeout(() => {
                            formStatusMessageMain.style.display = 'none';
                        }, 5000);
                    } else {
                        console.error('Erro ao enviar mensagem:', errorMessage);
                    }
                }
            } catch (error) { // Lida com erros de conexão de rede
                console.error('Erro de conexão ao enviar o formulário principal:', error);
                if (formStatusMessageMain) {
                    formStatusMessageMain.textContent = 'Erro de conexão. Por favor, tente novamente mais tarde.';
                    formStatusMessageMain.classList.remove('success');
                    formStatusMessageMain.classList.add('error');
                    formStatusMessageMain.style.display = 'block';
                    setTimeout(() => {
                        formStatusMessageMain.style.display = 'none';
                    }, 5000);
                }
            }
        });
    }

    // --- Botão Voltar ao Topo ---
    // Verifica se o botão "Voltar ao Topo" existe no HTML
    if (scrollToTopButton) {
        // Mostra/esconde o botão com base na posição de rolagem
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) { // Mostra o botão após rolar 300px
                scrollToTopButton.classList.add('show');
            } else {
                scrollToTopButton.classList.remove('show');
            }
        });

        // Adiciona um evento de clique para rolar suavemente para o topo da página
        scrollToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Rola suavemente
            });
        });
    }
});
