export class Subscription {
    id!: number;
    date_ordered!: Date;
    discount!: number;
    subscription_types_id!: number;
    Profiles_id!: number;
}

export class SubTypes{
    id?: number;
    subtype?: string;
    subprice!: number;
    year!:number;
    zone?: number;
    active!: boolean;
}