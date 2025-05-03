const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const navList = document.querySelector('#nav-list');

// Alternar a classe "open" no menu
menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.classList.toggle('open');
    mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', !isExpanded);
});

// Fechar menu ao clicar em um link
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
