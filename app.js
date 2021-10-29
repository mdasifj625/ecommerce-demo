const path = require('path');
const express = require('express');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cors = require('cors');

const userRouter = require('./router/userRouters');
const checkoutRouter = require('./router/checkoutRouters');
const viewsRouter = require('./router/viewsRouter');

// Start express app
const app = express();
// Enabling trust proxy for X-Forwarded - Header
app.enable('trust proxy');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


// Implement CORS  to access the API from cross origin
app.use(cors());
app.options('*', cors());

// Serving static files
app.use(
    express.static(
        path.join(__dirname, 'public')
    )
);

// Setup helmet,  It helps securing express app setting up various HTTP headers
app.use(helmet());


// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({
    extended: true,
    limit: '10kb'
}));


// Data Senitization against NoSQL Query injection
app.use(mongoSanitize());

// Data Senitization against XSS
app.use(xss());


// MIddleware to set Content Security Policy header
app.use((req, res, next) => {
    res
        .set("Content-Security-Policy",
            "default-src * self blob: data: gap:; style-src * self 'unsafe-inline' blob: data: gap:; script-src * 'self' 'unsafe-eval' 'unsafe-inline' blob: data: gap:; object-src * 'self' blob: data: gap:; img-src * self 'unsafe-inline' blob: data: gap:; connect-src self * 'unsafe-inline' blob: data: gap:; frame-src * self blob: data: gap:;");
    next();
});


// routs
app.use('/api/v1/users', userRouter);
app.use('/api/v1/checkout', checkoutRouter);
app.use('/', viewsRouter);
// app.use('/', viewsRouter);

module.exports = app;