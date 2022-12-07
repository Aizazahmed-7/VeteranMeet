import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { userSlice, veteransSlice } from './reducers/veteranReducer';
import { orgSlice } from './reducers/OrgReducer';

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')): null
const VeteranInfoFromStorage = localStorage.getItem('veteranInfo') ? JSON.parse(localStorage.getItem('veteranInfo')): null
const orgInfoFromStorage = localStorage.getItem('orgInfo') ? JSON.parse(localStorage.getItem('orgInfo')): null
const store = configureStore({
    reducer: {
        userLogin:userSlice.reducer,
        OrgLogin:orgSlice.reducer,
        VeteransInfo:veteransSlice.reducer,     
    },
    preloadedState: {
        userLogin:{userInfo:userInfoFromStorage},
        VeteransInfo:{veterans:VeteranInfoFromStorage},
        OrgLogin:{userInfo:orgInfoFromStorage},
    },
    middleware: [thunk],
})
 
export default store