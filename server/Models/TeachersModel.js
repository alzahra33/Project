import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  subject: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  coursePrice: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  likes: {
  count: { type: Number, default: 0 },
  users: [{ type: String }] // array of user emails or IDs who liked
}

});

const TeachersModel = mongoose.model("teachers", teacherSchema);
export default TeachersModel;
