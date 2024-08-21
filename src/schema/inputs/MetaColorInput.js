const { gql } = require('apollo-server-lambda');

module.exports = gql`
  input MetaColorInput {
    isValid: Boolean!
    r: Int!
    g: Int!
    b: Int!
    a: Float!
    _h: Float!
    _s: Float!
    _v: Float!
  }
`;
