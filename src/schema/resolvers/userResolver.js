const { createUser, findUserByEmail, validatePassword } = require('../../services/userServiceClient');
const { generateToken } = require('../../utils/tokenUtils');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('YOUR_GOOGLE_CLIENT_ID');  // Replace with your Google Client ID

async function verifyGoogleToken(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: 'YOUR_GOOGLE_CLIENT_ID',  // Replace with your Google Client ID
    });
    const payload = ticket.getPayload();
    return payload;
}

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
        googleSignUp: async (_, { input }) => {
            const googlePayload = await verifyGoogleToken(input.token);

            // Check if the user already exists
            let user = await findUserBySocialId(googlePayload.sub, 'google');
            if (user) {
                throw new Error('User already exists with this Google account');
            }

            const newUser = await createUser({
                name: googlePayload.name,
                email: googlePayload.email,
                googleId: googlePayload.sub,
                socialProvider: 'google',
                // other necessary fields...
            });
            const token = generateToken(newUser.id);
            return { ...newUser, token };
        },
        googleSignIn: async (_, { input }) => {
            const googlePayload = await verifyGoogleToken(input.token);

            // Find the user by Google ID
            let user = await findUserBySocialId(googlePayload.sub, 'google');
            if (!user) {
                throw new Error('User not found, please sign up first');
            }

            const token = generateToken(user.id);
            return { ...user, token };
        },
    },
    Query: {
        user: async (_, { id }) => {
            return await getUserById(id); // Implement this in userServiceClient
        },
        // Other queries...
    }
};

module.exports = userResolvers;
