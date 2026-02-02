import { Container } from "@mui/material";
import CoursesTable from "./componentsCourses/CoursesTable";
import FloatingActions from "./componentsCourses/FloatingActions";
import AddCourseDialog from "../../features/addCourseFeature";
import DeleteConfirmDialog from "../../features/DeleteConfirmDialog";
import EditCourseDialog from "../../features/editCourseFeature";
import ShowStudentsDialog from "../../features/showStudentsFeature";
import AddStudentToCourseDialog from "../../features/addStudentToCourseFeature";
import { useCoursesPageController } from "./useCoursesPageController.js";

export default function AllCoursePage() {
  const c = useCoursesPageController();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <FloatingActions onAdd={c.openAdd} onRefresh={c.refresh} />

      <CoursesTable
        courses={c.courses}
        users={c.users}
        onDelete={c.openDelete}
        onEdit={c.openEdit}
        onShowStudents={c.openShowStudents}
        onAddStudentToCourse={c.openAddStudentToCourse}
      />

      <AddCourseDialog open={c.openAddDialog} onClose={c.closeAdd} />

      <DeleteConfirmDialog
        open={c.deleteDialogOpen}
        onClose={c.closeDelete}
        onConfirm={c.confirmDelete}
        title="Course Deletion"
        itemName={c.courseToDelete?.name_course}
      />

      <EditCourseDialog
        open={c.editDialogOpen}
        onClose={c.closeEdit}
        course={c.courseToEdit}
      />

      <ShowStudentsDialog
        open={c.studentsDialogOpen}
        onClose={c.closeShowStudents}
        course={c.courseForStudents}
      />

      <AddStudentToCourseDialog
        open={c.addStudentDialogOpen}
        onClose={c.closeAddStudentToCourse}
        course={c.courseForAddStudent}
      />
    </Container>
  );
}
