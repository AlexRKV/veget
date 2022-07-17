"use strict"

// const { entries } = require("lodash");

// window.addEventListener('DOMContentLoaded', () => {

//     const cards = require('./modules/cards'),
//         forms = require('./modules/forms'),
//         modal = require('./modules/modal'),
//         sliders = require('./modules/sliders'),
//         tabs = require('./modules/tabs'),
//         timer = require('./modules/timer'),
//         calc = require('./modules/calc');

//     cards();
//     forms();
//     modal();
//     sliders();
//     tabs();
//     timer();
//     calc();
// });


// СИСТЕМА ИМПОРТА ES 6
require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';
import cards from './modules/cards';
import forms from './modules/forms';
import modal from './modules/modal';
import sliders from './modules/sliders';
import tabs from './modules/tabs';
import timer from './modules/timer';
import calc from './modules/calc';
import {openModalWindow} from './modules/modal'; 

window.addEventListener('DOMContentLoaded', () => {


    const modalTimerId = setTimeout(() => openModalWindow('.modal', modalTimerId ), 60000);
    cards();
    forms('form', modalTimerId);
    modal('[data-modal]', '.modal', modalTimerId );
    tabs('.tabheader__items', '.tabcontent', '.tabheader__item', 'tabheader__item_active');
    timer('.timer', '2022-02-14');
    calc();
    sliders({
        container: '.offer__slider',
        sliders: '.offer__slide',
        prevArr: '.offer__slider-prev',
        nextArr: '.offer__slider-next',
        currentCounter: '#current',
        totalCounter: '#total',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
});

