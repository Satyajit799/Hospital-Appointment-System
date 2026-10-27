const Appointment =
    require(
        "../models/Appointment"
    );

const Doctor =
    require(
        "../models/Doctor"
    );

const bookAppointment = async (req, res) => {
    try {

        const {
            doctorId,
            appointmentDate,
            appointmentTime,
        } = req.body;

        const doctor =
            await Doctor.findById(
                doctorId
            );

        if (!doctor) {

            return res.status(404).json({
                message:
                    "Doctor not found",
            });

        }

        const selectedDate =
            new Date(
                appointmentDate
            );

        const today =
            new Date();

        today.setHours(
            0,
            0,
            0,
            0
        );

        if (
            selectedDate < today
        ) {

            return res.status(400).json({

                message:

                    "You cannot book an appointment for a past date",

            });

        }

        const existingAppointment =
            await Appointment.findOne({

                doctor:
                    doctorId,

                appointmentDate,

                appointmentTime,

                status: {

                    $ne:
                        "cancelled",

                },

            });

        if (
            existingAppointment
        ) {

            return res.status(400).json({

                message:

                    "Slot already booked",

            });

        }

        const appointment =
            await Appointment.create({

                patient:
                    req.user._id,

                doctor:
                    doctorId,

                appointmentDate,

                appointmentTime,

            });

        res.status(201).json(
            appointment
        );

    }

    catch (error) {

        res.status(500).json({

            message:
                error.message,

        });

    }

};

const getMyAppointments =
    async (req, res) => {

        try {

            const appointments =
                await Appointment.find({

                    patient:
                        req.user._id,

                })

                    .populate("doctor");

            res.json(
                appointments
            );

        }

        catch (error) {

            res.status(500)
                .json({

                    message:
                        error.message,

                });

        }

    };

const cancelAppointment =
    async (req, res) => {

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
                "cancelled";

            await appointment.save();

            res.json({

                message:

                    "Appointment Cancelled"

            });

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

    bookAppointment,

    getMyAppointments,

    cancelAppointment,

};