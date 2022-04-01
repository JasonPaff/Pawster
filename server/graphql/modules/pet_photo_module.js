const {createModule, gql} = require("graphql-modules");
const {authenticate} = require("../../utils/auth_utils");
const {jwtError} = require("../api_responses/auth/auth_error");
const {findPet} = require("../../mongodb/operations/pet_operations");
const {petNotFoundError} = require("../api_responses/pet/pet_error");
const { petPhotoNotFoundError, petPhotosNotFoundError, petProfilePhotoNotFoundError} = require("../api_responses/pet_photo/pet_photo_error");
const { findPetPhoto, findPetPhotos, deletePetPhoto, deleteAllPetPhotos, findPetProfilePhoto, updatePetProfilePhoto, addPetPhoto} = require("../../mongodb/operations/pet_photo_operations");
const { petProfilePhotoUpdatedSuccess, petPhotoDeletedSuccess, petPhotosDeletedSuccess, petPhotosFoundSuccess, petProfilePhotoFoundSuccess, petPhotoFoundSuccess, petPhotoAddedSuccess} = require("../api_responses/pet_photo/pet_photo_success");

module.exports.petPhotoModule = createModule({
    id: 'pet_photo_module',
    dirname: __dirname,
    typeDefs: [
        gql`
            extend type Query {
                getPetPhoto(photoId: ID!) : PetPhotoResponse
                getPetPhotos(petId: ID!) : PetPhotosResponse
                getPetProfilePhoto(petId: ID!) : PetPhotoResponse
            },

            extend type Mutation {
                addPetPhoto(petPhoto: PetPhotoInput!) : PetPhotoResponse
                updatePetProfilePhoto(petId: ID!, photoId: ID!) : PetPhotoResponse
                deletePetPhoto(photoId: ID!) : PetPhotoResponse
                deleteAllPetPhotos(petId: ID!) : PetPhotosResponse
            }

            type PetPhoto {
                petId: ID!
                photo: String!
                photoType: String!
                isProfilePhoto: Boolean
            }

            input PetPhotoInput {
                petId: ID!
                photo: String!
                photoType: String!
            }

            type PetPhotoResponse {
                success: Boolean
                message: String
                photo: PetPhoto
            }

            type PetPhotosResponse {
                success: Boolean
                message: String
                photos: [PetPhoto]
            }
        `], resolvers: {
        Query: {
            getPetPhoto: async (parent, {photoId}, context) => {
                // const authenticated = await authenticate(context);
                // if (!authenticated) return jwtError();

                const petPhoto = await findPetPhoto(photoId);
                if (!petPhoto) return petPhotoNotFoundError(photoId);

                return petPhotoFoundSuccess(photoId, petPhoto);
            },
            getPetPhotos: async (parent, {petId}, context) => {
                // const authenticated = await authenticate(context);
                // if (!authenticated) return jwtError();

                const petPhotos = await findPetPhotos(petId);
                if (!petPhotos || petPhotos.length === 0) return petPhotosNotFoundError(petId);

                return petPhotosFoundSuccess(petId, petPhotos);
            },
            getPetProfilePhoto: async (parent, {petId}, context) => {
                const petProfilePhoto = await findPetProfilePhoto(petId);
                if (!petProfilePhoto) return petProfilePhotoNotFoundError(petId);

                return petProfilePhotoFoundSuccess(petId);
            },
        },
        Mutation: {
            addPetPhoto: async (parent, {petPhoto}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const pet = await findPet(petPhoto.petId);
                if (!pet) return petNotFoundError(petPhoto.petId);

                const newPhoto = await addPetPhoto(petPhoto);

                return petPhotoAddedSuccess(newPhoto);
            },
            updatePetProfilePhoto: async (parent, {petId, photoId}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const pet = await findPet(petId);
                if (!pet) return petNotFoundError(petId);

                const photo = await findPetPhoto(photoId);
                if (!photo) return petPhotoNotFoundError(photoId);

                await updatePetProfilePhoto(petId, photoId);

                return petProfilePhotoUpdatedSuccess(petId, photo);
            },
            deletePetPhoto: async (parent, {photoId}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const photo = await findPetPhoto(photoId);
                if (!photo) return petPhotoNotFoundError(photoId);

                await deletePetPhoto(photoId);

                return petPhotoDeletedSuccess(photoId, photo);
            },
            deleteAllPetPhotos: async (parent, {petId}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const photos = await findPetPhotos(petId);
                if (!photos || photos.length === 0) return petPhotosNotFoundError(petId);

                await deleteAllPetPhotos(petId);

                return petPhotosDeletedSuccess(petId, photos);
            }
        }
    }
});