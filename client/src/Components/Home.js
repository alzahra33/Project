import { Row, Col } from "reactstrap";
import bg from "../Images/bg.png";
import Header from './Header'; 

const Home = () => {
  return (
    <>
     
      <Header />

      <Row className="d-flex align-items-center" style={{ height: "100vh", margin: 0 }}>
     
        <Col md="6" className="text-center p-5">
          <h1
            style={{
              fontSize: "8rem", 
              fontWeight: "bold",
              fontFamily: "Georgia, serif",
              color: "#2c3e50",
              letterSpacing: "2px",
              textTransform: "uppercase"
            }}
          >
            Private Tutor
          </h1>

          <p
            style={{
              fontSize: "2.5rem",
              fontFamily: "'Pacifico', cursive",
              color: "#007FFF"
            }}
          >
            Get yourself, and start your journey to excellence with us.
          </p>
        </Col>

        {/* Right side with background image */}
        <Col md="6" className="p-0">
          <div
            className="img-fluid"
            style={{
              backgroundImage: `url(${bg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "80vh",
              width: "100%"
            }}
          ></div>
        </Col>
      </Row>
    </>
  );
};

export default Home;
