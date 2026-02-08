import { Container } from "@mui/material";

import MyCoursesHeader from "./componentsMyCourses/MyCoursesHeader";
import MyCoursesTable from "./componentsMyCourses/MyCoursesTable";
import DeleteConfirmDialog from "../../features/DeleteConfirmDialog";
import NoDataDialog from "../../features/NoDataDialog";
import { useMyCoursesPageController } from "./useMyCoursesPageController";


const MyCoursesPage = () => {
  const c = useMyCoursesPageController();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <MyCoursesHeader
        onRefresh={c.onRefresh}
        students={c.students}
        selectedStudentId={c.selectedStudentId}
        onStudentChange={c.onStudentChange}
      />

      <MyCoursesTable
        myCourses={c.myCourses}
        coursesById={c.coursesById}
        usersById={c.usersById}
        onAddFavorite={c.onAddFavorite}
        onDeleteStudentFromCourse={c.onOpenDeleteStudentFromCourseDialog}
        currentStudentId={c.currentStudentId}
      />

      <DeleteConfirmDialog
        isOpen={c.isDeleteStudentDialogOpen}
        onClose={c.onCloseDeleteStudentFromCourseDialog}
        onConfirm={c.onConfirmDeleteStudentFromCourse}
        title="Remove Student from Course"
        itemName={c.coursesById?.get(String(c.courseToRemove?.course_id))?.name_course}
        confirmButtonText="Remove"
      />

      <NoDataDialog isOpen={c.isNoDataDialogOpen} onClose={c.onCloseNoDataDialog} />
    </Container>
  );
};

export default MyCoursesPage;
