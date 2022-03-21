const { createApplication } = require('graphql-modules');
const { userModule } = require('./user/user');

module.exports.application = createApplication({
    modules: [userModule]
});