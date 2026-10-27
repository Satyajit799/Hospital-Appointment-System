const User = require("../models/User");

const Doctor = require("../models/Doctor");

const Appointment = require(
    "../models/Appointment"
);

const getAdminDashboard = async (req, res) => {

    try {

        const totalDoctors =
            await Doctor.countDocuments();

        const totalPatients =
            await User.countDocuments({

                role: "patient"

            });

        const totalAppointments =
            await Appointment.countDocuments();

        const pendingAppointments =
            await Appointment.countDocuments({

                status: "pending"

            });

        const confirmedAppointments =
            await Appointment.countDocuments({

                status: "confirmed"

            });

        const cancelledAppointments =
            await Appointment.countDocuments({

                status: "cancelled"

            });

        res.json({

            totalDoctors,

            totalPatients,

            totalAppointments,

            pendingAppointments,

            confirmedAppointments,

            cancelledAppointments,

        });

    }

    catch (error) {

        res.status(500).json({

            message:
                error.message,

        });

    }

};

module.exports = {

    getAdminDashboard,

};