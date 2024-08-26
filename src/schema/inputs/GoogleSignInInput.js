const { gql } = require('apollo-server-lambda');

module.exports = gql`
  input GoogleSignInInput {
  googleId: String!
  token: String!
}

`;
