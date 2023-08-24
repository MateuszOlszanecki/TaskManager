import { GlobalVariables } from "../shared/global-variables";

export class Task {
    constructor(
        public id: number,
        public description: string,
        public staff_member_id: number,
        public progress: number = 0
    ) {}

    public deepCopy() {
        return new Task(
            this.id,
            this.description,
            this.staff_member_id,
            this.progress
        );
    }

    public getStatus() {
        switch(this.progress) {
          case 0:
            return GlobalVariables.TASK_NOT_STARTED_STATUS;
          case 100:
            return GlobalVariables.TASK_FINISHED_STATUS;
        }
        return GlobalVariables.TASK_IN_PROGRESS_STATUS;
    }
}