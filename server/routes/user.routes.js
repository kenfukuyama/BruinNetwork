const Users = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    app.post("/api/register", Users.register);
    app.post("/api/login", Users.login);
    // // this route now has to be authenticated, this is authorizated only if logged in
    app.get('/api/users/:id', Users.getUser);
    app.get('/api/users/:id/saved-events', Users.getSavedEvents);
    app.put('/api/users/:id', Users.updateUser);
    app.get("/api/users", authenticate, Users.getAll);
    // app.get("/api/users", Users.getAll);

    app.get("/api/logout", Users.logout);
}