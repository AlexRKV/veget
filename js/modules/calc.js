function calc() {
    // -CALC-

    const result = document.querySelector('.calculating__result span');

    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function initLocalSetings(selector, activeClass) {
        const element = document.querySelectorAll(selector);
        element.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }
    initLocalSetings('#gender div', 'calculating__choose-item_active');
    initLocalSetings('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        }
        if (sex === 'female') {
            result.textContent = Math.round((447, 6 + (9.2 * weight) + (3.1 * height) - (4.3 * age) * ratio));
        } else {
            result.textContent = Math.round((88, 36 + (13.4 * weight) + (4.8 * height) - (5.7 * age) * ratio));
        }
    }
    calcTotal();

    function getStaticInformation(selector, activeClass) {
        const element = document.querySelectorAll(selector);
        element.forEach(elem => {
            elem.addEventListener('click', (e) => {
                const target = e.target.getAttribute('data-ratio');
                if (target) {
                    ratio = +target;
                    localStorage.setItem('ratio', +target);
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('ratio', e.target.getAttribute('id'));
                }
                element.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
                e.target.classList.add(activeClass);
                calcTotal();
            });
        });
    }
    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformation(inputSelector) {
        const input = document.querySelector(inputSelector);

        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) {
                input.style.border = '1.5px solid red';
            } else {
                input.style.border = 'none';
            }


            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal();
        });
    }
    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');

}

// module.exports = calc;
export default calc; // Это эксорт ES6