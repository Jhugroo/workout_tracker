import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";

export default function Workout() {
  return (
    <Table isStriped aria-label="Workout">
      <TableHeader>
        <TableColumn>NAME</TableColumn>
        <TableColumn>SETS</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="1">
          <TableCell>Bench Press</TableCell>
          <TableCell>4x8 </TableCell>
        </TableRow>
        <TableRow key="2">
          <TableCell>Pendley Row</TableCell>
          <TableCell>4x12</TableCell>
        </TableRow>
        <TableRow key="3">
          <TableCell> Incline Dumbbell Press</TableCell>
          <TableCell>4x12</TableCell>
        </TableRow>
        <TableRow key="4">
          <TableCell> Lat Pulldown</TableCell>
          <TableCell>3x12-15</TableCell>
        </TableRow>
        <TableRow key="5">
          <TableCell>Cable Row</TableCell>
          <TableCell>3x12-15</TableCell>
        </TableRow>
        <TableRow key="6">
          <TableCell>Barbell OR Dumbbell Curl</TableCell>
          <TableCell>4x8-10</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}