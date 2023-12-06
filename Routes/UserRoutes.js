const usersControllers = require("../Controllers/User")

module.exports = [{
    method: 'post',
    path: '/sign-up-users',
    handler: usersControllers.signUp
},
{
    method: 'GET',
    path: '/users-with-posts',
    handler: usersControllers.getUsersWithPosts,
},
{
    method: 'DELETE',
    path: '/users/{id}',
    handler: usersControllers.deleteUser
},
{
    method: 'GET',
    path: '/users/{id}',
    handler: usersControllers.getUserById
}
]