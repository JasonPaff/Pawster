const {createModule, gql} = require('graphql-modules');
const {User} = require('../../mongodb/models');
const {hashPassword} = require("../../utils/password_utils");

module.exports.userModule = createModule({
    id: 'user_module',
    dirname: __dirname,
    typeDefs: [
        gql`
            type Query {
                getUser(email: String!): UserResponse
            }

            type Mutation {
                createUser(user: UserInput) : UserResponse
            }

            type User {
                id: ID!
                email: String!
                password: String!
                dateCreated: Date!
            }
            
            type UserResponse {
                success: Boolean
                message: String
                user: User
            }

            input UserInput {
                email: String!
                password: String!
            }
        `
    ],
    resolvers: {
        Query: {
            getUser: async (parent, {email}, context, info) => {
                const user = await User.findOne({
                    email: email
                });

                return {
                    success: true,
                    message: `${email} user data found`,
                    user: user
                }
            }
        },
        Mutation: {
            createUser: async (parent, {user}, context, info) => {
                // hash password before saving
                user.password = await hashPassword(user.password);

                const newUser = new User(user);
                await newUser.save();

                return {
                    success: true,
                    message: `new user created`,
                    user: newUser
                };
            }
        }
    }
});