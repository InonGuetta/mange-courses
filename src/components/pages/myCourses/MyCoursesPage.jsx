import { Container } from "@mui/material";
import MyCoursesHeader from "./componentsMyCourses/MyCoursesHeader";
import MyCoursesTable from "./componentsMyCourses/MyCoursesTable";
import { useMyCoursesPageController } from "./useMyCoursesPageController";

export default function MyCoursesPage() {
  const c = useMyCoursesPageController();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <MyCoursesHeader onRefresh={c.refresh} />

      <MyCoursesTable
        myCourses={c.myCourses}
        coursesById={c.coursesById}
        usersById={c.usersById}
        onAddFavorite={c.onAddFavorite}
        currentStudentId={c.currentStudentId}
      />
    </Container>
  );
}
