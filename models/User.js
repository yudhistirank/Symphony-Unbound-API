import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  ending_1: { type: Boolean, default: false },
  ending_2: { type: Boolean, default: false },
  ending_3: { type: Boolean, default: false },
  butterfly:{ type: Number, default: 0 }
});

export default mongoose.model('User', userSchema);
