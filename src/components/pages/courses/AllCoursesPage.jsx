import { Container } from "@mui/material";

import { roles, definition } from "../../../utilities/constant.js";
import CoursesTable from "./componentsCourses/CoursesTable";
import FloatingActions from "./componentsCourses/FloatingActions";
import AddCourseDialog from "../../features/AddCourse.jsx";
import ConfirmingDeletionDialog from "../../features/ConfirmingDeletionDialog";
import EditCourseDialog from "../../features/editCourse.jsx";
import ShowStudentsDialog from "../../features/ShowStudents.jsx";
import AddStudentToCourseDialog from "../../features/AddStudentToCourse.jsx";
import NoDataDialog from "../../features/NoDataDialog";
import { useCoursesPageController } from "./useCoursesPageController.js";

const AllCoursePage = () => {
  const controller = useCoursesPageController();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <FloatingActions
        onAdd={controller.onOpenAddCourseDialog}
        onRefresh={controller.onRefresh}
        onSearch={controller.onSearch}
      />

      <CoursesTable
        courses={controller.courses}
        users={controller.users}
        onDelete={controller.onOpenDeleteCourseDialog}
        onEdit={controller.onOpenEditCourseDialog}
        onShowStudents={controller.onOpenShowStudentsDialog}
        onAddStudentToCourse={controller.onOpenAddStudentToCourseDialog}
      />

      <AddCourseDialog
        isOpen={controller.isAddCourseDialogOpen}
        onClose={controller.onCloseAddCourseDialog}
      />

      <ConfirmingDeletionDialog
        isOpen={
          controller.isDeleteDialogOpen &&
          controller.deleteDialogType === definition.course
        }
        onClose={controller.onCloseDeleteCourseDialog}
        onConfirm={controller.onConfirmDeleteCourse}
        title="Course Deletion"
        itemName={controller.itemToDelete?.courseName}
      />

      <EditCourseDialog
        isOpen={controller.isEditCourseDialogOpen}
        onClose={controller.onCloseEditCourseDialog}
        course={controller.courseToEdit}
      />

      <ShowStudentsDialog
        isOpen={controller.isShowStudentsDialogOpen}
        onClose={controller.onCloseShowStudentsDialog}
        course={controller.courseForStudents}
        onDelete={controller.onOpenDeleteStudentDialog}
        refreshKey={controller.studentsRefreshKey}
      />

      <ConfirmingDeletionDialog
        isOpen={
          controller.isDeleteDialogOpen &&
          controller.deleteDialogType === roles.student
        }
        onClose={controller.onCloseDeleteStudentDialog}
        onConfirm={controller.onConfirmDeleteStudent}
        title="Student Removal"
        itemName={controller.studentToDelete?.name}
        message={`Are you sure you want to remove "${controller.studentToDelete?.name}" from the course "${controller.courseForDeleteStudent?.courseName}"?`}
        confirmButtonText="Remove"
      />

      <AddStudentToCourseDialog
        isOpen={controller.isAddStudentDialogOpen}
        onClose={controller.onCloseAddStudentToCourseDialog}
        course={controller.courseForAddStudent}
      />

      <NoDataDialog
        isOpen={controller.isNoDataDialogOpen}
        onClose={controller.onCloseNoDataDialog}
      />
    </Container>
  );
};

export default AllCoursePage;
