import mongoose, { Document, Schema } from "mongoose";


interface User extends Document {
  name: string;
  email: string;
  password: string;
  is_admin: number;
}

// Define the user schema
const userSchema: Schema<User> = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, 
  },
  password: {
    type: String,
    required: true,
  },
  is_admin: {
    type: Number,
    required: true,
    default: 0,
  },
});

// Export the user model
const UserModel = mongoose.model<User>("User", userSchema);

export default UserModel;
