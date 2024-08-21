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
        project: async (_, { id }) => await getProjectById(id),
    },
    Mutation: {
        createProject: async (_, { input }) => {
            return await createProject(input);
        },
        updateProject: async (_, { id, input }) => {
            return await updateProject(id, input);
        },
        deleteProject: async (_, { id }) => {
            return await deleteProject(id);
        },
    },
};

module.exports = projectResolvers;
