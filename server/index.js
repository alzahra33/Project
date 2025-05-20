import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";

// Import models
import OwnerModel from "./Models/OwnerModel.js";
import UserModel from "./Models/UserModel.js";
import TeachersModel from "./Models/TeachersModel.js";
import PostModel from "./Models/PostModel.js";

import dotenv from "dotenv";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

// const PORT = process.env.PORT || 5000;
const PORT = 3001;



mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`Server is connected on port ${PORT}`);
});

// ========================== AUTH ROUTES =============================== //

// ✅ Owner Register
app.post("/OwnerRegister", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(`email: ${email}`)
    const hashedPassword = await bcrypt.hash(password, 10);
    //const owners = new OwnerModel({ email, password: hashedPassword });
    const owners = new OwnerModel({ email, password });
      //  console.log(`${owners} - ${msg} before`)

    await owners.save();
  //  console.log(`${owners} - ${msg} Owner registered successfully`)
    res.status(200).send({ owners, msg: "Owner registered successfully" });
  } catch (error) {
    res.status(400).json({ error: "Unexpected error occurred" });
  }
});

// ✅ Owner Login
app.post("/OwnerLogin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const owners = await OwnerModel.findOne({ email });
    if (!owners) return res.status(404).json({ msg: "Owner not found" });

    const isMatch = await bcrypt.compare(password, owners.password);
    if (!isMatch) return res.status(401).json({ msg: "Password is incorrect" });

    res.status(200).json({ owners, msg: "Login successful" });
  } catch (error) {
    res.status(500).json({ msg: "Unexpected error occurred" });
  }
});

// ✅ User Register
app.post("/UserRegister", async (req, res)=>{
  try{
    const {email,password} = req.body
    const users = UserModel({email,password})
    await users.save()
    res.send({ users: users, msg: " User Added succssfly." });
  }
  catch(error){
    res.status(400).json({ error: "An error occurred" });
  }
})

// ✅ User Login
app.post("/UserLogin", async (req, res) => { 
  try { 
    const { email, password } = req.body;
  
    const users = await UserModel.findOne({ email: email });

    if (!users) { 
      res.status(500).send({ msg: " Couldn't find the user" });
      
    }
    else if (users.password !== password) {
      res.status(500).json({ msg: "Password is incorrect" });
      
    }
    else {
      res.send({users: users,msg:"Authentication is  successfull"})
    }
  }
  catch (error) { 
    res.status(500).json({error:"An unexpected error occurred"})
  }
})

//logout
app.post("/logout", async (req, res) => {
  res.send({ msg: "logout successful" })
 })

// ========================== TEACHER ROUTES =============================== //

// ✅ Add Teacher
app.post("/AddTeachers", async (req, res) => {
  try {
    console.log("Incoming data:", req.body);

    const { email, name, subject, phoneNumber, coursePrice, imageUrl } = req.body;

    const teacher = new TeachersModel({
      email,
      name,
      subject,
      phoneNumber,
      coursePrice: Number(coursePrice), // ensure it's a number
      imageUrl
    });

    await teacher.save();

    res.send({ teachers: teacher, msg: "Added." });
  } catch (error) {
    console.error("Server Error:", error);

    if (error.code === 11000) {
      return res.status(400).json({ error: "Email already exists." });
    }

    res.status(500).json({ error: "An error occurred" });
  }
});






app.get("/getTeachers", async (req, res) => {
  try {
    // Fetch all posts from the "PostModel" collection, sorted by createdAt in descending order
    const teachers = await TeachersModel.find({}).sort({ createdAt: -1 });

    const countteachers = await TeachersModel.countDocuments({});

    res.send({ teachers: teachers, count: countteachers});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.post("/addToteacher", async (req, res) => {
  const { users, email } = req.body;
  try {
    let teachers = await TeachersModel.findOne({ email });

    if (teachers) {
      const teachers = cart.teachers.findIndex(t => t.email == email);

      if (teachers !== -1) {
        cart.teachers[teachers].quantity += 1;
      } else {
        cart.teachers.push({ email, quantity: 1 });
      }

    } else {
      teachers = new TeachersModel({ users, teachers: [{ email, quantity: 1 }] });
    }

    await teachers.save();
    res.json({ teachers, msg: "Product added to teachers." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not add to teachers" });
  }
  
  
});

// ✅ Update Teacher by Email
app.put("/teachers/:email", async (req, res) => {
  const { email } = req.params;
  const { name, subject, phoneNumber, imageUrl, coursePrice } = req.body;

  try {
    const teacher = await TeachersModel.findOne({ email });
    if (!teacher) return res.status(404).json({ error: "Teacher not found" });

    teacher.name = name || teacher.name;
    teacher.subject = subject || teacher.subject;
    teacher.phoneNumber = phoneNumber || teacher.phoneNumber;
    teacher.imageUrl = imageUrl || teacher.imageUrl;
    teacher.coursePrice = coursePrice || teacher.coursePrice;

    const updatedTeacher = await teacher.save();
    res.status(200).json({ teacher: updatedTeacher, msg: "Updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete Teacher by ID
app.delete("/deleteTeachers/:id", async (req, res) => {
  try {
    const deletedTeacher = await TeachersModel.findByIdAndDelete(req.params.id);
    if (!deletedTeacher) {
      return res.status(404).json({ success: false, message: "Teacher not found" });
    }
    res.status(200).json({ success: true, message: "Teacher deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ Get All Teachers
app.get("/teachers", async (req, res) => {
  try {
    const teachers = await TeachersModel.find({}).sort({ createdAt: -1 });
    const countteachers = await TeachersModel.countDocuments({});
    res.send({ teachers, count: countteachers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

// ========================== POST ROUTES =============================== //

// ✅ Save Post
app.post("/posts", async (req, res) => {
  try {
    const { postMsg, email } = req.body;

    const post = new PostModel({ postMsg, email });
    await post.save();

    res.send({ post, msg: "Post added." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

// ✅ Get All Posts
app.get("/posts", async (req, res) => {
  try {
    const posts = await PostModel.find({}).sort({ createdAt: -1 });
    const countPost = await PostModel.countDocuments({});
    res.send({ posts, count: countPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

// ✅ Like/Unlike Post
app.put("/posts/like/:postId", async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(postId);
    if (!post) return res.status(404).json({ msg: "Post not found." });

    const hasLiked = post.likes.users.includes(userId);

    const update = hasLiked
      ? {
          $inc: { "likes.count": -1 },
          $pull: { "likes.users": userId },
        }
      : {
          $inc: { "likes.count": 1 },
          $addToSet: { "likes.users": userId },
        };

    const updatedPost = await PostModel.findByIdAndUpdate(postId, update, { new: true });

    res.json({ post: updatedPost, msg: hasLiked ? "Post unliked." : "Post liked." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});
