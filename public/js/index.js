import '@babel/polyfill';
import { buyProduct } from './stripe';
import { login, verifyOTP } from './login';

// DOM Element
if (document.querySelector('#user-otp')) document.querySelector('#user-otp').disabled = true;
if (document.querySelector('#submit-otp')) document.querySelector('#submit-otp').disabled = true;

//Delegation

if (document.getElementById('buy-item')) document.getElementById('buy-item').addEventListener('click', event => {
    event.target.textContent = 'Processing...'
    buyProduct();
});

if (document.getElementById('send-otp')) document.getElementById('send-otp').addEventListener('click', e => {
    e.preventDefault();
    e.target.textContent = 'Sending OTP...'
    const email = document.getElementById('user-email');
    const password = document.getElementById('user-password');
    login(email.value, password.value);
});

if (document.getElementById('submit-otp')) document.getElementById('submit-otp').addEventListener('click', e => {
    e.preventDefault();
    e.target.textContent = 'Verifying OTP...'
    const email = document.getElementById('user-email');
    const otp = document.getElementById('user-otp');
    verifyOTP(email.value, otp.value);
});



