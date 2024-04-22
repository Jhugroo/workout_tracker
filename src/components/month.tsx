import { Tabs, Tab, Card, CardBody, Button } from "@nextui-org/react";
import Week from "./week";
import { api } from "@/utils/api";

export default function Month() {
    const { data: workouts, isFetched } = api.workout.getAllWorkouts.useQuery();
    return (
        <Tabs aria-label="Options" color="secondary">
            {(isFetched && workouts) ? workouts.map((workout) => (
                <Tab key={workout.id} title={`Week ${workout.order}`}>
                    <Card>
                        <CardBody>
                            <Week workouts={workout.workouts} />
                        </CardBody>
                    </Card>
                </Tab>
            )) : (<Tab key="other" title="Week 4">
                <Card>
                    <CardBody>
                        empty
                    </CardBody>
                </Card >
            </Tab >)
            }
        </Tabs >
    );
}