import { Container } from "@mui/material";
import CoursesTable from "./componentsCourses/CoursesTable";
import FloatingActions from "./componentsCourses/FloatingActions";
import AddCourseDialog from "../../features/addCourseFeature";
import DeleteCourseDialog from "../../features/deleteCourseFeature";
import EditCourseDialog from "../../features/editCourseFeature";
import ShowStudentsDialog from "../../features/showStudentsFeature";
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
      />

      <AddCourseDialog open={c.openAddDialog} onClose={c.closeAdd} />

      <DeleteCourseDialog
        open={c.deleteDialogOpen}
        onClose={c.closeDelete}
        onConfirm={c.confirmDelete}
        courseName={c.courseToDelete?.name_course}
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
    </Container>
  );
}
