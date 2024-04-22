import { api } from "@/utils/api";
import { Button } from "@nextui-org/react";
import { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button as ModalButton, useDisclosure } from "@nextui-org/react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import AddSets, { type sets } from "./add-sets";
export type workout = {
  id?: number,
  weekId?: number,
  order: number,
  sets: sets
}[];
type selectedWorkout = {
  id: number;
  order: number;
  weekId: number | null;
}
export default function AddWorkout({ weekId }: { weekId: number }) {
  const { data: workouts, refetch, isLoading } = api.workout.getWorkouts.useQuery({ weekId: weekId });
  const [selectedWorkout, setSelectedWorkout] = useState<selectedWorkout>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const addWorkouts = api.workout.addWorkout.useMutation({
    onSuccess: (workout) => {
      void refetch();
      console.log(workout)
    }
  });
  const removeWorkout = api.workout.deleteWorkout.useMutation({
    onSuccess: (workout) => {
      void refetch();
    }
  });
  const addWorkout = () => {
    if (!isLoading && workouts?.length) {
      addWorkouts.mutate({
        order: workouts.length + 1,
        weekId: weekId
      });
    } else {
      addWorkouts.mutate({
        order: null,
        weekId: weekId
      });
    }
  };
  const deleteWorkout = (id: number) => {
    removeWorkout.mutate({ id: id })
  };
  return (
    <>
      {(!isLoading && workouts) &&
        <Table isStriped aria-label="Workouts">
          <TableHeader>
            <TableColumn>Name</TableColumn>
            <TableColumn>Edit</TableColumn>
            <TableColumn>Delete</TableColumn>
          </TableHeader>
          <TableBody>
            {workouts.map((workout) => (
              <TableRow key={workout.id}>
                <TableCell>Workout {workout.order}</TableCell>
                <TableCell>
                  <ModalButton onPress={() => { onOpen(); setSelectedWorkout(workout) }} color="secondary" key={workout.id}>Edit</ModalButton>
                </TableCell>
                <TableCell>
                  <Button color="danger" onClick={() => deleteWorkout(workout.id)}>Delete</Button>
                </TableCell>
              </TableRow>

            ))}
          </TableBody>
        </Table>
      }
      <Button size="lg" color="success" onClick={addWorkout}>Add workout</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Workout {selectedWorkout?.order}</ModalHeader>
              <ModalBody>
                {(selectedWorkout?.id) && <AddSets workoutId={selectedWorkout.id} />}
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