import React, { useState, useEffect } from "react";
import axios from "axios";

const ControllerStudent = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [selectedCount, setSelectedCount] = useState(0);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: "", studentCode: "", isActive: false });
  const [editingStudent, setEditingStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10; // Adjust as needed

  useEffect(() => {
    fetchStudents();
  }, [currentPage]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("https://student-api-nestjs.onrender.com/students", {
        params: { 
          page: currentPage, 
          pageSize: pageSize, 
          sortBy: "studentCode", 
          order: "asc" // "asc" cho tăng dần, "desc" cho giảm dần
        },
      });
      setStudents(Array.isArray(response.data.data) ? response.data.data : []); 
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };
  

  const addStudent = async () => {
    if (newStudent.name && newStudent.studentCode) {
      try {
        await axios.post("https://student-api-nestjs.onrender.com/students", newStudent);
        setNewStudent({ name: "", studentCode: "", isActive: false });
        
        // Gọi lại fetchStudents để làm mới danh sách sau khi thêm
        fetchStudents();
        
      } catch (error) {
        console.error("Error adding student:", error);
      }
    }
  };
  

  const updateStudent = async () => {
    try {
      await axios.put(`https://student-api-nestjs.onrender.com/students/${editingStudent._id}`, editingStudent);
      setStudents(
        students.map((student) =>
          student._id === editingStudent._id ? editingStudent : student
        )
      );
      setShowModal(false);
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`https://student-api-nestjs.onrender.com/students/${id}`);
      setStudents(students.filter((student) => student._id !== id));
      if (selectedStudents.includes(id)) {
        handleSelect(id, false);
      }
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const handleSelect = (studentId, checked) => {
    const updatedSelection = checked
      ? [...selectedStudents, studentId]
      : selectedStudents.filter((id) => id !== studentId);
    setSelectedStudents(updatedSelection);
    setSelectedCount(updatedSelection.length);
  };

  const clearStudents = () => {
    setStudents([]);
    setSelectedCount(0);
    setSelectedStudents([]);
  };

  const openUpdateModal = (student) => {
    setEditingStudent(student);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Pagination controls
  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return children({
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
  });
};

export default ControllerStudent;
