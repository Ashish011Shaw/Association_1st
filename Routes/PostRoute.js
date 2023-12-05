const postController = require("../Controllers/Post")


module.exports = [
    {
        method: 'post',
        path: '/add-post',
        handler: postController.addPost
    }
]