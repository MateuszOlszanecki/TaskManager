import { GlobalVariables } from "../global-variables";

export class Task {
    constructor(
        public id: number,
        public description: string,
        public staff_member_id: number,
        public status: string = GlobalVariables.TASK_NOT_STARTED_STATUS,
        public status_of_completion: number = 0
    ) {}
}