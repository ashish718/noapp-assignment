const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name:{
    type: String
  },
  phone:{
    type:Number
  },
  email:{
    type:String
  },
  linkedin_url:{
    type:String
  },
  created_at:{
    type:Date
  },
  updated_at:{
    type:Date
  }
});

module.exports = mongoose.model('contactDetail', contactSchema)
