export class Ticket {
    constructor(
    id: number,
    ticket_date: Date,
    validfrom: Date,
    amount: number,
    non_user_id: number,
    Profiles_id: number) {}
}

export class Ttypes{
    constructor(
    id: number,
    tickettype: string,
    ticket_price: number,
    zone_id: number){}
}

export class nonUser{
        id?: number;
        firstname?: string;
        lastname?: string;
        email?: string;
    }

