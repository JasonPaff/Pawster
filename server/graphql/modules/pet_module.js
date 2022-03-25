const {createModule, gql} = require('graphql-modules');
const {authenticate, decodeToken} = require("../../utils/auth_utils");
const {jwtError} = require("../api_responses/auth/auth_error");
const {findPet, findPets, createPet, updatePet, deletePet, deletePets} = require("../../mongodb/operations/pet_operations");
const {petNotFoundError, petsNotFoundError} = require("../api_responses/pet/pet_error");
const {petFoundSuccess, petsFoundSuccess, petCreatedSuccess, petUpdatedSuccess, petDeletedSuccess, petsDeletedSuccess} = require("../api_responses/pet/pet_success");
const {findUserById} = require("../../mongodb/operations/user_operations");
const {userIdNotFoundError} = require("../api_responses/user/user_error");

module.exports.petModule = createModule({
    id: 'pet_module',
    dirname: __dirname,
    typeDefs: [
        gql`
            extend type Query {
                getPet(petId: ID!) : PetResponse
                getPets : PetsResponse
            }
            
            extend type Mutation {
                createPet(pet: PetInput!) : PetResponse
                updatePet(petId: ID!, updatedPet: PetInput!) : PetResponse
                deletePet(petId: ID!) : PetResponse
                deleteAllPets : PetsResponse
            }            
            
            type Pet {
                additionalInfo: String
                ageMonth: Int
                ageYear: Int
                breed: String
                canBeLeftAlone: Boolean
                description: String
                energyLevel: String
                feedingSchedule: String
                id: ID
                isFixed: Boolean
                isHouseBroken: Boolean
                isFriendlyToChildren: Boolean
                isFriendlyToOtherDogs: Boolean
                isFriendlyToOtherCats: Boolean
                isMicroChipped: Boolean
                medication: String
                medicationInstructions: String
                name: String
                pottySchedule: String
                type: String
                userId: String
                vetDetails: String
                weight: Float
            }
            
            input PetInput {
                additionalInfo: String
                ageMonth: Int
                ageYear: Int
                breed: String
                canBeLeftAlone: Boolean
                description: String
                energyLevel: String
                feedingSchedule: String
                isFixed: Boolean
                isHouseBroken: Boolean
                isFriendlyToChildren: Boolean
                isFriendlyToOtherDogs: Boolean
                isFriendlyToOtherCats: Boolean
                isMicroChipped: Boolean
                medication: String
                medicationInstructions: String
                name: String
                pottySchedule: String
                type: String
                vetDetails: String
                weight: Float
            }
            
            type PetResponse {
                success: Boolean
                message: String
                pet: Pet
            }
            
            type PetsResponse {
                success: Boolean
                message: String
                pets: [Pet]
            }
        `
    ],
    resolvers: {
        Query: {
            getPet: async (parent, {petId}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const pet = await findPet(petId);
                if (!pet) return petNotFoundError(petId);

                return petFoundSuccess(pet);
            },
            getPets: async (parent, {}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const userId = await decodeToken(context);
                if (!userId) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const pets = await findPets(user._id);
                if (!pets || pets.length === 0) return petsNotFoundError(userId);

                return petsFoundSuccess(userId, pets);
            }
        },
        Mutation: {
            createPet: async (parent, {pet}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const userId = await decodeToken(context);
                if (!userId) return jwtError();

                const user = await findUserById(userId);
                if (!user) return userIdNotFoundError(userId);

                const newPet = await createPet(userId, pet);

                return petCreatedSuccess(newPet);
            },
            updatePet: async (parent, {petId, updatedPet}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const pet = await findPet(petId);
                if (!pet) return petNotFoundError(petId);

                pet.additionalInfo = updatedPet.additionalInfo ? updatedPet.additionalInfo : pet.additionalInfo;
                pet.ageMonth = updatedPet.ageMonth ? updatedPet.ageMonth : pet.ageMonth;
                pet.ageYear = updatedPet.ageYear ? updatedPet.ageYear : pet.ageYear;
                pet.breed = updatedPet.breed ? updatedPet.breed : pet.breed;
                pet.canBeLeftAlone = updatedPet.canBeLeftAlone ? updatedPet.canBeLeftAlone : pet.canBeLeftAlone;
                pet.description = updatedPet.description ? updatedPet.description : pet.description;
                pet.energyLevel = updatedPet.energyLevel ? updatedPet.energyLevel : pet.energyLevel;
                pet.feedingSchedule = updatedPet.feedingSchedule ? updatedPet.feedingSchedule : pet.feedingSchedule;
                pet.isFixed = updatedPet.isFixed ? updatedPet.isFixed : pet.isFixed;
                pet.isHouseBroken = updatedPet.isHouseBroken ? updatedPet.isHouseBroken : pet.isHouseBroken;
                pet.isFriendlyToChildren = updatedPet.isFriendlyToChildren ? updatedPet.isFriendlyToChildren : pet.isFriendlyToChildren;
                pet.isFriendlyToOtherDogs = updatedPet.isFriendlyToOtherDogs ? updatedPet.isFriendlyToOtherDogs : pet.isFriendlyToOtherDogs;
                pet.isFriendlyToOtherCats = updatedPet.isFriendlyToOtherCats ? updatedPet.isFriendlyToOtherCats : pet.isFriendlyToOtherCats;
                pet.isMicroChipped = updatedPet.isMicroChipped ? updatedPet.isMicroChipped : pet.isMicroChipped;
                pet.medication = updatedPet.medication ? updatedPet.medication : pet.medication;
                pet.medicationInstructions = updatedPet.medicationInstructions ? updatedPet.medicationInstructions : pet.medicationInstructions;
                pet.name = updatedPet.name ? updatedPet.name : pet.name;
                pet.pottySchedule = updatedPet.pottySchedule ? updatedPet.pottySchedule : pet.pottySchedule;
                pet.type = updatedPet.type ? updatedPet.type : pet.type;
                pet.userId = updatedPet.userId ? updatedPet.userId: pet.userId;
                pet.vetDetails = updatedPet.vetDetails ? updatedPet.vetDetails : pet.vetDetails;
                pet.weight = updatedPet.weight ? updatedPet.weight : pet.weight;

                await updatePet(petId, updatedPet);

                return petUpdatedSuccess(petId, pet);
            },
            deletePet: async (parent, {petId}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const pet = await findPet(petId);
                if (!pet) return petNotFoundError(petId);

                await deletePet(petId);

                return petDeletedSuccess(petId, pet);
            },
            deleteAllPets: async (parent, {}, context) => {
                const authenticated = await authenticate(context);
                if (!authenticated) return jwtError();

                const userId = await decodeToken(context);
                if (!userId) return jwtError();

                const pets = await findPets(userId);
                if (!pets) return petsNotFoundError(userId);

                await deletePets(pets);

                return petsDeletedSuccess(userId, pets);
            }
        }
    }
});