const { createUser, findUserByEmail, validatePassword } = require('../../services/userServiceClient');
const { generateToken } = require('../../utils/tokenUtils');

const userResolvers = {
    Mutation: {
        signUp: async (_, { input }) => {
            const newUser = await createUser(input);
            const token = generateToken(newUser.id); // Assuming you have a function to generate JWT tokens
            return { ...newUser, token };
        },
        signIn: async (_, { input }) => {
            const user = await findUserByEmail(input.email);
            if (!user || !(await validatePassword(input.password, user.password))) {
                throw new Error('Invalid credentials');
            }
            const token = generateToken(user.id);
            return { ...user, token };
        },
        // Other mutations...
    },
    Query: {
        user: async (_, { id }) => {
            return await getUserById(id); // Implement this in userServiceClient
        },
        // Other queries...
    }
};

module.exports = userResolvers;
