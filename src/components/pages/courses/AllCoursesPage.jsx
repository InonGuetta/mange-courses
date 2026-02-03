import { Container } from "@mui/material";
import CoursesTable from "./componentsCourses/CoursesTable";
import FloatingActions from "./componentsCourses/FloatingActions";
import AddCourseDialog from "../../features/addCourseFeature";
import DeleteConfirmDialog from "../../features/DeleteConfirmDialog";
import EditCourseDialog from "../../features/editCourseFeature";
import ShowStudentsDialog from "../../features/showStudentsFeature";
import AddStudentToCourseDialog from "../../features/addStudentToCourseFeature";
import { useCoursesPageController } from "./useCoursesPageController.js";

const AllCoursePage = () => {
  const c = useCoursesPageController();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <FloatingActions onAdd={c.onOpenAddCourseDialog} onRefresh={c.onRefresh} />

      <CoursesTable 
        courses={c.courses}
        users={c.users}
        onDelete={c.onOpenDeleteCourseDialog}
        onEdit={c.onOpenEditCourseDialog}
        onShowStudents={c.onOpenShowStudentsDialog}
        onAddStudentToCourse={c.onOpenAddStudentToCourseDialog}
      />

      <AddCourseDialog isOpen={c.isAddCourseDialogOpen} onClose={c.onCloseAddCourseDialog} />

      <DeleteConfirmDialog
        isOpen={c.isDeleteDialogOpen && c.deleteDialogType === 'course'}
        onClose={c.onCloseDeleteCourseDialog}
        onConfirm={c.onConfirmDeleteCourse}
        title="Course Deletion"
        itemName={c.itemToDelete?.name_course}
      />

      <EditCourseDialog
        isOpen={c.isEditCourseDialogOpen}
        onClose={c.onCloseEditCourseDialog}
        course={c.courseToEdit}
      />

      <ShowStudentsDialog
        isOpen={c.isShowStudentsDialogOpen}
        onClose={c.onCloseShowStudentsDialog}
        course={c.courseForStudents}
      />

      <AddStudentToCourseDialog
        isOpen={c.isAddStudentDialogOpen}
        onClose={c.onCloseAddStudentToCourseDialog}
        course={c.courseForAddStudent}
      />
    </Container>
  );
};

export default AllCoursePage;
