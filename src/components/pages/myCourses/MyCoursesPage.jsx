import { Container } from "@mui/material";

import MyCoursesHeader from "./componentsMyCourses/MyCoursesHeader";
import MyCoursesTable from "./componentsMyCourses/MyCoursesTable";
import ConfirmingDeletionDialog from "../../features/ConfirmingDeletionDialog";
import NoDataDialog from "../../features/NoDataDialog";
import { useMyCoursesPageController } from "./useMyCoursesPageController";

const MyCoursesPage = () => {
  const controller = useMyCoursesPageController();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <MyCoursesHeader
        onRefresh={controller.onRefresh}
        students={controller.students}
        selectedStudentId={controller.selectedStudentId}
        onStudentChange={controller.onStudentChange}
      />

      <MyCoursesTable
        myCourses={controller.myCourses}
        coursesById={controller.coursesById}
        usersById={controller.usersById}
        onAddFavorite={controller.onAddFavorite}
        onDeleteStudentFromCourse={controller.onOpenDeleteStudentFromCourseDialog}
        currentStudentId={controller.currentStudentId}
      />

      <ConfirmingDeletionDialog
        isOpen={controller.isDeleteStudentDialogOpen}
        onClose={controller.onCloseDeleteStudentFromCourseDialog}
        onConfirm={controller.onConfirmDeleteStudentFromCourse}
        title="Remove Student from Course"
        itemName={
          controller.coursesById?.get(String(controller.courseToRemove?.courseId))?.courseName
        }
        confirmButtonText="Remove"
      />

      <NoDataDialog
        isOpen={controller.isNoDataDialogOpen}
        onClose={controller.onCloseNoDataDialog}
      />
    </Container>
  );
};

export default MyCoursesPage;
