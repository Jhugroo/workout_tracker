import { Input } from "@nextui-org/react";
import { useEffect, useState, type ChangeEvent } from 'react';
import { Button } from "@nextui-org/react";
import { api } from "@/utils/api";

export type sets = {
  Workout?: {
    connect: {
      id: number
    }
  } | null,
  workoutId?: number | null,
  name: string,
  reps: string,
  id?: number | null
}[]
export default function AddSets({ workoutId }: { workoutId: number }) {

  const { data: sets, refetch, isLoading, isFetched } = api.workout.getSets.useQuery({ workoutId: workoutId });
  const [inputs, setInputs] = useState<sets>([{ name: '', reps: '' }]);
  const addSets = api.workout.createSets.useMutation({
    onSuccess: (workout) => {
      console.log(workout)
    }
  });

  useEffect(() => {
    if (isFetched && sets) {
      setInputs(sets);
    }
  }, [isFetched, sets]);

  const handleInputChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const list = [...inputs];
    if (list) {
      list[index][name] = value;
    }
    setInputs(list);
  };

  const handleAddClick = () => {
    setInputs([...inputs, { name: '', reps: '' }]);
  };

  const handleRemoveSet = (index: number) => {
    const list = [...inputs];
    list.splice(index, 1);
    setInputs(list);
  };

  const handleSubmitClick = () => {
    const list = inputs
    list.forEach(obj => obj.Workout = { connect: { id: workoutId } });
    addSets.mutate(list)
  };

  return (
    <>
      {inputs ? inputs.map((input, i) => (
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4" key={i}>
          <Input
            label="Name"
            name='name'
            onChange={event => handleInputChange(i, event)}
            value={input.name}
          />
          <Input
            label="Sets & reps"
            name='reps' onChange={event => handleInputChange(i, event)}
            value={input.reps}
          />
          <Button color="danger" onClick={() => handleRemoveSet(i)}>Remove set</Button>
        </div>
      )) : <>Add workout</>}
      <Button color="secondary" onClick={handleAddClick}>Add set</Button>
      <Button color="success" onClick={handleSubmitClick}>Save sets</Button>
    </>
  );
}