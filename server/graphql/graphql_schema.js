const {petModule} = require("./modules/pet_module");
const {hostModule} = require("./modules/host_module");
const {dateModule} = require("./modules/date_module");
const { userModule } = require('./modules/user_module');
const { createApplication } = require('graphql-modules');
const {addressModule} = require("./modules/address_module");
const {petPhotoModule} = require("./modules/pet_photo_module");
const {userPhotoModule} = require("./modules/user_photo_module");

module.exports.graphql_schema = createApplication({
    modules: [userModule, addressModule, dateModule, petModule,
        petPhotoModule, userPhotoModule, hostModule]
}).createSchemaForApollo();