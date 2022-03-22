const { createApplication } = require('graphql-modules');
const { userModule } = require('./modules/user_module');
const {addressModule} = require("./modules/address_module");
const {dateModule} = require("./modules/date_module");

module.exports.graphql_schema = createApplication({
    modules: [userModule, addressModule, dateModule]
}).createSchemaForApollo();