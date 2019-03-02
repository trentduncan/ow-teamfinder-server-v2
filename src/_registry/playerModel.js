import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const playerSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  skillRating: { type: Number },
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }],
  heroes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hero' }],
  email: { type: String }
});
// use email instead of username and use match: regex for emails

// playerSchema.set('toObject', {
//   transform: function(doc, ret) {
//     ret.id = ret._id;
//     delete ret._id;
//     delete ret.__v;
//     delete ret.password;
//   }
// });
playerSchema.methods.serialize = function() {
  return {
    id: this._id,
    username: this.username,
    skillRating: this.skillRating,
    roles: this.roles,
    heroes: this.heroes,
    email: this.email
  };
};

playerSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

playerSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

export default mongoose.model('Player', playerSchema);
