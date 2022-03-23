const {createModule, gql} = require("graphql-modules");
const {authenticate} = require("../../utils/auth_utils");
const {jwtError} = require("../api_responses/auth/auth_error");
const {findPhoto, findPhotos, createPhoto, updatePhoto, deletePhoto, deleteAllPhotos} = require("../../mongodb/operations/pet_photo_operations");
const {petPhotoNotFoundError, petPhotosNotFoundError} = require("../api_responses/pet_photo/pet_photo_error");
const {petPhotoFoundSuccess, petPhotoCreatedSuccess, petPhotoDeletedSuccess, petPhotosDeletedSuccess,
    petPhotosFoundSuccess
} = require("../api_responses/pet_photo/pet_photo_success");
const {findPet} = require("../../mongodb/operations/pet_operations");
const {petNotFoundError} = require("../api_responses/pet/pet_error");

module.exports.petPhotoModule = createModule({
    id: 'pet_photo_module',
    dirname: __dirname,
    typeDefs: [
        gql`
            extend type Query {
                getPetPhoto(photoId: ID!) : PetPhotoResponse
                getPetPhotos(petId: ID!) : PetPhotosResponse 
            },
            
            extend type Mutation {
                createPetPhoto(petPhoto: PetPhotoInput!) : PetPhotoResponse
                updatePetPhoto(photoId: ID!, petPhoto: PetPhotoInput!) : PetPhotoResponse
                deletePetPhoto(photoId: ID!) : PetPhotoResponse
                deleteAllPetPhotos(petId: ID!) : PetPhotosResponse
            }
            
            type PetPhoto {
                petId: ID!
                photo: String!
            }
            
            input PetPhotoInput {
                petId: ID!
                photo: String!
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
        `
    ],
    resolvers: {
        Query : {
            getPetPhoto: async (parent, {photoId}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const petPhoto = await findPhoto(photoId);
                if (!petPhoto) return petPhotoNotFoundError(photoId);

                return petPhotoFoundSuccess(photoId);
            },
            getPetPhotos: async (parent, {petId}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const petPhotos = await findPhotos(petId);
                if (!petPhotos || petPhotos.length === 0) return petPhotosNotFoundError(petId);

                return petPhotosFoundSuccess(petId);
            }
        },
        Mutation : {
            createPetPhoto: async (parent, {petPhoto}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const pet = await findPet(petPhoto.petId);
                if (!pet) return petNotFoundError(petPhoto.petId);

                const newPhoto = await createPhoto(petPhoto);

                return petPhotoCreatedSuccess(newPhoto);
            },
            updatePetPhoto: async (parent, {petPhoto}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const photo = await findPhoto(petPhoto.id);
                if (!photo) return petPhotoNotFoundError(petPhoto.id);

                photo.photo = updatePhoto;
                const newPhoto = await updatePhoto(petPhoto);

                return petPhotoCreatedSuccess(newPhoto);
            },
            deletePetPhoto: async (parent, {photoId}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const photo = await findPhoto(photoId);
                if (!photo) return petPhotoNotFoundError(photoId);

                await deletePhoto(photoId);

                return petPhotoDeletedSuccess(photoId, photo);
            },
            deleteAllPetPhotos: async (parent, {petId}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const photos = await findPhotos(petId);
                if (!photos) return petPhotosNotFoundError(petId);

                await deleteAllPhotos(petId);

                return petPhotosDeletedSuccess(petId, photos);
            }
        }
    }
});