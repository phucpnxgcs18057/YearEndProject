const { flowRight } = require('lodash');
const Question = require('../models/question');
const routeName = `question`;

const getAllQuestion = async (req, res) => {
    try {
        await Question.find()
            .sort({ timeCreated: 'desc' })
            .then(docs => {
                console.log(docs);
                res.status(200).json(docs);
            });
    } catch (error) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};

const getAllQuestionClient = async (req, res) => {
    try {
        await Question.find()
            .sort({ timeCreated: 'desc' })
            .then(docs => {
                console.log(docs);
                res.status(200).json(docs);
            });
    } catch (error) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};

const addNewQuestion = async (req, res) => {
    try {
        const {question_title, question_content, question_snippet, library, user} = req.body;

        const checkQuestion = await Question.findOne({ question_title });
        if (checkQuestion) {
            return res.json({
                status: 200,
                success: false,
                data: null,
                message: `${routeName} already exist`
            })
        }
        const question = await new Question({
            question_title, question_content, question_snippet, library, user,
            create_date: Date.now(),
            last_update: Date.now()
        })
        await question.save()

        return res.json({
            status: 200,
            success: true,
            data: question,
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

const addNewQuestionClient = async (req, res) => {
    try {
        const {question_title, question_content, question_snippet, library, user} = req.body;

        const checkQuestion = await Question.findOne({ question_title });
        if (checkQuestion) {
            return res.json({
                status: 200,
                success: false,
                data: null,
                message: `${routeName} already exist`
            })
        }
        const question = await new Question({
            question_title, question_content, question_snippet, library, user,
            create_date: Date.now(),
            last_update: Date.now()
        })
        await question.save()

        return res.json({
            status: 200,
            success: true,
            data: question,
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

const getQuestionById = async (req, res) => {
    try {
        const id = req.params.questionId;
        await Question.findById(id)
            .populate('user')
            .populate('library')
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

const getQuestionByIdClient = async (req, res) => {
    try {
        const id = req.params.questionId;
        await Question.findById(id)
            .populate('user')
            .populate('library')
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

const editQuestion = async (req, res) => {
    try {
        const id = req.params.questionId;
        const questionUpdate = req.body;
        const refresh = { new: true };

        const question = await Question.findByIdAndUpdate(id,
            { ...questionUpdate, last_update: Date.now() },
            refresh);

        return res.json({
            status: 200,
            success: true,
            data: question,
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

const editQuestionClient = async (req, res) => {
    try {
        const id = req.params.questionId;
        const questionUpdate = req.body;
        const refresh = { new: true };

        const question = await Question.findByIdAndUpdate(id,
            { ...questionUpdate, last_update: Date.now() },
            refresh);

        return res.json({
            status: 200,
            success: true,
            data: question,
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

const deleteQuestion = async (req, res) => {
    try {
        const id = req.params.questionId;
        const question = await Question.findByIdAndDelete(id)

        return res.json({
            status: 200,
            success: true,
            data: question,
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

const deleteQuestionClient = async (req, res) => {
    try {
        const id = req.params.questionId;
        const question = await Question.findByIdAndDelete(id)

        return res.json({
            status: 200,
            success: true,
            data: question,
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

module.exports = {
    getAllQuestion,
    getAllQuestionClient,
    addNewQuestion,
    addNewQuestionClient,
    getQuestionById,
    getQuestionByIdClient,
    editQuestion,
    editQuestionClient,
    deleteQuestion,
    deleteQuestionClient
}