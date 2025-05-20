import mongoose from "mongoose";

const OwnerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const OwnerModel = mongoose.model("owners", OwnerSchema);
export default OwnerModel;
