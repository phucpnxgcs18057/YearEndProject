const User = require('../models/user');
const Type = require('../models/usertype');
const { encrypt, compare } = require('../other/bcrypt');
const Alert = require('alert');
const routeName = `user`;

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
            .populate('type')
            .exec();
        const types = await Type.find();
        res.render('user/view', { users, types });
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
        const id = req.query.userId;
        const user = await User.findById(id)
            .populate('type')
            .exec();
        res.render('user/detail', { user });

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

const addNewUserPage = async (req, res) => {
    const types = await Type.find();
    res.render('user/create', { types });
};

const addNewUser = async (req, res) => {
    try {
        const alert = Alert
        const { user_name, user_password, user_full_name, user_email, type } = req.body;

        const checkUser = await User.findOne({ user_email });
        if (checkUser) {
            return res.json({
                status: 200,
                success: false,
                data: null,
                message: `${routeName} already exist`
            })
        }

        console.log(user_password);
        const encryptPassword = encrypt(user_password);
        
        const user = await new User({
            user_name: user_name,
            user_password: encryptPassword,
            user_full_name: user_full_name, 
            user_email: user_email, 
            type: type,
        });
        await user.save()
        alert("Add Success!");
        return res.redirect("/users/view");
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

const signUpPage = async (req, res) => {
    const types = await Type.find();
    const limitedTypes = ["Admin", "Moderator"];
    let filteredTypes =  types.filter(type => {
        return !limitedTypes.includes(type._doc.user_type);
    })
    console.log(filteredTypes);
    res.render('signup', { types: filteredTypes, user: req.user });
};

const signUp = async (req, res) => {
    try {

        const { user_name, user_password, user_full_name, user_email, type } = req.body;

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
            user_name: user_name,
            user_password: encryptPassword,
            user_full_name: user_full_name, 
            user_email: user_email, 
            type: type,
        });
        await user.save()

        return res.redirect("/login");
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

const editSelfPage = async (req, res) => {
    const id = req.user._id;
    const userType = req.user.type.user_type;
    res.render('user/edit_self', { userID: id, user: req.user, types: null, userType});
};

const editSelf = async (req, res) => {
    try {
        const alert = Alert;
        const id = req.params.userId;
        const userUpdate = req.body;
        const refresh = { new: true };
        const encryptPassword = encrypt(req.body.user_password)
        await User.findByIdAndUpdate(id,
            { ...userUpdate, user_password: encryptPassword, last_update: Date.now() },
            refresh);
        alert('Edit Success!');
        return res.redirect("/library/view");
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

const editUserPage = async (req, res) => {
    const id = req.query.userId;
    const user = await User.findById(id).populate('type').exec();
    const types = await Type.find();
    res.render('user/edit', { userID: id, user, types });
};

const editUser = async (req, res) => {
    try {
        const alert = Alert
        const id = req.params.userId;
        const userUpdate = req.body;
        const refresh = { new: true };
        const encryptPassword = encrypt(req.body.user_password)
        await User.findByIdAndUpdate(id,
            { ...userUpdate, user_password: encryptPassword, last_update: Date.now() },
            refresh);
        alert ("Edit Success!");
        return res.redirect("/users/view");
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
        const alert = Alert
        const id = req.params.userId;
        const user = await User.findByIdAndDelete(id);

        const resources = await Resource.find({
            user: id
        });

        for (let i = 0; i < resources.length; i++) {
            const resource = resources[i];
            await Resource.findByIdAndDelete(resource._id);
        }

        const libraries = await Resource.find({
            user: id
        });
        
        for (let i = 0; i < libraries.length; i++) {
            const library = libraries[i];
            await Library.findByIdAndDelete(library._id);
        }

        alert ("Delete Success!");
        res.redirect("back");
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
    addNewUserPage,
    addNewUser,
    signUpPage,
    signUp,
    editSelfPage,
    editSelf,
    editUserPage,
    editUser,
    deleteUser,
    loginClient,
}