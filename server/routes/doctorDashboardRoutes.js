const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    getDoctorAppointments,
    updateAppointmentStatus,
} = require(
    "../controllers/doctorDashboardController"
);

router.get(
    "/appointments",
    protect,
    getDoctorAppointments
);

router.put(
    "/appointments/:id",
    protect,
    updateAppointmentStatus
);

module.exports = router;