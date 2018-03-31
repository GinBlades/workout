export class Exercise {
    public _id: string;
    public pictures: string[];

    constructor(
        public name: string,
        public description: string,
        public duration: number,
        public position: number,
        public rest: boolean
    ) { }
}
