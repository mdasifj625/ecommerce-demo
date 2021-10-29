import axios from "axios";
const stripe = Stripe('pk_test_51JXhD5SEG4QRFYiaGlQbGpzdea0FyxYjZ9NuzQ7ChI8mWEX6zinurUkHzVyXTgR8817ANEiLpe8GZW9shdqS6xPw000bV8NPf4');

export const buyProduct = async () => {
    try {

        // 1) Get checkout session from API
        const session = await axios(
            `/api/v1/checkout/checkout-session`
        );

        // 2) Create checkout form + Charge credit card

        await stripe.redirectToCheckout({ sessionId: session.data.session.id });

    } catch (error) {
        console.log(error);
    }

}