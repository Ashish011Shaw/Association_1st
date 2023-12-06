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

// delete post 
const deletePost = async (req, h) => {
    try {
        const { id } = req.params;
        if (!id) {
            return h.response({ message: "Please enter a postId" }).code(400);
        }
        await models.Post.destroy({
            where: {
                id
            }
        });
        return h.response({ message: "Successfully deleted post" }).code(200);

    } catch (error) {
        console.error(error);
        return h.response({ message: "Something went wrong", error }).code(500);
    }
};

const editPost = async (req, h) => {
    try {
        const { id } = req.params;
        const { title, content } = req.payload;

        if (!id) {
            return h.response({ message: "Please enter a postId" }).code(400);
        }

        if (!title) {
            return h.response({ message: "Please enter a title" }).code(400);
        }
        if (!content) {
            return h.response({ message: "Please enter a content" }).code(400);
        }
        const post = await models.Post.update(
            { title, content },
            { where: { id }, returning: true }

        );
        if (post) {
            const updatedData = await models.Post.findOne({ where: { id } })
            return h.response({ message: "Successfully edited post", data: updatedData }).code(200);

        }
        // return h.response({ message: "Successfully edited post", data: updatedData }).code(200);
    } catch (error) {
        console.error(error);
        return h.response({ message: "Something went wrong", error }).code(500);
    }
}
module.exports = {
    addPost,
    getUserByPost,
    deletePost,
    editPost
}