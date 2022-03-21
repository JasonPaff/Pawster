const { createApplication } = require('graphql-modules');
const { userModule } = require('./user');

module.exports.application = createApplication({
    modules: [userModule]
});