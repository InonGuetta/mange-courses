import { Container } from "@mui/material";
import MyCoursesHeader from "./componentsMyCourses/MyCoursesHeader";
import MyCoursesTable from "./componentsMyCourses/MyCoursesTable";
import DeleteStudentFromCourseDialog from "../../features/deleteStudentFromMyCourseFeature";
import { useMyCoursesPageController } from "./useMyCoursesPageController";

export default function MyCoursesPage() {
  const c = useMyCoursesPageController();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <MyCoursesHeader
        onRefresh={c.refresh}
        students={c.students}
        selectedStudentId={c.selectedStudentId}
        onStudentChange={c.onStudentChange}
      />

      <MyCoursesTable
        myCourses={c.myCourses}
        coursesById={c.coursesById}
        usersById={c.usersById}
        onAddFavorite={c.onAddFavorite}
        onDeleteStudentFromCourse={c.openDeleteStudentDialog}
        currentStudentId={c.currentStudentId}
      />

      <DeleteStudentFromCourseDialog
        open={c.deleteDialogOpen}
        onClose={c.closeDeleteStudentDialog}
        onConfirm={c.confirmDeleteStudentFromCourse}
        courseName={
          c.coursesById?.get(String(c.courseToRemove?.course_id))?.name_course
        }
      />
    </Container>
  );
}
