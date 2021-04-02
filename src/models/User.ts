import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema<IUser>({
  email: String,
  password: String,
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

export interface IUser extends Document {
  email: string;
  password: string;
  id?: string;

  comparePassword(password: string): boolean;
}

export default model<IUser>("User", userSchema);
