import { Container } from "@mui/material";
import UsersHeader from "./componentsUsers/UsersHeader";
import UsersTable from "./componentsUsers/UsersTable";
import AddUserDialog from "../../features/addUserFeature";
import { useUsersPageController } from "./useUsersPageController";

export default function UsersPage() {
  const c = useUsersPageController();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <UsersHeader onRefresh={c.refresh} onAddUser={c.openAddUser} />

      <UsersTable users={c.users} />

      <AddUserDialog open={c.addUserDialogOpen} onClose={c.closeAddUser} />
    </Container>
  );
}
