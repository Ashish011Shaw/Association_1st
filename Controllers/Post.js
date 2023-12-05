const models = require('../models');

// add posts
const addPost = async (req, h) => {
    try {
        const { title, content, userId } = req.payload;
        if (!title) {
            return h.response({ message: "Please enter a title" }).code(400);
        }
        if (!content) {
            return h.response({ message: "Please enter a content" }).code(400);
        }
        if (!userId) {
            return h.response({ message: "Please enter a userId" }).code(400);
        }

        const newPost = await models.Post.create({ title, content, userId });
        return h.response({ message: "Successfully added post", data: newPost }).code(201);
    } catch (error) {
        console.error(error);
        return h.response({ message: "Something went wrong", error }).code(500);
    }
};

const getUserByPost = async (req, h) => {
    try {
        let data = await models.Post.findAll({
            include: [{
                model: models.User,
                as: 'user'
            }]
        })
        return h.response({ message: "Successfully retrieved post", data: data }).code(200);
    } catch (error) {
        console.error(error);
        return h.response({ message: "Something went wrong", error }).code(500);
    }
}
module.exports = {
    addPost,
    getUserByPost
}