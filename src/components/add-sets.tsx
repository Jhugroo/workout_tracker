import { Input } from "@nextui-org/react";
import { type ChangeEvent, type Dispatch, type SetStateAction } from 'react';
import { Button } from "@nextui-org/react";
import { type workout } from "./add-workout";

export type sets = {
  name: string,
  reps: string,
}[]
export default function AddSets({ iteration, inputs, setInputs }: { iteration: number, inputs: workout, setInputs: Dispatch<SetStateAction<workout>> }) {

  const handleInputChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {

    const { name, value } = event.target;
    const list = [...inputs];
    console.log(list)
    if (list) {
      list[iteration].sets[index][name] = value;
    }
    setInputs(list);
  };

  const handleAddClick = () => {
    const list = [...inputs];
    list[iteration].sets[list[iteration].sets.length + 1] = { name: '', reps: '' }
    setInputs(list);
  };

  const handleRemoveSet = (index: number) => {
    const list = [...inputs];
    delete list[iteration].sets[index]
    setInputs(list);

  };
  return (
    <>
      {inputs ? inputs[iteration].sets.map((input, i) => (
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4" key={i}>
          <Input
            label="Name"
            name='name'
            onChange={event => handleInputChange(i, event)}

          />
          <Input
            label="Sets & reps"
            name='reps' onChange={event => handleInputChange(i, event)}

          />
          <Button color="danger" onClick={() => handleRemoveSet(i)}>Remove set</Button>
        </div>
      )) : <>Add workout</>}
      <Button color="secondary" onClick={handleAddClick}>Add set</Button>
    </>
  );
}