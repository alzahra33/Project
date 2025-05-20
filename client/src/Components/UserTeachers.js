import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { FaThumbsUp } from 'react-icons/fa6';

import { getTeachers, liketeachers } from '../Features/TeacherSlice';
import { addTolist } from '../Features/ListSlice';

const ListTeachers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const teachers = useSelector((state) => state.teachers.teachers);
  const user = useSelector((state) => state.users.user);

  useEffect(() => {
    dispatch(getTeachers());
  }, [dispatch]);

  const handleLikeTeacher = (teacherId) => {
    const teacherData = {
      teacherId,
      userEmail: user.email,
    };
    dispatch(liketeachers(teacherData));
    navigate('/home');
  };

 const handleAddToList = (teacherId) => {
  const teacherItem = teachers.find((t) => t._id === teacherId);
  if (!teacherItem) return;

  dispatch(
    addTolist({
      useremail: user.email,
      teacheremail: teacherItem.email,
    })
  );
  window.alert(`"${teacherItem.teacherName}" has been added to your list.`);
};

  return (
    <div className="catalog-container">
      {teachers.map((teacher) => (
        <div className="card" key={teacher._id}>
          <div className="like">
            <Link onClick={() => handleLikeTeacher(teacher._id)}>
              <FaThumbsUp style={{ color: '#ffa500', cursor: 'pointer' }} />
            </Link>
            {teacher.likes?.count ?? 0}
          </div>

          <div className="image-container">
            <img
              src={teacher.teacherImage}
              alt={teacher.teacherName}
            />
          </div>

          <h2 className="teacher-name">{teacher.teacherName}</h2>
          <p className="description">{teacher.productDescription}</p>
          <p className="price">{teacher.productPrice} OMR</p>
          <p className="quantity">In Stock: {teacher.teacherQuantity}</p>
          <p className="date">{moment(teacher.createdAt).fromNow()}</p>
          <button
            className="add-to-list"
            onClick={() => handleAddToList(teacher._id)}
          >
            Add to list
          </button>
        </div>
      ))}
    </div>
  );
};

export default ListTeachers;
