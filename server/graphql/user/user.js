const {createModule, gql} = require('graphql-modules');

module.exports.userModule = createModule({
    id: 'user_module',
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
                return { id: 0, email: 'fake@fake.com', password:'fake'}
            },
            getUserById: async (parent, {id}) => {
                return { id: 0, email: 'fake@fake.com', password:'fake'}
            }
        }
    }
});