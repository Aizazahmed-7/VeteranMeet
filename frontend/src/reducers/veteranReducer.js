import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'userLogin',
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

  export const veteransSlice = createSlice({
    name: 'VeteransInfo',
    initialState: {
      veterans: [],
    },
    reducers: {
      requestVetranList: (state, action) => {
        return { loading: true, veterans: [] }
      },
      successVeteranList: (state, action) => {
        return { loading: false, veterans: action.payload }
      },
      failVeteranList: (state, action) => {
        return { loading: false, error: action.payload ,veterans:[]}
      },
    }
  })

  
  export const {requestVetranList ,successVeteranList,failVeteranList} = veteransSlice.actions
  export const {request, success, fail,logout} = userSlice.actions