const mongoose = require('mongoose');

const { Schema } = mongoose;

const checklistSchema = new Schema({
    passport: {
      type: Boolean,
      required: true,
    },
    homeInsurance: {
        type: Boolean,
        required: true,
    },
    autoInsurance: {
        type: Boolean,
        required: true,
    },
    medicalCard: {
        type: Boolean,
        required: true,
    },
    socialSecurityCard: {
        type: Boolean,
        required: true,
    },
    cash: {
        type: Boolean,
        required: true,
    },
    jacket: {
        type: Boolean,
        required: true,
    },
    username: {
        type: String,
        required: true
    }
  },
  {
    toJSON: {
        virtuals: true
    }
  }
);

const Checklist = mongoose.model('Checklist', checklistSchema);

module.exports = Checklist;