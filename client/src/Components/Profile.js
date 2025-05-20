import React from "react";
import { Container, Row, Col, Card, CardBody, CardTitle, CardText } from "reactstrap";
import Counter from "./Counter"; // Make sure this path is correct

const Profile = () => {
  return (
    <Container className="mt-5">
      {/* Project Description */}
      <Row className="mb-4">
        <Col md={12}>
          <Card
            className="shadow"
            style={{
              backgroundColor: "#e3f2fd",
              borderLeft: "6px solid #2196f3",
            }}
          >
            <CardBody>
              <CardTitle tag="h4" style={{ color: "#0d47a1" }}>
                💻 Student Mini Project
              </CardTitle>
              <CardText style={{ fontSize: "1rem", color: "#333" }}>
                This project was developed by students as part of the Full Stack Web Development course.
                It helped us learn modern web technologies like React, Redux Toolkit, and RESTful APIs.
                We also enhanced our teamwork and real-world development experience.
              </CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Profile Card */}
      <Row className="mb-4">
        <Col md={{ size: 6, offset: 3 }}>
          <Card
            className="text-center shadow"
            style={{
              backgroundColor: "#fce4ec",
              borderRadius: "12px",
              border: "1px solid #ec407a",
            }}
          >
            <CardBody>
              <CardTitle tag="h5" style={{ color: "#880e4f", fontWeight: "bold" }}>
                👤 TT Profile
              </CardTitle>

              <img
                src="https://via.placeholder.com/150"
                alt="teachers logo"
                style={{ width: "150px", borderRadius: "50%", margin: "10px 0" }}
              />

              <CardText style={{ fontSize: "1.1rem" }}>
                <strong>Name:</strong> Alzahra Alabri
              </CardText>
              <CardText style={{ fontSize: "1.1rem" }}>
                <strong>Student ID:</strong> 26j2180
              </CardText>

              <CardText style={{ fontSize: "1.1rem" }}>
                <strong>Name:</strong> Fatma Alrawahi
              </CardText>
              <CardText style={{ fontSize: "1.1rem" }}>
                <strong>Student ID:</strong> 26s1854
              </CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Counter Card */}
      <Row>
        <Col md={{ size: 6, offset: 3 }}>
          <Card className="text-center shadow" style={{ padding: "1rem" }}>
            <CardBody>
              <CardTitle tag="h5" style={{ fontWeight: "bold" }}>
                🧮 Interactive Counter
              </CardTitle>
              <Counter initialCount={0} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
