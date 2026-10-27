const Doctor =
    require("../models/Doctor");

const Appointment =
    require("../models/Appointment");

const getDoctorAppointments = async (req, res) => {

    try {

        const doctor =
            await Doctor.findOne({

                user: req.user._id

            });

        if (!doctor) {

            return res
                .status(404)
                .json({

                    message:
                        "Doctor not found"

                });

        }

        const appointments =
            await Appointment.find({

                doctor:
                    doctor._id

            })

                .populate(

                    "patient",

                    "name email"

                );

        res.json(
            appointments
        );

    }

    catch (error) {

        res.status(500)
            .json({

                message:
                    error.message

            });

    }

};

const updateAppointmentStatus = async (req, res) => {

    try {

        const appointment =
            await Appointment.findById(

                req.params.id

            );

        if (!appointment) {

            return res
                .status(404)
                .json({

                    message:
                        "Appointment not found"

                });

        }

        appointment.status =
            req.body.status;

        await appointment.save();

        res.json(
            appointment
        );

    }

    catch (error) {

        res.status(500)
            .json({

                message:
                    error.message

            });

    }

};

module.exports = {

    getDoctorAppointments,

    updateAppointmentStatus,

};