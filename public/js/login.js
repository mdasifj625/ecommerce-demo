import axios from "axios";

export const login = async (email, password) => {
    try {
        // Send a POST request
        const res = await axios({
            method: 'post',
            url: '/api/v1/users/login',
            data: {
                email,
                password
            }
        });

        if (res.data.status === 'success') {
            window.alert('OTP Sent');
            document.getElementById('user-email').disabled = true;;
            document.getElementById('user-password').disabled = true;
            document.getElementById('send-otp').textContent = 'Send OTP';
            document.getElementById('send-otp').disabled = true;
            document.querySelector('#user-otp').disabled = false;
            document.querySelector('#submit-otp').disabled = false;
        }

    } catch (error) {
        window.alert(error.response.data.message);
    }
};
export const verifyOTP = async (email, otp) => {
    try {
        // Send a POST request
        const res = await axios({
            method: 'post',
            url: '/api/v1/users/verifyOTP',
            data: {
                email,
                otp
            }
        });

        if (res.data.status === 'success') {
            window.alert('Loged in Successfully');

            document.getElementById('user-email').value = '';
            document.getElementById('user-password').value = '';
            document.querySelector('#user-otp').value = '';
            document.querySelector('#submit-otp').textContent = 'Submit OTP';

            window.setTimeout(() => {
                location.assign('/');
            }, 1000);
        }

    } catch (error) {
        window.alert(error.response.data.message);
    }
};

