const {createApplication} = require('graphql-modules');
const {petModule} = require("./modules/pet_module");
const {hostModule} = require("./modules/host_module");
const {dateModule} = require("./modules/date_module");
const {userModule} = require('./modules/user_module');
const {addressModule} = require("./modules/address_module");
const {petPhotoModule} = require("./modules/pet_photo_module");
const {userPhotoModule} = require("./modules/user_photo_module");
const {boardingModule} = require("./modules/boarding_module");
const {daycareModule} = require("./modules/daycare_module");
const {messageModule} = require("./modules/message_module");
const {reviewModule} = require("./modules/review_module");
const {sittingModule} = require("./modules/sitting_module");
const {visitModule} = require("./modules/visiting_module");
const {walkingModule} = require("./modules/walking_module");
const {notificationModule} = require("./modules/notification_module");

module.exports.graphql_schema = createApplication({
    modules: [
        addressModule, boardingModule, dateModule, daycareModule,
        hostModule, messageModule, petModule, petPhotoModule, reviewModule,
        sittingModule, userModule, userPhotoModule, visitModule, walkingModule,
        notificationModule
    ]
}).createSchemaForApollo();