/* Burger */
function burger_menu() {
    let burger = document.querySelector('.burger');
    let header_nav = document.querySelector('.header__menu-wrap');
    let li_in_nav = header_nav.querySelectorAll('li');
    
    burger.addEventListener('click', function() {
        burger.classList.toggle('burger_active');
        document.body.classList.toggle('_lock');
        header_nav.classList.toggle('header__menu-wrap_active')
    },false);

    for(let i = 0; i < li_in_nav.length; i++) {
        li_in_nav[i].addEventListener('click', function() {
            burger.classList.remove('burger_active');
            document.body.classList.remove('_lock');
            header_nav.classList.remove('header__menu-wrap_active')
        }, false);
    };
};
burger_menu();