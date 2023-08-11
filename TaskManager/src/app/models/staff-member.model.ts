export class StaffMember {
    constructor(
        public id: number,
        public name: string,
        public surname: string,
        public position: string
    ) {}

    public deepCopy() {
        return new StaffMember(
            this.id,
            this.name,
            this.surname,
            this.position
        );
    }
}