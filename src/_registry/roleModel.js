import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  imgPath: { type: String, required: true }
});

export default mongoose.model('Role', roleSchema);
