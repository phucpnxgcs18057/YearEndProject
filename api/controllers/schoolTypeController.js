const schoolType = require('../models/schooltype');

const getAllSchoolTypes = async (req, res) => {
    try {
        const schooltype = await schoolType.find()

        return res.json({
            status: 200,
            success: true,
            data: schooltype,
            count: schooltype.length
        })
    } catch (error) {
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
    getAllSchoolTypes
}