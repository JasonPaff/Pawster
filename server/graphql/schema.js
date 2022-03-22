const { createApplication } = require('graphql-modules');
const { userModule } = require('./modules/user');
const {addressModule} = require("./modules/address");
const {dateModule} = require("./modules/date");

module.exports.graphql_schema = createApplication({
    modules: [userModule, addressModule, dateModule]
}).createSchemaForApollo();