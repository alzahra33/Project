import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookbyuser } from "../Features/BookTeachSlice";


const Teachers = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const { BookHistory, loading } = useSelector((state) => state.Book);

  useEffect(() => {
    if (user?._id) {
      dispatch(getBookbyuser(user._id));
    }
  }, [user, dispatch]);

  if (loading) return <p>Loading Book...</p>;
  if (!BookHistory?.length) return <p>No Book history found.</p>;

  return (
    <div className="orders-container">
      {BookHistory.map((Book) => (
        <div className="Book-card" key={Book._id}>
          <h2 className="Book-title">Book Information</h2>
          <p><strong>Name :</strong> {Book.fullName}</p>
          <p><strong>Email :</strong> {Book.email}</p>
         

          <table className="Book-table">
            <thead>
              <tr>
                
                <th>Name</th>
                <th>email</th>
              </tr>
            </thead>
            <tbody>
              {Book.teachers.map((teachers, index) => (
                <tr key={index}>
                  <td>{teachers.name}</td>
                  <td>{teachers.email}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>

          <div className="Book">
            <span><strong>Total :</strong> {Book.BookTotal.toFixed(2)} OMR</span>
            <span><strong>Number of Book :</strong> {Book.totalBook}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Teachers;
