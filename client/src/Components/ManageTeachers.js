import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import moment from "moment";
import { getTeachers, deleteTeachers } from "../Features/TeacherSlice";
import { FaTrash } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";


const ManageTeachers = () => {
  const teachers = useSelector((state) => state.teachers.teachers);
  const users = useSelector((state) => state.users.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTeachers());
  }, [dispatch]);

  return (
    <div className="catalog-container">
      {teachers.map((teachers) => (
        <div className="card" key={teachers._id}>
          <div className="image-container">
            <img src={teachers.teachersImage} alt={teachers.teachersName} />
          </div>

          <h2 className="product-name">
            {teachers.teachersName}
          </h2>
          <p className="description">email | {teachers.teachersemail}</p>
          <p className="description">{teachers.teachersName}</p>
          <p className="price">{teachers.coursePrice} OMR</p>
          <p className="date">{moment(teachers.createdAt).fromNow()}</p>

          {/* أيقونات التعديل والحذف جنبًا إلى جنب */}
          <div className="action-buttons">
            <FiEdit
              className="edit-icon"
              onClick={() => navigate(`/update-product/${teachers._id}`)}
              title="Edit Product"
            />
            <button
              className="delete-button"
              onClick={() => {
                if (window.confirm("Are you sure you want to delete this product?")) {
                  dispatch(deleteTeachers(teachers._id));
                }
              }}
              title="Delete Product"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManageTeachers;
