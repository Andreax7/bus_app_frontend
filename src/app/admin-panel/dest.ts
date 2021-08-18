export class Dest {
    constructor(
        public id: number,
        public zone: string,
        public line_no: number,
        public dest_name: string,
        public dfrom: string,
        public dto: string,
        public active: boolean
    ){}
}
 
export class Timetable {
    constructor(
        public id: number,
        public departure: number,
        public dest_name: number
    ) {}
  }
    export class Time {
        constructor(
            public id: number,
            public deptype: string,
            public departure: string,
        ) {}
        }
