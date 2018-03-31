import { Exercise } from "./exercise";

export class Workout {
    public _id: string;
    public createdBy: string;
    public lastRun: Date;
    public exercises: Exercise[];
    constructor(
        public name: string,
        public description: string
    ) { }
}
