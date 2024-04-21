import { api } from "@/utils/api";
import { Button } from "@nextui-org/react";
import { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button as ModalButton, useDisclosure } from "@nextui-org/react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import AddWorkout from "./add-workout";
export default function AddMonth() {
  const { data: weeks, refetch, isLoading } = api.workout.getWeeks.useQuery();
  const [selectedWeek, setSelectedWeek] = useState<number>(0);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const addWeeks = api.workout.addWeek.useMutation({
    onSuccess: (week) => {
      void refetch();
      console.log(week)
    }
  });
  const removeWeek = api.workout.deleteWeek.useMutation({
    onSuccess: (week) => {
      void refetch();
    }
  });
  const addWeek = () => {
    if (!isLoading && weeks?.length) {
      addWeeks.mutate({
        order: weeks.length + 1
      });
    } else {
      addWeeks.mutate({
        order: null
      });
    }
  };
  const deleteWeek = (id) => {
    removeWeek.mutate({ id: id })
  };
  return (
    <>
      {(!isLoading && weeks) &&
        <Table isStriped aria-label="Weeks">
          <TableHeader>
            <TableColumn>Name</TableColumn>
            <TableColumn>Edit</TableColumn>
            <TableColumn>Delete</TableColumn>
          </TableHeader>
          <TableBody>
            {weeks.map((week) => (
              <TableRow key={week.id}>
                <TableCell>Week {week.id}</TableCell>
                <TableCell>
                  <ModalButton onPress={() => { onOpen(); setSelectedWeek(week.id) }} color="secondary" key={week.id}>Edit</ModalButton>
                </TableCell>
                <TableCell>
                  <Button color="danger" onClick={() => deleteWeek(week.id)}>Delete</Button>
                </TableCell>
              </TableRow>

            ))}
          </TableBody>
        </Table>
      }
      <Button size="lg" color="success" onClick={addWeek}>Add week</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <AddWorkout />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}