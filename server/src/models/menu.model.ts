import mongoose from "mongoose";

export interface IMenu {
  _id: mongoose.Schema.Types.ObjectId;
  name: String;
  description: String;
  price: Number;
  image: String;
}

export interface IMenuDocument extends IMenu, Document {
  createdAt: Date;
  updatedAt: Date;
}


const menuSchema = new mongoose.Schema<IMenuDocument>({
  name:{
    type:String,
    required:true,
  },
  description:{
    type:String,
    required:true
  },
  price:{
    type:String,
    required:true
  },
  image:{
    type:String,
    required:true,
  },
}, {timestamps:true});

export const Menu = mongoose.model("Menu", menuSchema);