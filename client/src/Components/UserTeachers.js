import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa6";
import { getTeachers, liketeachers } from "../Features/TeacherSlice";
import { addTolist } from "../Features/ListSlice";
 

const Catalog = () => {
  const teacherslist = useSelector((state) => state.teachers.teachers);
  const user = useSelector((state) => state.users.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTeachers());
  }, [dispatch]);

  const liketeachers = (teacheremail) => {
    const teacherData = {
      teacheremail: teacheremail,
      useremail: user._email,
    };
    dispatch(liketeachers(teacherData));
    navigate("/home");
  };

  const handleAddToCart = (teacheremail) => {
    const teachers = teachers.find((t) => t._email === teacheremail);
    if (!teachers) return;

    dispatch(addToCart({ teacheremail: teachers.email, teacheremail }));
    window.alert(`"${teachers.teachername}" has been added to your cart.`);
  };

  return (
    <div className="catalog-container">
      {products.map((product) => (
        <div className="card" key={product._id}>
          <div className="like">
            <Link onClick={() => handleLikeProduct(product._id)}>
              <FaThumbsUp style={{ color: "#ffa500", cursor: "pointer" }} />
            </Link>
            {product.likes.count}
          </div>

          <div className="image-container">
            <img src={product.productImage} alt={product.productName} />
          </div>

          <h2 className="product-name">{product.productName}</h2>
          <p className="description">{product.productDiscribtion}</p>
          <p className="price">{product.productPrice} OMR</p>
          <p className="date">In Stock {product.productQuantity}</p>
          <p className="date">{moment(product.createdAt).fromNow()}</p>
          <button className="add-to-cart" onClick={() => handleAddToCart(product._id)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default Catalog;
