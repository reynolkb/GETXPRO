// imports
const { AuthenticationError } = require('apollo-server-express');
const { User, Checklist } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
    Query: {
		// loggedIn user query to get user info
        me: async (parent, args, context) => {
			if (context.user) {
				const userData = await User.findOne({
					_id: context.user._id,
				})
					.select('-__v -password')
				return userData;
			}

			throw new AuthenticationError('Not logged in');
		},
		// get all palettes by username
        findChecklist: async (parent, { username }) => {
			const params = username ? { username } : {};
			return Checklist.findOne(params);
		},
		// stripe checkout
		checkout: async (parent, {name}, context) => {
			const url = new URL(context.headers.referer).origin;
			const tier = await DonationTier.findOne({name});
			
			const line_items = [];

			// generate product id
			const product = await stripe.products.create({
				name: tier.name,
				description: tier.description
			});

			// generate price id using the product id
			const price = await stripe.prices.create({
				product: product.id,
				unit_amount: tier.price * 100,
				currency: 'usd',
			});

			// add price id to the line items array
			line_items.push({
				price: price.id,
				quantity: 1
			});

			// session variable which controls success redirect and back functionality
			const session = await stripe.checkout.sessions.create({
				payment_method_types: ['card'],
				line_items,
				mode: 'payment',
				success_url: `${url}/`,
				cancel_url: `${url}/donation`
			});
			  
			return { session: session.id }; 
		}
    },
    Mutation: {
		// create user
        addUser: async (parent, args) => {
			const user = await User.create(args);
			const token = signToken(user);

			return { token, user };
		},
		// login user with username and password
		login: async (parent, { username, password }) => {
			const user = await User.findOne({ username });

			if (!user) {
				throw new AuthenticationError(
					'Incorrect credentials'
				);
			}

			const correctPw = await user.isCorrectPassword(
				password
			);

			if (!correctPw) {
				throw new AuthenticationError(
					'Incorrect credentials'
				);
			}

			const token = signToken(user);
			return { token, user };
		},
    }
};

module.exports = resolvers;