import { Container } from "@mui/material";
import UsersHeader from "./componentsUsers/UsersHeader";
import UsersTable from "./componentsUsers/UsersTable";
import AddUserDialog from "../../features/addUserFeature";
import DeleteConfirmDialog from "../../features/DeleteConfirmDialog";
import { useUsersPageController } from "./useUsersPageController";

export default function UsersPage() {
  const c = useUsersPageController();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <UsersHeader onRefresh={c.refresh} onAddUser={c.openAddUser} />

      <UsersTable users={c.users} onDeleteUser={c.openDeleteUser} />

      <AddUserDialog open={c.addUserDialogOpen} onClose={c.closeAddUser} />

      <DeleteConfirmDialog
        open={c.deleteUserDialogOpen}
        onClose={c.closeDeleteUser}
        onConfirm={c.confirmDeleteUser}
        title="User Deletion"
        itemName={c.userToDelete?.name}
      />
    </Container>
  );
}
