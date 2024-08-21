const { gql } = require('apollo-server-lambda');

module.exports = gql`
  type MetaColor {
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
