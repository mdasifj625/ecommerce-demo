const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const catchAsync = require('../utils/catchAsync');

exports.getCheckoutSession = catchAsync(
    async (req, res, next) => {

        // ) Create the checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: `${req.protocol}://${req.get('host')}/`,
            cancel_url: `${req.protocol}://${req.get('host')}/`,
            line_items: [
                {
                    name: `Apple iPhone 11 (64GB) - Black`,
                    description: `The iPhone is a smartphone made by Apple that combines a computer, iPod, digital camera and cellular phone into one device with a touchscreen interface. ... The first-generation iPhone came preloaded with a suite of Apple software, including iTunes, the Safari web browser and iPhoto.`,
                    images: [
                        `https://ecommerce-demo-asif.herokuapp.com/img/iphone11.png`
                    ],
                    amount: 499 * 100,
                    currency: 'usd',
                    quantity: 1

                },
            ]
        });

        // 3) Create session as response
        // res.redirect(303, session.url);

        res
            .status(200)
            .json({
                status: 'success',
                session
            });
    }
);