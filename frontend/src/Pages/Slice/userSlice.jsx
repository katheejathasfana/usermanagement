import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    adminAuth: false,
};

const userSlice=createSlice({
    name:'users',
    initialState,
    reducers:{
        fetchusers(state,action){
            state.adminAuth=true
            state.users=action.payload
        },

        deleteusers(state,action){
            state.adminAuth=true
            state.users=state.users.filter((user)=>user.id!=action.payload)
        },

        logout(state,action){
            state.adminAuth=false
            state.users=[]
        }





    }


})

export const {fetchusers,deleteusers,logout}=userSlice.actions
export default userSlice.reducer