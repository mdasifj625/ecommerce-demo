import '@babel/polyfill';
import { buyProduct } from './stripe';

// DOM Element
const buyBtn = document.querySelector('#buy-item');


//Delegation

if (buyBtn) buyBtn.addEventListener('click', event => {
    event.target.textContent = 'Processing...'
    buyProduct();
});