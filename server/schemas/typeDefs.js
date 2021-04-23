const { gql } = require('apollo-server-express');

const typeDefs = gql`
# User typeDef to login/signup
    type User {
        _id: ID
        username: String
        email: String
        myChecklist: [Checklist]
        googleUser: Boolean
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
    # authentication for user logging in/logging out
    type Auth {
        token: ID!
        user: User
    }
    type Query {
        me: User
        findChecklist(username: String!): Checklist
    }
    type Mutation {
        login(username: String!, password: String!): Auth
        addUser(
            username: String!
            email: String!
            password: String!
        ): Auth
        addGoogleUser(
            username: String!
            email: String!
            password: String!
            googleUser: Boolean!
        ): Auth
        addChecklist(
            passport: Boolean!
            homeInsurance: Boolean!
            autoInsurance: Boolean!
            medicalCard: Boolean!
            socialSecurityCard: Boolean!
            cash: Boolean!
            jacket: Boolean!
        ): Checklist
        editChecklist(
            passport: Boolean!
            homeInsurance: Boolean!
            autoInsurance: Boolean!
            medicalCard: Boolean!
            socialSecurityCard: Boolean!
            cash: Boolean!
            jacket: Boolean!
        ): Checklist
    }
`;

module.exports = typeDefs;