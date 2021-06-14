
let isMobile = {
    Android: function() {return navigator.userAgent.match(/Android/i);},
    BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},
    iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},
    Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},
    Windows: function() {return navigator.userAgent.match(/IEMobile/i);},
    any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}
};

let unlock = true;
const paddingLockElems = document.querySelectorAll('.padding-lock');
const lockPaddingValue = window.innerWidth - document.querySelector('.content').offsetWidth;
const timeout = 800;
const body = document.querySelector('body');
const menuList = document.querySelector('ul.menu__list');
if (isMobile.any()) {
    body.classList.add('touch');
    const liWithChildren = menuList.querySelectorAll('li.menu-item-has-children');

    for(let i=0; i<liWithChildren.length; i++) {
        const thisLi = liWithChildren[i];
        const subMenu = thisLi.querySelector('.sub-menu');
        const thisLink = thisLi.querySelector('a');
        thisLink.classList.add('parent');

        thisLi.addEventListener('click', e => {
            if (e.target === thisLi) {
                subMenu.classList.toggle('open');
                thisLi.classList.toggle('active');
            }
            console.log(e.target, e.currentTarget, thisLink);
        });
    }
    const burger = document.querySelector('.header__burger');
    const headerMenu = document.querySelector('.header__menu');

    if (burger) {
        burger.addEventListener('click', e => {
            burger.classList.toggle('active');
            headerMenu.classList.toggle('active');
            const body = document.body;
            body.classList.toggle('lock');
        });
    }

    const showFormIcon = document.querySelector('.show-form');
    if (showFormIcon) {
        showFormIcon.addEventListener('click', e => {
            const form = document.querySelector('.form-wrapper');
            if (form) {
                form.classList.add('show');
                openPopup(form);

                document.addEventListener('keydown', e => {
                    if (e.key === 'Escape') {
                        const activePopup = document.querySelector('.popup.show');
                        closePopup(activePopup);
                    }
                });
            }
        });


    }
} else {
    body.classList.add('mouse');
}

function openPopup(sourse) {
    let popup;
    popup = createPopup(sourse);

    if (unlock) {
        const popupActive = document.querySelector('.popup.open');
        if (popupActive) {
            closePopup(popupActive, false);
        } else {
            bodyLock();
        }
        document.body.insertAdjacentElement('beforeend', popup);
        setTimeout(() => {
            popup.classList.add('show');
        }, 0);
    }
};

function createPopup(sourse) {
    const popup = document.querySelector('.popup');
    const container = popup.querySelector('.popup__container');
    //const template = document.querySelector(`#${templateId}`);
    const template = sourse.innerHTML;

    container.innerHTML = template;

    const btn = container.querySelector('.btn.close');
    btn.classList.add('popup__close');
    const popupClose = document.querySelectorAll('.popup__close');
    popupClose.forEach(btn => {
        btn.addEventListener('click', e => {
            closePopup(popup);
            e.preventDefault();
        });
    });

    container.addEventListener('click', e => {
        if (e.target === container) closePopup(popup);
    });

    /*const links = container.querySelectorAll('.popup-link');
    linksHandler(links);*/
    console.log(popup);
    return popup;
}

const closePopup = (popup, doUnlock = true) => {
    if (unlock) {
        popup.classList.remove('show');
        if (doUnlock) {
            bodyUnlock();
        }
    }
};

function bodyLock() {
    paddingLockElems.forEach( elem => {
        const elemStyle = getComputedStyle(elem);
        elem.style.paddingRight = `${lockPaddingValue + parseInt(elemStyle.paddingRight)}px`;
    });

    //body.style.paddingRight = `${lockPaddingValue}px`;
    body.classList.add('lock');

    unlock = false;

    setTimeout( () => {
        unlock = true;
    }, timeout);
}

function bodyUnlock() {
    setTimeout(() => {
        paddingLockElems.forEach(elem => {
            const elemStyle = getComputedStyle(elem);
            elem.style.paddingRight = `${parseInt(elemStyle.paddingRight) - lockPaddingValue}px`;
        });
        body.style.paddingRight = 0;
        body.classList.remove('lock')
    }, timeout);

    unlock = false;
    setTimeout(() => unlock = true, timeout)
}
