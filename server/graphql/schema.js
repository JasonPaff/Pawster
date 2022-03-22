const { createApplication } = require('graphql-modules');
const { userModule } = require('./user/user');
const {addressModule} = require("./address/address");
const {dateModule} = require("./date/date");

module.exports.graphql_schema = createApplication({
    modules: [userModule, addressModule, dateModule]
}).createSchemaForApollo();