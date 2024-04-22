import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { type sets } from "./add-sets";

export default function Workout({ sets }: { sets: sets }) {
  return (
    <Table isStriped aria-label="Workout">
      <TableHeader>
        <TableColumn>NAME</TableColumn>
        <TableColumn>SETS</TableColumn>
      </TableHeader>
      <TableBody>
        {(sets) ? sets.map((set) => (
          <TableRow key={set.id}>
            <TableCell>{set.name}</TableCell>
            <TableCell>{set.reps} </TableCell>
          </TableRow>
        )) : (
          <TableRow key="1">
            <TableCell>-</TableCell>
            <TableCell>-</TableCell>
          </TableRow>)
        }
      </TableBody>
    </Table>
  );
}