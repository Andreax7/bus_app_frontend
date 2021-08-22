

export class User {
    id?: number;
    email?: string;
    username?: string;
    password?: string;
    first_name?: string;
    last_name?: string;
    address?: string;
    role?: string; 
    token!: string;
    picture?: string;
}

export class Employees{
    id?:number;
    username?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
    is_active?: boolean;
    is_staff?: boolean;
    role?: string;
    address?: string;
    token!: string;
}
