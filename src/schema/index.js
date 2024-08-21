const { gql } = require('apollo-server-lambda');

// Enums
const ChatbotStatus = require('./enums/ChatbotStatus');
const ChatbotType = require('./enums/ChatbotType');

// Types
const MetaColor = require('./types/MetaColor');
const PrimaryColor = require('./types/PrimaryColor');
const ChatIcon = require('./types/ChatIcon');
const TrainingData = require('./types/TrainingData');
const ApiKey = require('./types/ApiKey');
const Chatbot = require('./types/Chatbot');
const User = require('./types/User');
const Project = require('./types/Project');
const Document = require('./types/Document');

// Inputs
const MetaColorInput = require('./inputs/MetaColorInput');
const PrimaryColorInput = require('./inputs/PrimaryColorInput');
const ChatIconInput = require('./inputs/ChatIconInput');
const TrainingDataInput = require('./inputs/TrainingDataInput');
const CreateChatbotInput = require('./inputs/CreateChatbotInput');
const CreateUserInput = require('./inputs/CreateUserInput');
const UpdateUserInput = require('./inputs/UpdateUserInput');
const SignUpInput = require('./inputs/SignUpInput');
const SignInInput = require('./inputs/SignInInput');
const CreateProjectInput = require('./inputs/CreateProjectInput');
const UpdateProjectInput = require('./inputs/UpdateProjectInput');
const CreateDocumentInput = require('./inputs/CreateDocumentInput');
const CreateApiKeyInput = require('./inputs/CreateApiKeyInput');
const UpdateChatbotInput = require('./inputs/UpdateChatbotInput');

// Queries and Mutations
const Query = require('./queries');
const Mutation = require('./mutations');

const typeDefs = gql`
  ${ChatbotStatus}
  ${ChatbotType}

  ${MetaColor}
  ${PrimaryColor}
  ${ChatIcon}
  ${TrainingData}
  ${ApiKey}
  ${Chatbot}
  ${User}
  ${Project}
  ${Document}

  ${MetaColorInput}
  ${PrimaryColorInput}
  ${ChatIconInput}
  ${TrainingDataInput}
  ${CreateChatbotInput}
  ${CreateUserInput}
  ${UpdateUserInput}
  ${SignUpInput}
  ${SignInInput}
  ${CreateProjectInput}
  ${UpdateProjectInput}
  ${CreateDocumentInput}
  ${CreateApiKeyInput}
  ${UpdateChatbotInput}

  ${Query}
  ${Mutation}
`;

module.exports = typeDefs;
