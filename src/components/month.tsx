import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import Week from "./week";
import { api } from "@/utils/api";

export default function Month() {
    const { data: workouts, refetch, isLoading } = api.workout.findAll.useQuery();
    if (!isLoading) {
        console.log(workouts)
    }
    return (
        <Tabs aria-label="Options" color="secondary">
            <Tab key="photos" title="Week 1">
                <Card>
                    <CardBody>
                        <Week />
                    </CardBody>
                </Card>
            </Tab>
            <Tab key="music" title="Week 2">
                <Card>
                    <CardBody>
                        <Week />
                    </CardBody>
                </Card>
            </Tab>
            <Tab key="videos" title="Week 3">
                <Card>
                    <CardBody>
                        <Week />
                    </CardBody>
                </Card>
            </Tab>
            <Tab key="other" title="Week 4">
                <Card>
                    <CardBody>
                        <Week />
                    </CardBody>
                </Card>
            </Tab>
        </Tabs>
    );
}