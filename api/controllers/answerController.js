const { flowRight } = require('lodash');
const Answer = require('../models/answer');
const routeName = `question`;

const getAllAnswer = async (req, res) => {
    try {
        await Answer.find()
            .sort({ timeCreated: 'desc' })
            .populate('user')
            .populate('question')
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

const getAllAnswerClient = async (req, res) => {
    try {
        await Answer.find()
            .sort({ timeCreated: 'desc' })
            .populate('user')
            .populate('question')
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

const addNewAnswer = async (req, res) => {
    try {
        const { answer_content, answer_rating, question, user } = req.body;
        const answer = await new Answer({
            answer_content, answer_rating, question, user,
            create_date: Date.now(),
            last_update: Date.now()
        })
        await answer.save()

        return res.json({
            status: 200,
            success: true,
            data: answer,
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

const addNewAnswerClient = async (req, res) => {
    try {
        const { answer_content, answer_rating, question, user } = req.body;
        const question = await new Question({
            answer_content, answer_rating, question, user,
            create_date: Date.now(),
            last_update: Date.now()
        })
        await question.save()

        return res.json({
            status: 200,
            success: true,
            data: answer,
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

const getAnswerById = async (req, res) => {
    try {
        const id = req.params.answerId;
        await Answer.findById(id)
            .populate('user')
            .populate('question')
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

const getAnswerByIdClient = async (req, res) => {
    try {
        const id = req.params.answerId;
        await Answer.findById(id)
            .populate('user')
            .populate('question')
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

const editAnswer = async (req, res) => {
    try {
        const id = req.params.answerId;
        const answerUpdate = req.body;
        const refresh = { new: true };

        const answer = await Answer.findByIdAndUpdate(id,
            { ...answerUpdate, last_update: Date.now() },
            refresh);

        return res.json({
            status: 200,
            success: true,
            data: answer,
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
        const id = req.params.answerId;
        const answerUpdate = req.body;
        const refresh = { new: true };

        const answer = await Answer.findByIdAndUpdate(id,
            { ...answerUpdate, last_update: Date.now() },
            refresh);

        return res.json({
            status: 200,
            success: true,
            data: answer,
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

const deleteAnswer = async (req, res) => {
    try {
        const id = req.params.answerId;
        const answer = await Answer.findByIdAndDelete(id)

        return res.json({
            status: 200,
            success: true,
            data: answer,
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
        const id = req.params.answerId;
        const answer = await Answer.findByIdAndDelete(id)

        return res.json({
            status: 200,
            success: true,
            data: answer,
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
    getAllAnswer,
    getAllAnswerClient,
    addNewAnswer,
    addNewAnswerClient,
    getAnswerById,
    getAnswerByIdClient,
    editAnswer,
    editAnswerClient,
    deleteAnswer,
    deleteAnswerClient
}