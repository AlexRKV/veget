function closeModalBtn(modalSelector) {

    const modal = document.querySelector(modalSelector);

    modal.classList.add('modal__hide');
    modal.classList.remove('modal__show',);
    // modal.classList.toggle('modal__show');
    document.body.style.overflow = ''; // востанавливаем прокрутку модального окна
}
// modalClose.addEventListener('click', closeModalBtn);
function openModalWindow(modalSelector, modalTimerId) {

    const modal = document.querySelector(modalSelector);

    modal.classList.add('modal__show');
    modal.classList.remove('modal__hide');
    // modal.classList.toggle('modal__show');
    document.body.style.overflow = 'hidden'; // убираем прокрутку при открытии модального окна
    // clearInterval(timerModal);
    console.log(modalTimerId);
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}


function modal(triggerSelector, modalSelector, modalTimerId) {
    // MODAL WINDOW============================================================
    const modalTrigger = document.querySelectorAll(triggerSelector),
        // modalClose = document.querySelector('[data-close]'),
        modal = document.querySelector(modalSelector);



    modalTrigger.forEach(item => {
        item.addEventListener('click', () => openModalWindow(modalSelector, modalTimerId)); // убираем повторение кода
    });

    // function cheсkCloseModalBtn() {
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModalBtn(modalSelector)
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('modal__show')) { // или e.which === 27
            closeModalBtn(modalSelector)
        }
    });

    function modalUpscroll() { //появление модальгого  при прокрутке до самого низа!!!
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModalWindow(modalSelector, modalTimerId);
            window.removeEventListener('scroll', modalUpscroll); // убираем повторение всплывание мод. окна
        }
    }
    window.addEventListener('scroll', modalUpscroll);

}

// module.exports = modal;
export default modal;
export {openModalWindow};
export {closeModalBtn};