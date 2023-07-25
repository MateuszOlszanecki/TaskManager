import { Task } from "./task.model";

export class StaffMember {
    constructor(
        public name: string,
        public surname: string,
        public position: string,
        public tasks: Task[]
        ) {}
}