const express = require('express');
const router = express.Router();

const catchAsync = require('../utils/catchAsync');
// const ExpressError = require('../utils/ExpressError');
// const { isLoggedIn } = require('../utils/middleware');

const Booking = require('../models/booking');
const bookingSchema = require('../schemas');

const validateBooking = (req, res, next) => {
    const { error } = bookingSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

/* GET new room booking page. CREATE */
router.get('/new-room', (req, res) => {
    res.render('bookings/new-room');
});

/* POST new room booking page. CREATE */
// isLoggedIn
router.post('/', validateBooking, catchAsync(async (req, res, next) => {
    const booking = new Booking(req.body.booking);
    await booking.save();
    req.flash('success', 'Successfully made a new room booking');
    res.redirect('bookings/new-room');
}));

/* GET new meal booking page. CREATE */
router.get('/new-meal', (req, res) => {
    res.render('bookings/new-meal');
});

/* GET view booking page. CREATE */
router.get('/view', (req, res) => {
    res.render('bookings/view');
});

module.exports = router;