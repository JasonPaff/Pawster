const {createModule, gql} = require('graphql-modules');

module.exports.addressModule = createModule({
    id: 'address_module',
    dirname: __dirname,
    typeDefs: [
        gql`
            type Address {
                street: String!
                city: String!
                state: String!
                zipcode: Int!
            }
        `
    ]
});