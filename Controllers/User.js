const models = require('../models');

// sign-up users
const signUp = async (req, h) => {
    try {
        const { firstName, lastName, email } = req.payload;
        if (!firstName) {
            return h.response({ message: "Please enter your name" });
        }
        if (!lastName) {
            return h.response({ message: "Please enter your name" });
        }
        if (!email) {
            return h.response({ message: "Please enter your email" });
        }


        const preUser = await models.User.findOne({ where: { email } });

        if (preUser) {
            return h.response({ message: "User already exists" });
        } else {

            const newUser = await models.User.create({ firstName, lastName, email });
            return h.response({ message: "Sucessfully sign-up", data: newUser }).code(201);


        }


    } catch (error) {
        console.log(error);
        return h.response({ message: "Something went wrong", error }).code(400);
    }
};

const deleteUser = async (req, h) => {
    try {
        const { id } = req.params;
        if (!id) {
            return h.response({ message: "Please provide an id" }).code(400);
        }
        const user = await models.User.findByPk(id);
        if (!user) {
            return h.response({ message: "User not found" }).code(404);
        }
        await user.destroy();
        return h.response({ message: "Successfully deleted user" }).code(200);

    } catch (error) {
        console.log(error);
        return h.response({ message: "Something went wrong", error }).code(400);
    }
}


const getUsersWithPosts = async (req, h) => {
    try {
        const users = await models.User.findAll({
            include: [{
                model: models.Post,
                as: 'posts', // This should match the alias used in the User model
                // attributes: ['title', 'content', 'userId']
            }],
        });

        return h.response({ message: "Successfully retrieved users with posts", data: users }).code(200);
    } catch (error) {
        console.error(error);
        return h.response({ message: "Something went wrong", error }).code(500);
    }
};



module.exports = {
    signUp,
    getUsersWithPosts,
    deleteUser
}