const { gql } = require('apollo-server-express');

const typeDefs = gql`
# User typeDef to login/signup
    type User {
        _id: ID
        username: String
        email: String
        myChecklist: Checklist
    }
    type Checklist {
        _id: ID
        passport: Boolean
        homeInsurance: Boolean
        autoInsurance: Boolean
        medicalCard: Boolean
        socialSecurityCard: Boolean
        cash: Boolean
        jacket: Boolean
        username: String
    }
    type Query {
        me: User
        findChecklist(username: String!): Checklist
    }
    type Mutation {
        editChecklist(
            passport: Boolean!
            homeInsurance: Boolean!
            autoInsurance: Boolean!
            medicalCard: Boolean!
            socialSecurityCard: Boolean!
            cash: Boolean!
            jacket: Boolean!
            username: String!
        )
    }
`;

module.exports = typeDefs;