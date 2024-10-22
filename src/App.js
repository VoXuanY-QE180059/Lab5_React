import React from "react";
import { Button, Table, Form, Row, Col, Badge, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ControllerStudent from "./component/ControllerStudent";
import './App.css';

function App() {
  return (
    <ControllerStudent>
      {({
        students,
        selectedCount,
        newStudent,
        setNewStudent,
        selectedStudents,
        addStudent,
        updateStudent,
        deleteStudent,
        handleSelect,
        clearStudents,
        showModal,
        openUpdateModal,
        closeModal,
        editingStudent,
        setEditingStudent,
        currentPage,
        totalPages,
        goToPreviousPage,
        goToNextPage,
      }) => (
        <div className="container mt-4">
          <h4>Total Selected Student: {selectedCount}</h4>

          <Form className="mb-3">
            <Row>
              <Col xs={12} sm={6}>
                <Form.Control
                  type="text"
                  placeholder="Student Name"
                  value={newStudent.name}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, name: e.target.value })
                  }
                />
              </Col>
              <Col xs={12} sm={6}>
                <Form.Control
                  type="text"
                  placeholder="Student Code"
                  value={newStudent.code}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, code: e.target.value })
                  }
                />
              </Col>
            </Row>

            <Row className="mt-2">
              <Col xs="auto">
                <Form.Check
                  type="checkbox"
                  label="Still Active"
                  checked={newStudent.active}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, active: e.target.checked })
                  }
                />
              </Col>

              <Col xs="auto">
                <Button variant="primary" onClick={addStudent}>
                  Add
                </Button>
              </Col>
              <Col xs="auto">
                <Button variant="outline-primary" onClick={clearStudents}>
                  Clear
                </Button>
              </Col>
            </Row>
          </Form>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Select</th>
                <th>Student Name</th>
                <th>Student Code</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>
                    <Form.Check
                      type="checkbox"
                      checked={selectedStudents.includes(student.id)}
                      onChange={(e) => handleSelect(student.id, e.target.checked)}
                    />
                  </td>
                  <td>{student.name}</td>
                  <td>{student.code}</td>
                  <td>
                    <Badge bg={student.active ? "info" : "secondary"}>
                      {student.active ? "Active" : "In-active"}
                    </Badge>
                  </td>
                  <td>
                    <Button
                      variant="warning"
                      className="me-2"
                      onClick={() => openUpdateModal(student)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => deleteStudent(student.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="d-flex justify-content-between">
            <Button
              variant="outline-secondary"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span>Page {currentPage} of {totalPages}</span>
            <Button
              variant="outline-secondary"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>

          <Modal show={showModal} onHide={closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>Update Student</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {editingStudent && (
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Student Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={editingStudent.name}
                      onChange={(e) =>
                        setEditingStudent({
                          ...editingStudent,
                          name: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Student Code</Form.Label>
                    <Form.Control
                      type="text"
                      value={editingStudent.code}
                      onChange={(e) =>
                        setEditingStudent({
                          ...editingStudent,
                          code: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Check
                    type="checkbox"
                    label="Still Active"
                    checked={editingStudent.active}
                    onChange={(e) =>
                      setEditingStudent({
                        ...editingStudent,
                        active: e.target.checked,
                      })
                    }
                  />
                </Form>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeModal}>
                Cancel
              </Button>
              <Button variant="primary" onClick={updateStudent}>
                Update
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </ControllerStudent>
  );
}

export default App;
