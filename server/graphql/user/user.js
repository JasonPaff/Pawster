const {createModule, gql} = require('graphql-modules');
const {User} = require('../../mongodb/models');
const {hashPassword} = require("../../utils/password_utils");

module.exports.userModule = createModule({
    id: 'user_module',
    dirname: __dirname,
    typeDefs: [
        gql`
            type Query {
                getUserById(id: ID!) : User!
                getUserByEmail(email: String!): User!
            }

            type Mutation {
                createUser(user: UserInput) : User
            }
            
            type User {
                id: ID!
                email: String!
                password: String!
                dateCreated: Date!
            }
            
            input UserInput {
                email: String!
                password: String!
            }
        `
    ],
    resolvers: {
        Query: {
            getUserByEmail: async (parent, {email}, context, info) => {
                return {id: 0, email: 'fake@fake.com', password: 'fake'}
            },
            getUserById: async (parent, {id}, context, info) => {
                return {id: 0, email: 'fake@fake.com', password: 'fake'}
            }
        },
        Mutation: {
            createUser: async (parent, {user}, context, info) => {
                // hash password before saving
                user.password = hashPassword(user.password);
                const newUser = new User(user);
                await newUser.save();
                return newUser;
            }
        }
    }
});