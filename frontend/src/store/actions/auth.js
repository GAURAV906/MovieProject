import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,     
    }
}

export const authSucess = (token) => {
    return {
        type: actionTypes.AUTH_SUCESS,
        token: token,     
    }
}

export const authFailure = (error) => {
    return {
        type: actionTypes.AUTH_FALIURE,
        error: error,
    }
}

export const authLogout=()=>{
    localStorage.removeItem('user');
    localStorage.removeItem('expirationTime');

    return {
        type: actionTypes.AUTH_LOGOUT,    
    }
}

const checkAuthTimeOut =( expirationTime ) =>{
    return dispatch =>{
        setTimeout(()=>{
            dispatch(authLogout())
        }, expirationTime * 1000);
    }
}

export const authLogin=(username, password)=>{
    return dispatch =>{
        dispatch(authStart());
        fetch('http://127.0.0.1:8000/rest-auth/login/',{method: 'POST'},
        {
            username : username,
            password : password,
        })
        .then(res=>{
            const token = res.data.key;
            const expirationTime = new Date(new Date().getTime() + 60 * 1000);
            localStorage.setItem('token', token);
            localStorage.setItem('expirationTime', expirationTime);
            dispatch(authSucess(token));
            dispatch(checkAuthTimeOut(60));
        })
        .catch(error=>{
            dispatch(authFailure(error))
        })
    }
}

export const authSignUp=(username, email, password1, password2)=>{
    return dispatch =>{
        dispatch(authStart());
        fetch('http://127.0.0.1:8000/rest-auth/registration/',{method: 'POST'},
        {
            username : username,
            email: email,
            password1 : password1,
            password2: password2
        })
        .then(res=>{
            const token = res.data.key;
            const expirationTime = new Date(new Date().getTime() + 60 * 1000);
            localStorage.setItem('token', token);
            localStorage.setItem('expirationTime', expirationTime);
            dispatch(authSucess(token));
            dispatch(checkAuthTimeOut(60));
        })
        .catch(error=>{
            dispatch(authFailure(error))
        })
    }
}

export const authCheckState=()=>{
    return dispatch =>{
        const token = localStorage.getItem('token');

        if(token  === undefined){
            dispatch(authLogout());
        }
        else{
            const expirationDate = new Date(localStorage.getItem('expirationTime'));

            if(expirationDate <= new Date()){
                dispatch(authLogout());
            }
            else {
                dispatch(authSucess(token));
                dispatch(checkAuthTimeOut((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
}