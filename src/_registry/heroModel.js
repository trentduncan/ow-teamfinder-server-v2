import mongoose from 'mongoose';

const heroSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  imgPath: { type: String, required: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' }
});

export default mongoose.model('Hero', heroSchema);
