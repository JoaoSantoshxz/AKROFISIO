
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');  
const navList = document.querySelector('#nav-list');


menuToggle.addEventListener('click', () => {
    
    
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;

    menuToggle.classList.toggle('open');

    mainNav.classList.toggle('open');

    menuToggle.setAttribute('aria-expanded', !isExpanded);
});

navList.addEventListener('click', (event) => {
    if (event.target.tagName === 'A' && mainNav.classList.contains('open')) {

        menuToggle.classList.remove('open');
        mainNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', false);
    }
});