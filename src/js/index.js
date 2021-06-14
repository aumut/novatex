
(function (){
    let form, scrollHeight, clientHeight, scrollVal;

    setTimeout(() => {
        form = document.querySelector('.form-wrapper');
        scrollHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        );
        if (form) {
            clientHeight = document.documentElement.clientHeight;
            scrollVal = scrollHeight - clientHeight - form.getBoundingClientRect().height;
        }

    }, 100);


    window.addEventListener('scroll', e => {
        if (form) {
            if (window.pageYOffset >= scrollVal) {
                form.style.display = 'none';
            } else {
                form.style.display = 'block';
            }
        }

    });


    function trackScroll() {
        var scrolled = window.pageYOffset;
        var coords = document.documentElement.clientHeight;

        if (scrolled > coords) {
            goTopBtn.classList.add('back_to_top-show');
        }
        if (scrolled < coords) {
            goTopBtn.classList.remove('back_to_top-show');
        }
    }

    function backToTop() {
        if (window.pageYOffset > 0) {
            window.scrollBy(0, -80);
            setTimeout(backToTop, 0);
        }
    }

    var goTopBtn = document.querySelector('.back_to_top');

    window.addEventListener('scroll', trackScroll);
    if (goTopBtn) goTopBtn.addEventListener('click', backToTop);
})();