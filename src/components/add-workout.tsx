import { api } from "@/utils/api";
import { type ChangeEvent, useState } from 'react';
import { Button, Card, CardBody, Divider, Input } from "@nextui-org/react";
import AddSets, { type sets } from "./add-sets";
export type workout = {
  order: number,
  sets: sets
}[];
export default function AddWorkout() {
  const [inputs, setInputs] = useState<workout>([{ order: 1, sets: [{ name: '', reps: '' }] }]);

  const workout = api.workout.createWorkout.useMutation({
    onSuccess: (newSets) => {
      console.log(newSets)
    }
  });

  const handleInputChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const list = [...inputs];
    if (list) {
      list[index][name] = value;
    }
    setInputs(list);
  };

  const handleAddClick = () => {
    setInputs([...inputs, { order: inputs.length + 1, sets: [{ name: '', reps: '' }] }]);
  };

  const handleRemoveClick = (index: number) => {
    const list = [...inputs];
    list.splice(index, 1);
    setInputs(list);
  };

  const handleSubmit = () => {
    console.log('Form submitted:', inputs);
    workout.mutate(inputs);
  };
  return (
    <>
      {inputs.map((input, i) => (
        <div className="md:flex-nowrap gap-4" key={i}>
          <Card>
            <CardBody>
              <Input
                label="Day"
                type="number"
                name='order'
                value={input.order}
                onChange={event => handleInputChange(i, event)}
              />
              <Divider className="my-4" />
              <AddSets iteration={i} inputs={inputs} setInputs={setInputs} />
              {
                inputs.length !== 1 && (
                  <Button color="danger" onClick={() => handleRemoveClick(i)}>Remove Workout</Button>
                )
              }
            </CardBody>
          </Card>
        </div >
      ))
      }
      <Button color="secondary" onClick={handleAddClick}>Add Workout</Button>
      <Button color="success" onClick={handleSubmit}>Save Workout</Button>
    </>
  );
}