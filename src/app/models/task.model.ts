export class Task {
    constructor(
        public description: string,
        public staff_member_id: number,
        public status: string,
        public status_of_completion: number
    ) {}
}