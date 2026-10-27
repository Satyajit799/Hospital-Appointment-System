const User = require("../models/User");

const getProfile = async (req, res) => {
    try {

        const user = await User.findById(
            req.user._id
        ).select("-password");

        if (!user) {

            return res.status(404).json({

                message: "User not found",

            });

        }

        res.json(user);

    } catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }
};

module.exports = {
    getProfile,
};