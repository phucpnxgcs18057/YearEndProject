const User = require('../models/user');
const { encrypt, compare } = require('../other/bcrypt');
const routeName = `user`;

const getAllUsers = async (req, res) => {
    try {
        const user = await User.find()
            .populate('type')
            .populate('school');

        return res.json({
            status: 200,
            success: true,
            data: user,
            count: user.length
        })
    } catch (err) {
        console.log(err);
        return res.json({
            status: 500,
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
};

const getUserById = async (req, res) => {
    try {
        const id = req.params.userId;
        await User.findById(id)
            .populate('type')
            .populate('school')
            .then(doc => {
                console.log("From database", doc);
                if (doc) {
                    res.status(200).json(doc);
                } else {
                    res.status(404).json({ message: "Unavailable / Non-exist ID" });
                }
            });
    } catch (err) {
        console.log(err);
        return res.json({
            status: 500,
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
};

const getUserByIdClient = async (req, res) => {
    try {
        const id = req.params.userId;
        await User.findById(id)
            .populate('type')
            .populate('school')
            .then(doc => {
                console.log("From database", doc);
                if (doc) {
                    res.status(200).json(doc);
                } else {
                    res.status(404).json({ message: "Unavailable / Non-exist ID" });
                }
            });
    } catch (err) {
        console.log(err);
        return res.json({
            status: 500,
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
};

const addNewUser = async (req, res) => {
    try {

        const { user_name, user_password, user_full_name, user_email, school, type } = req.body;

        const checkUser = await User.findOne({ user_email });
        if (checkUser) {
            return res.json({
                status: 200,
                success: false,
                data: null,
                message: `${routeName} already exist`
            })
        }

        const encryptPassword = encrypt(user_password);
        const user = await new User({
            user_name,
            user_password: encryptPassword,
            user_full_name, user_email, school, type,
            create_date: Date.now(),
            last_update: Date.now()
        });
        await user.save()

        return res.json({
            status: 200,
            success: true,
            data: user,
            message: `Successfully created the ${routeName}`
        })
    } catch (err) {
        console.log(err);
        return res.json({
            status: 500,
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
};

const signUp = async (req, res) => {
    try {

        const { user_name, user_password, user_full_name, user_email, school, type } = req.body;

        const checkUser = await User.findOne({ user_email });
        if (checkUser) {
            return res.json({
                status: 200,
                success: false,
                data: null,
                message: `${routeName} already exist`
            })
        }

        const encryptPassword = encrypt(user_password);
        const user = await new User({
            user_name,
            user_password: encryptPassword,
            user_full_name, user_email, school, type,
            create_date: Date.now(),
            last_update: Date.now()
        });
        await user.save()

        return res.json({
            status: 200,
            success: true,
            data: user,
            message: `Successfully created the ${routeName}`
        })

    } catch (err) {
        console.log(err);
        return res.json({
            status: 500,
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
};

const editUserClient = async (req, res) => {
    try {
        const id = req.params.userId;
        const userUpdate = req.body;
        const refresh = { new: true };

        const encryptPassword = encrypt(req.body.user_password)
        const user = await User.findByIdAndUpdate(id,
            { ...userUpdate, user_password: encryptPassword, last_update: Date.now() },
            refresh);

        return res.json({
            status: 200,
            success: true,
            data: user,
            message: `Successfully updated the ${routeName}`
        })
    } catch (err) {
        console.log(err);
        return res.json({
            status: 500,
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
};

const editUser = async (req, res) => {
    try {
        const id = req.params.userId;
        const userUpdate = req.body;
        const refresh = { new: true };

        const encryptPassword = encrypt(req.body.user_password)
        const user = await User.findByIdAndUpdate(id,
            { ...userUpdate, user_password: encryptPassword, last_update: Date.now() },
            refresh);

        return res.json({
            status: 200,
            success: true,
            data: user,
            message: `Successfully updated the ${routeName}`
        })
    } catch (err) {
        console.log(err);
        return res.json({
            status: 500,
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
};

const deleteUser = async (req, res) => {
    try {
        const id = req.params.userId;
        const user = await User.findByIdAndDelete(id)

        return res.json({
            status: 200,
            success: true,
            data: user,
            message: `Successfully deleted the ${routeName}`
        })
    } catch (err) {
        console.log(err);
        return res.json({
            status: 500,
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
};

const loginClient = async (req, res) => {
    try {
        const { user_email, user_password } = req.body;
        const checkUser = await (await User.findOne({ user_email }))
            .populate('school')
            .populate('type');

        if (!checkUser || !compare(user_password, checkUser.user_password)) {
            return res.json({
                status: 200,
                success: false,
                data: null,
                message: `${routeName} does not exist`
            })
        }
        const user = checkUser;
        return res.json({
            status: 200,
            success: true,
            data: user,
            message: `Successfully logged in`
        })
    } catch (err) {
        console.log(err);
        return res.json({
            status: 500,
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
};

const login = async (req, res) => {
    try {
        const { user_email, user_password } = req.body;
        const checkUser = await (await User.findOne({ user_email }))
            .populate('school')
            .populate('type');

        if (!checkUser || !compare(user_password, checkUser.user_password)) {
            return res.json({
                status: 200,
                success: false,
                data: null,
                message: `${routeName} does not exist`
            })
        }
        const user = checkUser;
        return res.json({
            status: 200,
            success: true,
            data: user,
            message: `Successfully logged in`
        })
    } catch (err) {
        console.log(err);
        return res.json({
            status: 500,
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
};

const changePassword = async (req, res) => {
    try {
        const id = req.params.userId;
        const { oldPassword, newPassword } = req.body;
        const checkUser = await User.findById(id);

        if (!checkUser) {
            return res.json({
                status: 200,
                success: false,
                data: null,
                message: `${route} does not exist`
            })
        }

        if (!compare(oldPassword, checkUser.user_password)) {
            return res.json({
                status: 200,
                success: false,
                data: null,
                message: `Current password does not match`
            })
        }

        const password = encrypt(newPassword);
        const refresh = { new: true };
        const user = await User.findByIdAndUpdate(id,
            { password, last_update: Date.now() },
            refresh);
        user = await User.findById(id)
            .populate('school')
            .populate('type');

        return res.json({
            status: 200,
            success: true,
            data: user,
            message: `Successfully updated the password`
        })
    } catch (err) {
        console.log(err);
        return res.json({
            status: 500,
            success: false,
            data: null,
            message: `Internal Server Error`
        })
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    getUserByIdClient,
    addNewUser,
    signUp,
    editUser,
    editUserClient,
    deleteUser,
    loginClient,
    login,
    changePassword
}