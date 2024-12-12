import mongoose from "mongoose";

export interface IUser {
  fullname:String;
  email:String;
  password:String;
  contact:String;
  address:String;
  city:String;
  country:String;
  profilePicture:String;
  admin:Boolean;
  lastLogin?: Date;
  isVerified?: Boolean;
  resetPasswordToken?:String;
  resetPasswordTokenExpiresAt?:Date;
  verificationToken?:String;
  verificationTokenExpiresAt?:Date;
}

export interface IUserDocument extends IUser, Document{
  createdAt:Date;
  updatedAt:Date;
}

const userSchema = new mongoose.Schema<IUserDocument>(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    contact: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      default: "Update your address",
    },
    city: {
      type: String,
      default: "Update your city",
    },
    country: {
      type: String,
      default: "Update your country",
    },
    profilePicture: {
      type: String,
      default: "",
    },
    admin: {
      type: Boolean,
      default: false,
    },
    // Advanced Authentication
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordTokenExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);