exports.getOverview = (req, res, next) => {

    // Render the data

    res
        .status(200)
        .render('overview', {
            title: 'Ecomerce'
        });
}
// exports.getSuccess = (req, res, next) => {

//     // Render the data

//     res
//         .status(200)
//         .render('success', {
//             title: 'Payment Success'
//         });
// }
// exports.getFail = (req, res, next) => {

//     // Render the data

//     res
//         .status(200)
//         .render('fail', {
//             title: 'Payment Failed'
//         });
// }

