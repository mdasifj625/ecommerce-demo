exports.getOverview = (req, res, next) => {

    // Render the data

    res
        .status(200)
        .render('overview', {
            title: 'Ecomerce'
        });
}

exports.getLogin = (req, res, next) => {

    // Render the data

    res
        .status(200)
        .render('login', {
            title: 'Login'
        });
}



