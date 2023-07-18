import { BASE_URL } from "../Constants"

export const registerUser = (userData) => {
    return new Promise(async (resolve, reject)=>{
        try{
            var requestOptions = {
                method: 'POST',
                body: userData,
              };
            const res = await fetch(BASE_URL + '/AddCustomer',requestOptions).then(res => res.json())
            resolve(res)
        } catch (e){
            reject(e)
        }
    })
}


export const getProfile = (languageid, customerid) => {
    return new Promise(async (resolve, reject)=>{
        try{
            const res = await fetch(BASE_URL + `/GetProfileByCustomerId?languageid=${languageid}&customerid=${customerid}`).then(res => res.json())
            resolve(res)
        } catch (e){
            reject(e)
        }
    })
}

export const login = (username, password) => {
    return new Promise(async (resolve, reject)=>{
        try{
            var requestOptions = {
            method: 'GET',
            };
            const res = await fetch(BASE_URL + `/Login?loginwith=${username.trim().toLowerCase()}&password=${password.trim()}`,requestOptions).then(res => res.json())
            resolve(res)
        } catch (e){
            reject(e)
        }
    })
}