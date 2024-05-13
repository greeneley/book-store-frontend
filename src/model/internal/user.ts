export interface Authorities {
    id: number;
    name: string;
}

export interface User {
    user_id: number;
    username: string;
    email: string;
    enabled: boolean;
    firstname: string;
    lastname: string;
    avatar: string;
    authorities: Array<Authorities>;
}
