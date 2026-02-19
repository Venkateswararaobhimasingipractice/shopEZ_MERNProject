import { loginStart, loginSuccess, loginFailure, registerStart, registerSuccess, registerFailure, mailSending, mailSentSuccess, mailSentFailure } from './authSlice';

const baseUrl = process.env.REACT_APP_BASE_URL;

export const sendingMailForResetPassword = (email) => async (dispatch) => {
    dispatch(mailSending())
    try {
        fetch(`${baseUrl}/users/forgot-password`, {
            method: 'POST',
            body: JSON.stringify(email),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => res.json())
            .then(res => {
                dispatch(mailSentSuccess({ res }))
            })
            .catch(err => console.log(err))
    } catch (err) {
        dispatch(mailSentFailure())
    }
}

export const login = (userName, password) => async (dispatch) => {
    dispatch(loginStart());
    try {
        await fetch(`${baseUrl}/users/login`, {
            method: 'POST',
            body: JSON.stringify({ userName, password }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    localStorage.setItem('user', JSON.stringify(res.user))
                    localStorage.setItem('token', res.token)
                    dispatch(loginSuccess({ user: res.user, token: res.token, msg: res.msg }));
                } else {
                    dispatch(loginFailure(res.msg));
                    console.log(res);
                }
            })
            .catch(err => {
                dispatch(loginFailure(err.msg));
                console.log(err)
            })
    } catch (error) {
        console.log(error);
        dispatch(loginFailure(error.msg));
    }
};

export const register = (userName, fullName, email, password, avatar) => async (dispatch) => {
    dispatch(registerStart());
    try {
        await fetch(`${baseUrl}/users/register`, {
            method: 'POST',
            body: JSON.stringify({ userName, fullName, email, password, avatar }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    dispatch(registerSuccess());
                } else {
                    dispatch(registerFailure({ msg: res.msg }));
                }
            })
            .catch(err => {
                dispatch(registerFailure(err.message));
                console.log(err)
            })
    } catch (error) {
        dispatch(registerFailure(error.message));
    }
};
