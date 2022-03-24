const {createModule, gql} = require("graphql-modules");
const {authenticate} = require("../../utils/auth_utils");
const {jwtError} = require("../api_responses/auth/auth_error");
const {findUser} = require("../../mongodb/operations/user_operations");
const {userNotFoundError} = require("../api_responses/user/user_error");
const {userPhotoNotFoundError, userProfilePhotoNotFoundError} = require("../api_responses/user_photo/user_photo_error");
const {
    findUserPhoto,
    findUserPhotos,
    findUserProfilePhoto,
    updateUserProfilePhoto,
    deleteUserPhoto,
    deleteAllUserPhotos, addUserPhoto
} = require("../../mongodb/operations/user_photo_operations");
const {
    userPhotosFoundSuccess,
    userProfilePhotoFoundSuccess,
    userPhotoFoundSuccess,
    userPhotoAddedSuccess,
    userProfilePhotoUpdatedSuccess,
    userPhotoDeletedSuccess,
    userPhotosDeletedSuccess
} = require("../api_responses/user_photo/user_photo_success");

module.exports.userPhotoModule = createModule({
    id: 'user_photo_module',
    dirname: __dirname,
    typeDefs: [
        gql`
            extend type Query {
                getUserPhoto(photoId: ID!) : UserPhotoResponse
                getUserPhotos(userId: ID!) : UserPhotosResponse
                getUserProfilePhoto(userId: ID!) : UserPhotoResponse
            },

            extend type Mutation {
                addUserPhoto(userPhoto: UserPhotoInput!) : UserPhotoResponse
                updateUserProfilePhoto(userId: ID!, photoId: ID!) : UserPhotoResponse
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
        Query: {
            getUserPhoto: async (parent, {photoId}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const userPhoto = await findUserPhoto(photoId);
                if (!userPhoto) return userPhotoNotFoundError(photoId);

                return userPhotoFoundSuccess(photoId, userPhoto);
            },
            getUserPhotos: async (parent, {userId}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const userPhotos = await findUserPhotos(userId);
                if (!userPhotos || userPhotos.length === 0) return userPhotoNotFoundError(userId);

                return userPhotosFoundSuccess(userId);
            },
            getUserProfilePhoto: async (parent, {userId}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const userPhoto = await findUserProfilePhoto(userId);
                if (!userPhoto) return userProfilePhotoNotFoundError(userId);

                return userProfilePhotoFoundSuccess(userId);
            },
        },
        Mutation: {
            addUserPhoto: async (parent, {userPhoto}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const user = await findUser(userPhoto.userId);
                if (!user) return userNotFoundError(userPhoto.userId);

                const newPhoto = await addUserPhoto(userPhoto);

                return userPhotoAddedSuccess(newPhoto);
            },
            updateUserProfilePhoto: async (parent, {userId, photoId}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const user = await findUser(userId);
                if (!user) return userNotFoundError(userId);

                const photo = await findUserPhoto(photoId);
                if (!photo) return userPhotoNotFoundError(photoId);

                await updateUserProfilePhoto(userId, photoId);

                return userProfilePhotoUpdatedSuccess(userId, photo);
            },
            deleteUserPhoto: async (parent, {photoId}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const photo = await findUserPhoto(photoId);
                if (!photo) return userPhotoNotFoundError(photoId);

                await deleteUserPhoto(photo);

                return userPhotoDeletedSuccess(photoId, photo);
            },
            deleteAllUserPhotos: async (parent, {userId}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const photos = await findUserPhotos(userId);
                if (!photos || photos.length === 0) return userPhotoNotFoundError(userId);

                await deleteAllUserPhotos(userId);

                return userPhotosDeletedSuccess(userId, photos);
            }
        }
    }
});