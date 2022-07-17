import {closeModalBtn, openModalWindow} from './modal';
import {postData} from '../services/services';


function forms(formSelector, modalTimerId) {
    const forms = document.querySelectorAll(formSelector);
    // formCheckName = document.querySelector('[data-checkName]'),
    // formCheckDigit = document.querySelector('[data-checkDigit]'),
    // callBtn = document.querySelectorAll('[data-call]');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро свяжемся',
        failure: 'Что-то не так!'
    };

    forms.forEach(item => {
        bindDataPost(item);
    });



    function bindDataPost(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            // form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage); // этот метод позволяет момещать элементы верстки в разные места (например наш спиннер)!!!

            // СТАРЫЙ ВАРИАНТ==============================================================
            //===========================================================================
            // const request = new XMLHttpRequest();
            // request.open('POST', 'server.php');



            // когда используем связку  XMLHttpRequest() + form-data заголовок не устанавливаем
            // ===============================================================
            // request.setRequestHeader('Content-type', 'application/json');
            // Оню устанавливается автоматически
            // ===============================================================
            // const formData = new FormData(form);
            // const object = {};
            // formData.forEach(function (value, key) {
            //     object[key] = value;
            // });
            // const json = JSON.stringify(object);
            // request.send(json);
            // request.addEventListener('load', () => {
            //     if (request.status === 200) {
            //         console.log(request.response);
            //         showThanksModal(message.success);
            //         form.reset();
            //         statusMessage.remove();
            //     } else {
            //         showThanksModal(message.failure);
            //     }
            // });

            // НОВЫЙ ВАРИАНТ С ПОМОЩЬЮ FETCH===================================================
            //==============================================================================

            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));


            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                });
        });
    }

    function showThanksModal(message) {
        const previousModalDialog = document.querySelector('.modal__dialog');

        previousModalDialog.classList.add('modal__dialog_hide');
        openModalWindow('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">×</div> 
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            previousModalDialog.classList.add('modal__dialog_show');
            previousModalDialog.classList.remove('modal__dialog_hide');
            closeModalBtn('.modal');
        }, 4000);
    }

    fetch('http://localhost:3000/menu')
        .then(data => data.json())
    // .then(res => console.log(res));

}

// module.exports = forms;
export default forms;