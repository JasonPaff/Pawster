const {createModule, gql} = require('graphql-modules');

module.exports.userModule = createModule({
    id: 'user-module',
    dirname: __dirname,
    typeDefs: [
        gql`
            type User {
                id: ID!
                email: String!
                password: String!
            }
            type Query {
                getUserById(id: ID!) : User!
                getUserByEmail(email: String!): User!
            }
        `
    ],
    resolvers: {
        Query: {
            getUserByEmail: async (parent, {email}) => {

            },
            getUserById: async (parent, {id}) => {

            }
        }
    }
});