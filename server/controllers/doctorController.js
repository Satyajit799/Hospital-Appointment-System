const User = require("../models/User");
const Doctor = require("../models/Doctor");
const bcrypt = require("bcryptjs");

const createDoctor = async (
    req,
    res
) => {
    try {

        const doctor =
            await Doctor.create(
                req.body
            );

        res.status(201).json(
            doctor
        );

    } catch (error) {

        res.status(500).json({
            message:
                error.message,
        });

    }
};

const getDoctors = async (
    req,
    res
) => {

    try {

        const doctors =
            await Doctor.find();

        res.json(doctors);

    } catch (error) {

        res.status(500).json({
            message:
                error.message,
        });

    }

};

const getDoctorById = async (req, res) => {

    try {

        const doctor =
            await Doctor.findById(
                req.params.id
            );

        if (!doctor) {

            return res
                .status(404)
                .json({
                    message:
                        "Doctor not found",
                });

        }

        res.json(doctor);

    } catch (error) {

        res.status(500).json({
            message:
                error.message,
        });

    }

};

const updateDoctor = async (req, res) => {
    try {

        const doctor = await Doctor.findById(
            req.params.id
        );

        if (!doctor) {

            return res.status(404).json({
                message: "Doctor not found",
            });

        }

        doctor.name =
            req.body.name || doctor.name;

        doctor.specialization =
            req.body.specialization ||
            doctor.specialization;

        doctor.experience =
            req.body.experience ||
            doctor.experience;

        doctor.fees =
            req.body.fees ||
            doctor.fees;

        doctor.availableDays =
            req.body.availableDays ||
            doctor.availableDays;

        doctor.availableTime =
            req.body.availableTime ||
            doctor.availableTime;

        doctor.image =
            req.body.image ||
            doctor.image;

        const updatedDoctor =
            await doctor.save();

        res.json(updatedDoctor);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};

const deleteDoctor = async (req, res) => {

    try {

        const doctor =
            await Doctor.findById(
                req.params.id
            );

        if (!doctor) {

            return res.status(404).json({

                message:
                    "Doctor not found",

            });

        }

        await doctor.deleteOne();

        res.json({

            message:
                "Doctor deleted successfully",

        });

    } catch (error) {

        res.status(500).json({

            message:
                error.message,

        });

    }

};

const createDoctorWithUser = async (req, res) => {

    try {

        const {

            name,

            email,

            password,

            specialization,

            experience,

            fees,

            availableDays,

            availableTime,

            image,

        } = req.body;


        const existingUser =
            await User.findOne({

                email,

            });

        if (existingUser) {

            return res.status(400).json({

                message:

                    "Doctor already exists"

            });

        }


        const hashedPassword =
            await bcrypt.hash(

                password,

                10

            );


        const user =
            await User.create({

                name,

                email,

                password:

                    hashedPassword,

                role:

                    "doctor",

            });


        const doctor =
            await Doctor.create({

                user:

                    user._id,

                name,

                specialization,

                experience,

                fees,

                availableDays,

                availableTime,

                image,

            });


        res.status(201).json({

            message:

                "Doctor Created Successfully",

            doctor,

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

    createDoctor,

    getDoctors,

    getDoctorById,

    updateDoctor,

    deleteDoctor,

    createDoctorWithUser,

};