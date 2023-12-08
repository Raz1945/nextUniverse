const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    roles: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true } // __v: agrega la fecha de creación y actualización
);

module.exports = mongoose.model('user', userSchema);

// todo --> definir roles
