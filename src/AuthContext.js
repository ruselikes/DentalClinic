import {createContext} from 'react'

function noop() {}
//  контекст который хранит состояние входа
export const AuthContext = createContext({
    token: null,
    userId: null,
    login: noop,
    logout: noop,
    isAuthenticated: false
})