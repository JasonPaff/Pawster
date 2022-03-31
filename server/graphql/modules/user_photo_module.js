const {createModule, gql} = require("graphql-modules");
const {authenticate, decodeToken} = require("../../utils/auth_utils");
const {jwtError} = require("../api_responses/auth/auth_error");
const {userNotFoundError} = require("../api_responses/user/user_error");
const {userPhotoNotFoundError, userProfilePhotoNotFoundError} = require("../api_responses/user_photo/user_photo_error");
const {findUserPhoto, findUserPhotos, findUserProfilePhoto, updateUserProfilePhoto, deleteUserPhoto, deleteAllUserPhotos, addUserPhoto} = require("../../mongodb/operations/user_photo_operations");
const {userPhotosFoundSuccess, userProfilePhotoFoundSuccess, userPhotoFoundSuccess, userPhotoAddedSuccess, userProfilePhotoUpdatedSuccess, userPhotoDeletedSuccess, userPhotosDeletedSuccess} = require("../api_responses/user_photo/user_photo_success");
const {findUserById} = require("../../mongodb/operations/user_operations");

module.exports.userPhotoModule = createModule({
    id: 'user_photo_module',
    dirname: __dirname,
    typeDefs: [
        gql`
            extend type Query {
                getUserPhoto(photoId: ID!) : UserPhotoResponse
                getUserPhotos : UserPhotosResponse
                getUserProfilePhoto : UserPhotoResponse
                getUserProfilePhotoById(userId: ID!) : UserPhotoResponse
            },

            extend type Mutation {
                addUserPhoto(userPhoto: UserPhotoInput!) : UserPhotoResponse
                updateUserProfilePhoto(photoId: ID!) : UserPhotoResponse
                deleteUserPhoto(photoId: ID!) : UserPhotoResponse
                deleteAllUserPhotos : UserPhotosResponse
            }

            type UserPhoto {
                userId: ID
                photo: String
                photoType: String
                isProfilePhoto: Boolean
            }

            input UserPhotoInput {
                photo: String!
                photoType: String!
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
            getUserPhotos: async (parent, {}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const userId = await decodeToken(context);
                if (!userId) return jwtError();

                const userPhotos = await findUserPhotos(userId);
                if (!userPhotos) return userPhotoNotFoundError(userId);

                return userPhotosFoundSuccess(userId, userPhotos);
            },
            getUserProfilePhoto: async (parent, {}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const userId = await decodeToken(context);
                if (!userId) return jwtError();

                const userPhoto = await findUserProfilePhoto(userId);
                if (!userPhoto) return userProfilePhotoNotFoundError(userId);

                return userProfilePhotoFoundSuccess(userId, userPhoto);
            },
            getUserProfilePhotoById: async (parent, {userId}) => {
                const user = await findUserById(userId);
                if (!user) return userNotFoundError(userId);

                const userPhoto = await findUserProfilePhoto(userId);
                if (!userPhoto) return userProfilePhotoNotFoundError(userId);

                return userProfilePhotoFoundSuccess(userId, userPhoto);
            },
        },
        Mutation: {
            addUserPhoto: async (parent, {userPhoto}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const userId = await decodeToken(context);
                if (!userId) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userNotFoundError(userId);

                userPhoto.userId = userId;
                const newPhoto = await addUserPhoto(userPhoto);

                return userPhotoAddedSuccess(newPhoto);
            },
            updateUserProfilePhoto: async (parent, {photoId}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const userId = await decodeToken(context);
                if (!userId) return jwtError();

                const user = await findUserById(userId);
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
            deleteAllUserPhotos: async (parent, {}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const userId = await decodeToken(context);
                if (!userId) return jwtError();

                const photos = await findUserPhotos(userId);
                if (!photos || photos.length === 0) return userPhotoNotFoundError(userId);

                await deleteAllUserPhotos(userId);

                return userPhotosDeletedSuccess(userId, photos);
            }
        }
    }
});