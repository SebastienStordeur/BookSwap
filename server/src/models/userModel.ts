import mongoose, { Types, ObjectId } from "mongoose";
import bcrypt from "bcrypt";

interface User {
  _id: ObjectId;
  username: string;
  email: string;
  password: string;
  items: Types.ObjectId[];
  created_at: Date;
  updated_at: Date;
}

const userSchema = new mongoose.Schema<User>({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  items: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  updated_at: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

// Triggers only if the password is modified
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Triggers only if it requires a password check
userSchema.methods.validPassword = async function (
  userPassword: string,
  password: string
) {
  return await bcrypt.compare(userPassword, password);
};

const User = mongoose.model("User", userSchema);

export default User;
