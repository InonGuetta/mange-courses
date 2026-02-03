import { Container } from "@mui/material";
import FavoritesHeader from "./componentsFavorites/FavoritesHeader";
import FavoritesTable from "./componentsFavorites/FavoritesTable";
import DeleteConfirmDialog from "../../features/DeleteConfirmDialog";
import { useFavoritesPageController } from "./useFavoritesPageController";

const FavoritesPage = () => {
  const c = useFavoritesPageController();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <FavoritesHeader onRefresh={c.onRefresh} />

      
      <FavoritesTable
        favorites={c.favorites}
        coursesById={c.coursesById}
        usersById={c.usersById}
        onDelete={c.onOpenDeleteFavoriteDialog} 
      />

      <DeleteConfirmDialog
        isOpen={c.isDeleteFavoriteDialogOpen}
        onClose={c.onCloseDeleteFavoriteDialog}
        onConfirm={c.onConfirmDeleteFavorite}
        title="Favorite Deletion"
        itemName={c.favoriteToDelete ? c.coursesById.get(String(c.favoriteToDelete.course_id))?.name_course : null}
      />
    </Container>
  );
};

export default FavoritesPage;
