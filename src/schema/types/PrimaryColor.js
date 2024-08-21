const { gql } = require('apollo-server-lambda');

module.exports = gql`
  type PrimaryColor {
    cleared: Boolean!
    metaColor: MetaColor!
  }
`;
