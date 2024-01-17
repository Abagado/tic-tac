export interface IUser{
    id: number
    email: string
    token: string
}

export interface IUserData{
    email:string
    password:string
}

export interface IResponseUser{
    email:string
    id:number
    createdAt: string
    updateAt:string
    password:string
}

export interface IResponseUserData{
    token:string
    user:IResponseUser
}
export interface LobbyData {
    id: number;
    name: string;
    guests: string[];
}

export interface MoveData {
    player: string;
    gridnum: number;
}