import { Container } from "@mui/material";
import FavoritesHeader from "./componentsFavorites/FavoritesHeader";
import FavoritesTable from "./componentsFavorites/FavoritesTable";
import DeleteFavoriteDialog from "../../features/deleteFavoriteFeature";
import { useFavoritesPageController } from "./useFavoritesPageController";

export default function FavoritesPage() {
  const c = useFavoritesPageController();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <FavoritesHeader onRefresh={c.refresh} />

      
      <FavoritesTable
        favorites={c.favorites}
        coursesById={c.coursesById}
        usersById={c.usersById}
        onDelete={c.openDelete} 
      />

      <DeleteFavoriteDialog
        open={c.deleteFavoriteDialogOpen}
        onClose={c.closeDelete}
        onConfirm={c.confirmDelete}
        courseName={c.favoriteToDelete ? c.coursesById.get(String(c.favoriteToDelete.course_id))?.name_course : null}
      />
    </Container>
  );
}
