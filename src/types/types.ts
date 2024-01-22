export interface IUser{
    id: number
    username: string
    token: string
}

export interface IUserData{
    username:string
    password:string
}

export interface IResponseUser{
    username:string
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