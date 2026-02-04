import { Container } from "@mui/material";

import UsersHeader from "./componentsUsers/UsersHeader";
import UsersTable from "./componentsUsers/UsersTable";
import UserFormDialog from "../../features/addUserFeature";
import DeleteConfirmDialog from "../../features/DeleteConfirmDialog";
import { useUsersPageController } from "./useUsersPageController";


const UsersPage = () => {
  const c = useUsersPageController();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <UsersHeader onRefresh={c.onRefresh} onAddUser={c.onOpenAddUserDialog} />

      <UsersTable 
        users={c.users} 
        onDeleteUser={c.onOpenDeleteUserDialog} 
        onEditUser={c.onOpenEditUserDialog}
      />

      <UserFormDialog 
        isOpen={c.isAddUserDialogOpen} 
        onClose={c.onCloseAddUserDialog} 
      />

      <UserFormDialog 
        isOpen={c.isEditUserDialogOpen} 
        onClose={c.onCloseEditUserDialog} 
        user={c.userToEdit}
      />

      <DeleteConfirmDialog
        isOpen={c.isDeleteDialogOpen && c.deleteDialogType === 'user'}
        onClose={c.onCloseDeleteUserDialog}
        onConfirm={c.onConfirmDeleteUser}
        title="User Deletion"
        itemName={c.itemToDelete?.name}
      />
    </Container>
  );
};

export default UsersPage;
