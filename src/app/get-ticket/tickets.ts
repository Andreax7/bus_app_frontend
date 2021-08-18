export class Ticket {
    id!: number;
    ticket_date!: Date;
    validfrom!: Date;
    amount!: number;
    non_users_id!: number;
    Profiles_id?: number;
    ticket_types_id!: number
}

export class Ttypes{
    id?: number;
    tickettype?: string;
    ticket_price!: number;
    zone?: number
}

export class nonUser{
        id?: number;
        firstname?: string;
        lastname?: string;
        email?: string;
    }

