import gql from 'graphql-tag';

// logging in a user with username and password
export const LOGIN_USER = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			token
			user {
				_id
				username
			}
		}
	}
`;

// creating a user
export const ADD_USER = gql`
	mutation addUser(
		$username: String!
		$email: String!
		$password: String!
	) {
		addUser(
			username: $username
			email: $email
			password: $password
		) {
			token
			user {
				_id
				username
			}
		}
	}
`;

// creating a checklist
export const ADD_CHECKLIST = gql`
	mutation addChecklist(
        $passport: Boolean!
        $homeInsurance: Boolean!
        $autoInsurance: Boolean!
        $medicalCard: Boolean!
        $socialSecurityCard: Boolean!
        $cash: Boolean!
        $jacket: Boolean!
        ) {
            addChecklist(
                passport: $passport
                homeInsurance: $homeInsurance
                autoInsurance: $autoInsurance
                medicalCard: $medicalCard
                socialSecurityCard: $socialSecurityCard
                cash: $cash
                jacket: $jacket
            ) {
                _id
                passport
                homeInsurance
                autoInsurance
                medicalCard
                socialSecurityCard
                cash
                jacket
			}
		}
`;

// editing a checklist
export const EDIT_CHECKLIST = gql`
	mutation editChecklist(
        $passport: Boolean!
        $homeInsurance: Boolean!
        $autoInsurance: Boolean!
        $medicalCard: Boolean!
        $socialSecurityCard: Boolean!
        $cash: Boolean!
        $jacket: Boolean!
        ) {
            editChecklist(
                passport: $passport
                homeInsurance: $homeInsurance
                autoInsurance: $autoInsurance
                medicalCard: $medicalCard
                socialSecurityCard: $socialSecurityCard
                cash: $cash
                jacket: $jacket
            ) {
                _id
                passport
                homeInsurance
                autoInsurance
                medicalCard
                socialSecurityCard
                cash
                jacket
			}
		}
`;