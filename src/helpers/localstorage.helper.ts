export function getTokenFromLocalStorage():string{
    const data=localStorage.getItem('token')
    const token:string=data ? data : ''
    return token
}

export function setTokenToLocalStorage(key:string, token:string):void{
    localStorage.setItem(key, token)
}

export function removeTokenFromLocalStorage(key:string):void{
    localStorage.removeItem(key)
}