import { createSlice } from "@reduxjs/toolkit";

export const orgSlice = createSlice({
    name: 'OrgLogin',
    initialState: {
      
    },
    reducers: {
      request: (state, action) => {
        return { loading: true, userInfo: {} }
      },
      success: (state, action) => {
        return { loading: false, userInfo: action.payload }
      },
      fail: (state, action) => {
        return { loading: false, error: action.payload ,userInfo:null}
      },
      logout: (state,action) => {
          return({})
      }
    }
  })
  
  export const {request, success, fail,logout} = orgSlice.actions