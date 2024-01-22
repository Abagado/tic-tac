import { instance } from "../api/axios.api"
import { IResponseUserData,IUserData, IUser} from "../types/types"

export const AuthService={
    async registration(
        userData: IUserData
        ):Promise<IResponseUserData | undefined>{
            const{data}=await instance.post<IResponseUserData>('auth/users/', userData)
            debugger;
            return data
        },
    async login(userData: IUserData):Promise<IUser | undefined>{
        const {data}=await instance.post<IUser>('auth/token/login', userData)
        return data
    },
    async getMe(){},
}