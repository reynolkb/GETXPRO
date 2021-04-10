
import gql from 'graphql-tag';

// query the logged in user
export const QUERY_ME = gql`
	{
		me {
			_id
			username
			email
			myChecklist {
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
	}
`;

export const QUERY_CHECKLIST = gql `
	query findChecklist($username: String!) {
		findChecklist(username: $username) {
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