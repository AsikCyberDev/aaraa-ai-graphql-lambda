const {
    getProjectsByUserId,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
} = require('../../services/projectServiceClient');

const projectResolvers = {
    Query: {
        projects: async (_, { userId }) => await getProjectsByUserId(userId),
        project: async (_, { id, userId }) => await getProjectById(id, userId),
    },
    Mutation: {
        createProject: async (_, { input }) => {
            return await createProject(input);
        },
        updateProject: async (_, { id, userId, input }) => {
            return await updateProject(id, userId, input);
        },
        deleteProject: async (_, { id, userId }) => {
            return await deleteProject(id, userId);
        },
    },
};

module.exports = projectResolvers;
