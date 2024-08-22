const { gql } = require('apollo-server-lambda');

module.exports = gql`
  input GoogleSignUpInput {
  name: String!
  email: String!
  googleId: String!
  token: String!  # The ID token from Google
}
`;
