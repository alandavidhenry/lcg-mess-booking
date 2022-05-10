const express = require('express');
const router = express.Router();

const catchAsync = require('../utils/catchAsync');
// const ExpressError = require('../utils/ExpressError');
// const { isLoggedIn } = require('../utils/middleware');

const Booking = require('../models/booking');
const bookingSchema = require('../schemas');

// const validateBooking = (req, res, next) => {
//     const { error } = bookingSchema.validate(req.body);
//     if (error) {
//         const msg = error.details.map(el => el.message).join(',')
//         throw new ExpressError(msg, 400)
//     } else {
//         next();
//     }
// }

/* GET new booking page. CREATE */
router.get('/new', (req, res) => {
    res.render('bookings/new');
});

/* POST new booking page. CREATE */
// router.post('/', isLoggedIn, validateBooking, catchAsync(async (req, res, next) => {
router.post('/', catchAsync(async (req, res, next) => {
    const booking = new Booking(req.body.booking);
    await booking.save();
    req.flash('success', 'Successfully made a new booking');
    res.redirect('bookings/new');
    // res.send(req.body);
}));

module.exports = router;