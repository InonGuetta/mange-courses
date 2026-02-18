import { Container } from "@mui/material";

import FavoritesHeader from "./componentsFavorites/FavoritesHeader";
import FavoritesTable from "./componentsFavorites/FavoritesTable";
import ConfirmingDeletionDialog from "../../features/ConfirmingDeletionDialog";
import NoDataDialog from "../../features/NoDataDialog";
import { useFavoritesPageController } from "./useFavoritesPageController";


const FavoritesPage = () => {
  const controller = useFavoritesPageController();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <FavoritesHeader onRefresh={controller.onRefresh} />
      
      <FavoritesTable
        favorites={controller.favorites}
        coursesById={controller.coursesById}
        usersById={controller.usersById}
        onDelete={controller.onOpenDeleteFavoriteDialog} 
      />

      <ConfirmingDeletionDialog
        isOpen={controller.isDeleteDialogOpen && controller.deleteDialogType === 'favorite'}
        onClose={controller.onCloseDeleteFavoriteDialog}
        onConfirm={controller.onConfirmDeleteFavorite}
        title="Favorite Deletion"
        itemName={controller.itemToDelete ? controller.coursesById.get(String(controller.itemToDelete.courseId))?.courseName : null}
      />

      <NoDataDialog isOpen={controller.isNoDataDialogOpen} onClose={controller.onCloseNoDataDialog} />
    </Container>
  );
};

export default FavoritesPage;
