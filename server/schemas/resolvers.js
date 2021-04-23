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
					.populate('myChecklist')
				return userData;
			}
			throw new AuthenticationError('Not logged in');
		},
		// get all palettes by username
        findChecklist: async (parent, { username }) => {
			const params = username ? { username } : {};
			return Checklist.findOne(params);
		},
    },
    Mutation: {
		// create user
        addUser: async (parent, args) => {
			const user = await User.create(args);
			const token = signToken(user);
			return { token, user };
		},
		addGoogleUser: async (parent, args) => {
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
		// create checklist
		addChecklist: async (parent, args, context) => {
			if (context.user) {
				const checklist = await Checklist.create({
					...args,
					username: context.user.username,
                });
                const id = checklist._id;
				await User.findByIdAndUpdate(
                    { _id: context.user._id },
					{ $push: { myChecklist: id } },
					{ new: true }
                );
                console.log({checklist});
				return checklist;
			}
			throw new AuthenticationError(
				'You need to be logged in to create a checklist!'
			);
		},
		// edit checklist
		editChecklist: async (parent, args, context) => {
			if (context.user) {
				const filter = {username: context.user.username}
				const update = {...args}
				const checklist = await Checklist.findOneAndUpdate(filter, update, {
					returnOriginal: false
				})
                console.log({checklist});
				return checklist;
			}
			throw new AuthenticationError(
				'You need to be logged in to edit a checklist!'
			);
		},
    }
};
module.exports = resolvers;