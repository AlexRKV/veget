function tabs(tabsSelector, tabsContenetSelector, tabItemsSelector, activeClass) {
    let tabs = document.querySelector(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContenetSelector),
        tabItems = document.querySelectorAll(tabItemsSelector);


    function hideTabContent() {
        tabsContent.forEach(item => { // перебираем картинки
            // item.style.display = 'none' // скрываем картинки
            item.classList.add('tabcontent__hide');
            item.classList.remove('tabcontent__show', 'tabcontent__fade')
        });

        tabItems.forEach(item => { // перебираем кноки для скрытия класса активности
            item.classList.remove(activeClass); // скрываем класс активности
        });
    }

    function showTabContent(i = 0) {
        // tabsContent[i].style.display = 'block'; // показываем картинку
        tabsContent[i].classList.add('tabcontent__show', 'tabcontent__fade');
        tabsContent[i].classList.remove('tabcontent__hide');
        tabItems[i].classList.add(activeClass); // показываем класс активности
    }

    function changesTab() {
        tabs.addEventListener('click', (e) => {
            const target = e.target;
            if (target && target.classList.contains(tabItemsSelector.slice(1))) {
                tabItems.forEach((item, i) => {
                    if (target == item) {
                        hideTabContent();
                        showTabContent(i);
                    }
                })
            }
        });
    }
    hideTabContent();
    showTabContent();
    changesTab();
}

// module.exports = tabs;
export default tabs;

