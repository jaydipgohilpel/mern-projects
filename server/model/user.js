import mongoose, { Schema } from "mongoose";
import Joi from 'joi';

export const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  roll: Joi.string().required(),
  email: Joi.string().pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).required(),
  phone: Joi.string().min(3).max(10).required(),
});

const userSchema = new Schema({
  name: { type: String, maxLength: 30, required: true},
  roll: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: (v) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v),
      message: (props) => `${props.value} is not a valid email.`,
    },
    required: true
  },
  phone: { type: String, maxLength: 10, required: true },
});

export default mongoose.model('user', userSchema);