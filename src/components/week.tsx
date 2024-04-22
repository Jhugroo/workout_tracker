import Workout from "./workout";
import { Accordion, AccordionItem } from "@nextui-org/react";

export default function Week({ workouts }: { workouts: ({ sets: { id: number; name: string; reps: string; workoutId: number | null; }[]; } & { id: number; order: number; weekId: number | null; })[] }) {
  return (
    <>
      <Accordion>
        {(workouts) ? workouts.map((workout) => (
          <AccordionItem key={workout.id} aria-label={`Day${workout.order}`} title={`Day ${workout.order}`}>
            <Workout sets={workout.sets} />
          </AccordionItem>
        )) : (
          <AccordionItem key="1" aria-label="Error" title="Empty">
            empty
          </AccordionItem>)
        }

      </Accordion>

    </>
  );
}