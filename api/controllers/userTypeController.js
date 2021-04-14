const Type = require('../../api/models/usertype');

const getAllTypes = async (req, res) => {
    try {
        const type = await Type.find()

        return res.json({
            status: 200,
            success: true,
            data: type,
            count: type.length
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
    getAllTypes
}