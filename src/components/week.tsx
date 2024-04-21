import Workout from "./workout";
import { Accordion, AccordionItem } from "@nextui-org/react";
export default function Week() {
  return (
    <>
      <Accordion>
        <AccordionItem key="1" aria-label="Day1" title="Day 1">
          <Workout />
        </AccordionItem>
        <AccordionItem key="2" aria-label="Accordion 2" title="Day 2">
          <Workout />
        </AccordionItem>
        <AccordionItem key="3" aria-label="Accordion 3" title="Day 3">
          <Workout />
        </AccordionItem>
        <AccordionItem key="4" aria-label="Accordion 4" title="Day 4">
          <Workout />
        </AccordionItem>
      </Accordion>

    </>
  );
}