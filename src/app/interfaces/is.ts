export interface IUser {
    user_name: string;
}

export interface IPassword {
    pw: string;
    diggest?: string;
    length?: number;
    secret?: string;
    token?: any;
}

export interface IAdress {
    company?: string;
    street: string;
    house_number: string;
    postal_code: number;
    city: string;
    state?: string;
    country: string;
}

export interface INames {
    suffix_before?: string;
    first_name: string;
    second_name?: string | string[];
    last_name: string;
    suffix_after?: string;
    maiden_name?: string;
}

export interface IPerson {
    age: number;
    birth_date: Date;
    born_in: string;
    nationalaty?: string;
}

export interface IIdentity {
    id: string;
    validity_date: Date;
    last_digits?: string;
}
