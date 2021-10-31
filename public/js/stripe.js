import axios from "axios";
const stripe = Stripe('pk_test_51JqgLpSJMQNgGeqc3pzIfefFVdmxqCRQ6GX8ZD8v6Rl6eh68rgzI7TjgIE08CSRtUbagGDxf2N4Xdn16i9U8QPwL00dhNdaQEa');

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