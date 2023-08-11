import { GlobalVariables } from "../shared/global-variables";

export class Task {
    constructor(
        public id: number,
        public description: string,
        public staff_member_id: number,
        public status: string = GlobalVariables.TASK_NOT_STARTED_STATUS,
        public status_of_completion: number = 0
    ) {}

    public deepCopy() {
        return new Task(
            this.id,
            this.description,
            this.staff_member_id,
            this.status,
            this.status_of_completion
        );
    }
}