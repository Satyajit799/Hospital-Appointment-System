const express =
    require("express");

const router =
    express.Router();

const {

    getAdminDashboard,

} = require(

    "../controllers/dashboardController"

);

const protect =
    require(

        "../middleware/authMiddleware"

    );

const adminOnly =
    require(

        "../middleware/adminMiddleware"

    );

router.get(

    "/admin",

    protect,

    adminOnly,

    getAdminDashboard

);

module.exports =
    router;