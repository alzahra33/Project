import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  subject: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  coursePrice: { type: Number, required: true },
  imageUrl: { type: String, required: true },
});

const TeachersModel = mongoose.model("teachers", teacherSchema);
export default TeachersModel;
