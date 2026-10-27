const express =
    require("express");

const router =
    express.Router();

const protect = require(
    "../middleware/authMiddleware"
);

const adminOnly = require(
    "../middleware/adminMiddleware"
);


const {

    createDoctor,

    getDoctors,

    getDoctorById,

    deleteDoctor,

    updateDoctor,

    createDoctorWithUser,

} = require(
    "../controllers/doctorController"
);

router.post(
    "/",
    protect,
    adminOnly,
    createDoctor
);

router.get(
    "/",
    getDoctors
);

router.get(
    "/:id",
    getDoctorById
);

router.put(

    "/:id",

    protect,

    adminOnly,

    updateDoctor

);

router.post(

    "/create-with-user",

    protect,

    adminOnly,

    createDoctorWithUser

);

router.delete(

    "/:id",

    protect,

    adminOnly,

    deleteDoctor

);

module.exports = router;