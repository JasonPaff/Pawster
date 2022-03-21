const { createApplication } = require('graphql-modules');
const { userModule } = require('./user/user');

module.exports.graphql_schema = createApplication({
    modules: [userModule]
}).createSchemaForApollo();