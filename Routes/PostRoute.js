const postController = require("../Controllers/Post")


module.exports = [
    {
        method: 'post',
        path: '/add-post',
        handler: postController.addPost
    },
    {
        method: 'get',
        path: '/get-user-by-post',
        handler: postController.getUserByPost
    },
    {
        method: 'delete',
        path: '/delete-post',
        handler: postController.deletePost
    },
    {
        method: 'put',
        path: '/edit-post/{id}',
        handler: postController.editPost
    }
]