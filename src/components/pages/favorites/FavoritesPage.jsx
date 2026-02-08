import { Container } from "@mui/material";

import FavoritesHeader from "./componentsFavorites/FavoritesHeader";
import FavoritesTable from "./componentsFavorites/FavoritesTable";
import DeleteConfirmDialog from "../../features/DeleteConfirmDialog";
import NoDataDialog from "../../features/NoDataDialog";
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
        isOpen={c.isDeleteDialogOpen && c.deleteDialogType === 'favorite'}
        onClose={c.onCloseDeleteFavoriteDialog}
        onConfirm={c.onConfirmDeleteFavorite}
        title="Favorite Deletion"
        itemName={c.itemToDelete ? c.coursesById.get(String(c.itemToDelete.course_id))?.name_course : null}
      />

      <NoDataDialog isOpen={c.isNoDataDialogOpen} onClose={c.onCloseNoDataDialog} />
    </Container>
  );
};

export default FavoritesPage;
