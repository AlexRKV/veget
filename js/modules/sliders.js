function sliders({container,sliders, prevArr, nextArr, currentCounter, totalCounter, wrapper, field} ) {
    // СОЗДАЕМ СЛАЙДЕРЫ SLAIDERS


    // const slidersItem = document.querySelectorAll('.offer__slide'),
    //     sliderPrev = document.querySelector('.offer__slider-prev'),
    //     sliderNext = document.querySelector('.offer__slider-next'),
    //     current = document.querySelector('#current'),
    //     total = document.querySelector('#total'),

    // let slideIndex = 1;
    // showSliders(slideIndex);
    // if (slidersItem.length < 10) {
    //     total.textContent = `0${slidersItem.length}`;
    // } else {
    //     total.textContent = slidersItem.length;
    // }

    // function showSliders(n) {
    //     if (n > slidersItem.length) {
    //         slideIndex = 1;
    //     }
    //     if (n < 1) {
    //         slideIndex = slidersItem.length;
    //     }
    //     slidersItem.forEach(item => item.style.display = 'none');
    //     slidersItem[slideIndex - 1].style.display = 'block';

    //     if (slidersItem.length < 10) {
    //         current.textContent = `0${slideIndex}`;
    //     } else {
    //         current.textContent = slideIndex;
    //     }
    // }

    // function plusSlides(n) {
    //     showSliders(slideIndex += n);
    // }
    // sliderPrev.addEventListener('click', () => {
    //     plusSlides(-1);
    // });
    // sliderNext.addEventListener('click', () => {
    //     plusSlides(1)
    // });


    // СОЗДАЕМ СЛАЙДЕРЫ SLAIDERS (ВАРИАНТ № 2)

    const slidersItem = document.querySelectorAll(sliders),
        sliderDot = document.querySelector(container),
        sliderPrev = document.querySelector(prevArr),
        sliderNext = document.querySelector(nextArr),
        current = document.querySelector(currentCounter),
        total = document.querySelector(totalCounter),
        sliderWrapper = document.querySelector(wrapper),
        sliderField = document.querySelector(field),
        width = window.getComputedStyle(sliderWrapper).width;

    let slideIndex = 1; // индекс подсчета
    let offset = 0;

    const noLetter = +width.replace(/\D/g, '');

    if (slidersItem.length < 10) {
        total.textContent = `0${slidersItem.length}`
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slidersItem.length;
        current.textContent = slideIndex;
    }
    sliderField.style.width = 100 * slidersItem.length + '%';


    slidersItem.forEach(slides => {
        slides.style.width = width;
    });
    function currentId() {
        if (slidersItem.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }
    function dotCheck() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = '1';
    }

    const indicators = document.createElement('ol'),
        dots = [];
    indicators.classList.add('carousel-indicators');

    sliderDot.append(indicators);

    for (let i = 0; i < slidersItem.length; i++) {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        dot.setAttribute('data-slide-to', i + 1);

        indicators.append(dot);
        dots.push(dot);

        if (i == 0) {
            dot.style.opacity = 1;
        }
    }

    sliderNext.addEventListener('click', () => {
        if (offset == noLetter * (slidersItem.length - 1)) {
            offset = 0;
        } else {
            offset += noLetter;
        }
        sliderField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slidersItem.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slidersItem.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
        dotCheck(); // вынесено в функцию
    });

    sliderPrev.addEventListener('click', () => {
        if (offset == 0) {
            offset = noLetter * (slidersItem.length - 1);
        } else {
            offset -= noLetter;
        }
        sliderField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slidersItem.length;
        } else {
            slideIndex--;
        }

        currentId(); //вынесено в функцию
        dotCheck(); // вынесено в функцию
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            slideIndex = slideTo;

            offset = noLetter * (slideTo - 1);

            sliderField.style.transform = `translateX(-${offset}px)`;
            currentId(); // вынесено в функцию
            dotCheck(); // вынесено в функцию
        });
    });

}

// module.exports = sliders;
export default sliders;