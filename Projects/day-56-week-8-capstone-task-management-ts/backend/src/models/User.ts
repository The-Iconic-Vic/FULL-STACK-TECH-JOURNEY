import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { sign, Secret, SignOptions } from 'jsonwebtoken';
import { IUser } from '../types';

export interface IUserDocument extends Document, Omit<IUser, 'id'> {
  comparePassword(enteredPassword: string): Promise<boolean>;
  getSignedJwtToken(): string;
}

const userSchema = new Schema<IUserDocument>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password
userSchema.methods.comparePassword = async function(enteredPassword: string): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password as string);
};

// Generate JWT token
userSchema.methods.getSignedJwtToken = function(): string {
  const secret = process.env.JWT_SECRET as Secret;
  const options = {
    expiresIn: process.env.JWT_EXPIRE || '30d'
  } as SignOptions;
  return sign(
    { id: this._id, email: this.email },
    secret,
    options
  );
};

export default mongoose.model<IUserDocument>('User', userSchema);