import React, { useState } from "react";

const ControllerStudent = ({ children }) => {
  const defaultStudents = [
    { id: 1, name: "Nguyen Van A", code: "CODE12345", active: true },
    { id: 2, name: "Tran Van B", code: "CODE67890", active: false },
    { id: 3, name: "Le Van C", code: "CODE54321", active: true },
    { id: 4, name: "Pham Van D", code: "CODE11111", active: false },
    { id: 5, name: "Do Van E", code: "CODE22222", active: true },
    { id: 6, name: "Ngo Van F", code: "CODE33333", active: true },
  ];

  const [students, setStudents] = useState(defaultStudents);
  const [selectedCount, setSelectedCount] = useState(0);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5; 

  const totalPages = Math.ceil(students.length / studentsPerPage);

  const paginatedStudents = students.slice(
    (currentPage - 1) * studentsPerPage,
    currentPage * studentsPerPage
  );

  const [newStudent, setNewStudent] = useState({
    name: "",
    code: "",
    active: false,
  });

  const [editingStudent, setEditingStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const addStudent = () => {
    if (newStudent.name && newStudent.code) {
      const student = {
        ...newStudent,
        id: students.length + 1,
      };

      // Thêm sinh viên vào cuối danh sách
      const updatedStudents = [...students, student];
      setStudents(updatedStudents);
      setNewStudent({ name: "", code: "", active: false });

      // Nếu số sinh viên của trang hiện tại < studentsPerPage, sinh viên mới sẽ xuất hiện ở trang đó
      const lastPage = Math.ceil(updatedStudents.length / studentsPerPage);
      if (currentPage !== lastPage) {
        setCurrentPage(lastPage);
      }
    }
  };

  const updateStudent = () => {
    setStudents(
      students.map((student) =>
        student.id === editingStudent.id ? editingStudent : student
      )
    );
    setShowModal(false);
  };

  const deleteStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
    if (selectedStudents.includes(id)) {
      handleSelect(id, false);
    }
  };

  const handleSelect = (studentId, checked) => {
    let updatedSelection = checked
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

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return children({
    students: paginatedStudents,
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
