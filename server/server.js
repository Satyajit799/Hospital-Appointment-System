const express = require("express");

const dotenv = require("dotenv");

const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");

const doctorRoutes = require("./routes/doctorRoutes");

const appointmentRoutes = require("./routes/appointmentRoutes");

const dashboardRoutes = require("./routes/dashboardRoutes");

const doctorDashboardRoutes = require("./routes/doctorDashboardRoutes");

const userRoutes = require("./routes/userRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/doctors", doctorRoutes);

app.use("/api/appointments", appointmentRoutes);

app.use("/api/doctor-dashboard", doctorDashboardRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/users", userRoutes);


app.get("/", (req, res) => {

    res.send(
        "Hospital API Running"
    );

});


const PORT =
    process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );

});