import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row } from "reactstrap"; //import the Reactstrap Components
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Components/UserRegister";
import Login from "./Components/UserLogin";
import OwnerRegister from "./Components/OwnerRigester";
import OwnerLogin from "./Components/OwnerLogin";
import { useSelector } from "react-redux";
import UpdateTeachers from "./Components/UpdateTeachers";
import Profile from "./Components/Profile";
import AddTeachers from "./Components/AddTeachers"; // ✅ correct for default export
import Teachers from "./Components/Teachers";
import File from "./Components/File";
import Booking from "./Components/Booking";
import Posts from "./Components/Posts";
import UserTeachers from "./Components/UserTeachers";


const App = () => {
 
  const { user } = useSelector((state) => state.users);

  return (
    <Container fluid>
      <Router>
        <Row>
          {
            user? (<Header />) : null
          }
              
        </Row>
        <Row className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/UserRegister" element={<Register />} />
            <Route path="/UserLogin" element={<Login />} />
            <Route path="/OwnerRegister" element={<OwnerRegister />} />
            <Route path="/OwnerLogin" element={<OwnerLogin />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/AddTeachers" element={<AddTeachers />} />
            <Route path="/Teachers" element={<Teachers />} />
            <Route path="/File" element={<File />} />
            <Route path="/Booking" element={<Booking />} />
            <Route path="/Posts" element={<Posts />} />
            <Route path="/UserTeachers" element={<UserTeachers />} />
            <Route path="/UpdateTeachers/:email" element={<UpdateTeachers />} />
          </Routes>
        </Row>
        <Row>
        {
            user?
             (<Footer />) : null
          }
        </Row>
      </Router>
    </Container>
  );
};

export default App;
