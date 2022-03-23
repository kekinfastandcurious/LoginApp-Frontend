import axios from "axios";


export async function performLogin(email, password) {
    const credentials = {email: email, password: password};
    try{
        const res = await axios.post('http://localhost:8080/login', credentials);
        if(res.status && res.status === 200) {
            console.log('Res: ', res);
            const accessToken = res.data.accessToken;
            localStorage.setItem('accessToken', accessToken);
            return true;
        }
    }
    catch (e) {
        return false;
    }
}

export function isAuthenticated(){
    const accessToken = localStorage.getItem('accessToken');
    const isAuthenticated = accessToken? true: false;
    return isAuthenticated;
}

export function logout() {
    localStorage.removeItem('accessToken');
}