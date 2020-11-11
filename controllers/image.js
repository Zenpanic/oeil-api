const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: process.env.CLARIFAI_API_KEY
});

const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('unable to work with the API'));
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('score', 1)
        .returning('score')
        .then(score => {
            res.status(200).json(score[0]);
        })
        .catch(err => {
            res.status(400).json('unable to update the score');
        });
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}