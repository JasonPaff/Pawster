const {createModule, gql} = require("graphql-modules");
const {authenticate} = require("../../utils/auth_utils");
const {jwtError} = require("../api_responses/auth/auth_error");

module.exports.userPhotoModule = createModule({
    id: 'user_photo_module',
    dirname: __dirname,
    typeDefs: [
        gql`
            extend type Query {
                getUserPhoto(photoId: ID!) : UserPhotoResponse
                getUserPhotos(userId: ID!) : UserPhotosResponse
            },

            extend type Mutation {
                createUserPhoto(userPhoto: UserPhotoInput!) : UserPhotoResponse
                updateUserPhoto(photoId: ID!, userPhoto: UserPhotoInput!) : UserPhotoResponse
                deleteUserPhoto(photoId: ID!) : UserPhotoResponse
                deleteAllUserPhotos(userId: ID!) : UserPhotosResponse
            }

            type UserPhoto {
                userId: ID!
                photo: String!
                isProfilePhoto: Boolean
            }

            input UserPhotoInput {
                userId: ID!
                photo: String!
                isProfilePhoto: Boolean
            }

            type UserPhotoResponse {
                success: Boolean
                message: String
                photo: UserPhoto
            }

            type UserPhotosResponse {
                success: Boolean
                message: String
                photos: [UserPhoto]
            }
        `
    ],
    resolvers: {
        Query : {
            getUserPhoto: async (parent, {photoId}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();


            },
            getUserPhotos: async (parent, {userId}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();


            }
        },
        Mutation : {
            createUserPhoto: async (parent, {petPhoto}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();


            },
            updateUserPhoto: async (parent, {petPhoto}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();


            },
            deleteUserPhoto: async (parent, {photoId}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();


            },
            deleteAllUserPhotos: async (parent, {petId}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();


            }
        }
    }
});