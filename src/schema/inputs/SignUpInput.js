const { gql } = require('apollo-server-lambda');

module.exports = gql`
  input SignUpInput {
    name: String!
    email: String!
    mobile: String!
    address: String!
    sex: String!
    password: String!
  }
`;
