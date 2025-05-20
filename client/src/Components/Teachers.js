import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa6";
import { getTeachers, liketeachers } from "../Features/TeacherSlice";
import { AddTeachers } from "../Features/teacherSlice";


const Catalog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const teachers = useSelector((state) => state.teachers.teachers);
  const user = useSelector((state) => state.users.user);

  useEffect(() => {
    dispatch(getTeachers());
  }, [dispatch]);

  const handleliketeachers = (teacherId) => {
    if (!user) return navigate("/UserLogin");
    const teachertData = {
      teacheremail: teacherId,
      useremail: user._email,
    };
    dispatch(liketeachers(teachertData));
    navigate("/");
  };

  const handleAddToBook = (teacherId) => {
    if (!user) return navigate("/UserLogin");
    const selectedTeacher = teachers.find((t) => t._id === teacherId);
    if (!selectedTeacher) return;

    dispatch(addToCart({ userId: user._id, productId: teacherId }));
    window.alert(`${selectedTeacher.teacherName} has been added to your cart`);
  };

  return (
    <div className="catalog-container">
      {teachers.map((teacher) => (
        <div className="card" key={teacher._id}>
          <div className="like">
            <Link onClick={() => handleliketeachers(teacher._id)}>
              <FaThumbsUp style={{ color: "#ffa500", cursor: "pointer" }} />
            </Link>
            <span>{teacher.likes?.count || 0}</span>
          </div>

          <div className="image-container">
            <img src={teacher.productImage} alt={teacher.productName} />
          </div>

          <h2 className="teachers-name">{teacher.teacherName}</h2>
          <p className="email">{teacher.teacherEmail}</p>
          <p className="price">{teacher.coursePrice} OMR</p>
          <p className="subject">{teacher.subject}</p>
          <p className="date">{moment(teacher.createdAt).fromNow()}</p>

          <button className="add-to-cart" onClick={() => handleAddToBook(teacher._id)}>
            Add to Book
          </button>
        </div>
      ))}
    </div>
  );
};

export default Catalog;
