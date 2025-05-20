import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  bookTeacher,
  getUserBookings,
  cancelBooking,
  clearBookTeachError,
} from "../features/bookTeach/bookTeachSlice";

const BookTeachPage = () => {
  const dispatch = useDispatch();
  const { bookings, status, error } = useSelector((state) => state.bookTeach);
  // Assuming you have an auth slice with user info
  const userId = useSelector((state) => state.auth.user?.id);

  useEffect(() => {
    if (userId) {
      dispatch(getUserBookings(userId));
    }
  }, [dispatch, userId]);

  const handleBook = (teacherId) => {
    dispatch(bookTeacher({ userId, teacherId }));
  };

  const handleCancel = (teacherId) => {
    dispatch(cancelBooking({ userId, teacherId }));
  };

  const handleClearError = () => {
    dispatch(clearBookTeachError());
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Teacher Bookings</h1>

      {error && (
        <div className="bg-red-100 text-red-800 p-2 mb-4 rounded">
          <p>{error}</p>
          <button
            onClick={handleClearError}
            className="mt-2 text-sm underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {status === "loading" && <p>Loading...</p>}

      {status === "succeeded" && bookings.length === 0 && (
        <p>You have no bookings yet.</p>
      )}

      {status === "succeeded" && bookings.length > 0 && (
        <ul className="space-y-2">
          {bookings.map((booking) => (
            <li
              key={booking.teacherId}
              className="p-4 border rounded flex justify-between items-center"
            >
              <div>
                <p className="font-medium">Teacher ID: {booking.teacherId}</p>
                <p className="text-sm text-gray-600">
                  Booked on: {new Date(booking.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => handleCancel(booking.teacherId)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Cancel
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Example list of teachers to book against */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Available Teachers</h2>
        {/* This should ideally come from a getTeachers API call */}
        {["teacher1", "teacher2", "teacher3"].map((tid) => (
          <button
            key={tid}
            onClick={() => handleBook(tid)}
            className="mr-2 mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Book {tid}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BookTeachPage;