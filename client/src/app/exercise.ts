export class Exercise {
    public id: string;
    public pictures: string[];

    constructor(
        public name: string,
        public description: string,
        public duration: number,
        public position: number,
        public rest: boolean
    ) { }
}
