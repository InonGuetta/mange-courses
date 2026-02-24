import { Container } from "@mui/material";

import UsersHeader from "./componentsUsers/UsersHeader";
import UsersTable from "./componentsUsers/UsersTable";
import UserFormDialog from "../../features/AddUsers/AddUser.jsx";
import ConfirmingDeletionDialog from "../../features/ConfirmingDeletionDialog/ConfirmingDeletionDialog.jsx";
import NoDataDialog from "../../features/NoDataDialog/NoDataDialog.jsx";
import { useUsersPageController } from "./useUsersPageController";


const UsersPage = () => {
  const controller = useUsersPageController();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <UsersHeader onRefresh={controller.onRefresh} onAddUser={controller.onOpenAddUserDialog} onSearch={controller.onSearch} />

      <UsersTable 
        users={controller.users} 
        onDeleteUser={controller.onOpenDeleteUserDialog} 
        onEditUser={controller.onOpenEditUserDialog}
      />

      <UserFormDialog 
        isOpen={controller.isAddUserDialogOpen} 
        onClose={controller.onCloseAddUserDialog} 
      />

      <UserFormDialog 
        isOpen={controller.isEditUserDialogOpen} 
        onClose={controller.onCloseEditUserDialog} 
        user={controller.userToEdit}
      />

      <ConfirmingDeletionDialog
        isOpen={controller.isDeleteDialogOpen && controller.deleteDialogType === 'user'}
        onClose={controller.onCloseDeleteUserDialog}
        onConfirm={controller.onConfirmDeleteUser}
        title="User Deletion"
        itemName={controller.itemToDelete?.name}
      />

      <NoDataDialog isOpen={controller.isNoDataDialogOpen} onClose={controller.onCloseNoDataDialog} />
    </Container>
  );
};

export default UsersPage;