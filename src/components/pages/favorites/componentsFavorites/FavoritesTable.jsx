import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

import {
  tableContainerSx,
  tableSx,
  tableHeaderRowSx,
  tableHeaderCellSx,
  emptyRowCellSx,
} from "../../../../styles/sharedGeneralStyles";

import FavoriteTableContent from "./FavoriteTableContent";

const headerCellCentered = { ...tableHeaderCellSx, textAlign: "center" };
const tableTitles = ["No .", "User", "Course Name", "Details", "Action"];

const FavoritesTable = ({
  favorites = [],
  coursesById,
  usersById,
  onDelete,
}) => (
  <TableContainer component={Paper} elevation={6} sx={tableContainerSx}>
    <Table sx={tableSx}>
      <TableHead>
        <TableRow sx={tableHeaderRowSx}>
          {tableTitles.map((title, index) => (
            <TableCell key={index} sx={headerCellCentered}>
              {title}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {favorites.length > 0 ? (
          favorites.map((item, idx) => {
            const { courseId, userId } = item;
            const course = coursesById?.get(String(courseId));

            const user = usersById?.get(String(userId));
            return (
              <FavoriteTableContent
              onDelete={onDelete}
              course={course} 
              courseId={courseId}
              item={item}
              userId={userId}
              user={user}
              idx={idx}
              ></FavoriteTableContent>
            );
          })
        ) : (
          <TableRow>
            <TableCell colSpan={5} align="center" sx={emptyRowCellSx}>
              <Typography variant="body1" color="text.secondary">
                No favorites found
              </Typography>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </TableContainer>
);

export default FavoritesTable;
