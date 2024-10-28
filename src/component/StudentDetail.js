import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Card, Badge } from "react-bootstrap";

const StudentDetail = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudentDetail = async () => {
      try {
        const response = await axios.get(`https://student-api-nestjs.onrender.com/students/${id}`);
        setStudent(response.data.data); 
      } catch (error) {
        console.error("Error fetching student detail:", error);
      }
    };

    fetchStudentDetail();
  }, [id]);

  return (
    <Container className="mt-4">
      {student ? (
        <Card>
          <Card.Header>Student Detail</Card.Header>
          <Card.Body>
            <Card.Title>{student.name}</Card.Title>
            <Card.Text>
              <strong>Code:</strong> {student.studentCode}
            </Card.Text>
            <Badge bg={student.isActive ? "info" : "secondary"}>
              {student.isActive ? "Active" : "In-active"}
            </Badge>
          </Card.Body>
        </Card>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
};

export default StudentDetail;
