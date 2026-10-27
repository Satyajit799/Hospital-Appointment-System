const express =
    require("express");

const router =
    express.Router();

const {

    bookAppointment,

    getMyAppointments,

    cancelAppointment,

} = require(

    "../controllers/appointmentController"

);

const protect =
    require(

        "../middleware/authMiddleware"

    );

router.post(

    "/",

    protect,

    bookAppointment

);

router.get(

    "/my-appointments",

    protect,

    getMyAppointments

);

router.put(

    "/:id/cancel",

    protect,

    cancelAppointment

);

module.exports =
    router;