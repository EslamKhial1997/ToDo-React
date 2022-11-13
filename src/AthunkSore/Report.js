import { createSlice } from "@reduxjs/toolkit";

const Report = createSlice({
    name:"Report",
    initialState:{Adds:{} , Del:{} , Edit:{} ,UserName:{}},
    reducers:{
        ReportAdds:(state , action)=>{
            state.Adds = action.payload
        },
        ReportDel:(state , action)=>{
            state.Del = action.payload
        
        },
        ReportEdit:(state , action)=>{
            state.Edit = action.payload
        },
        ReportUserName:(state , action)=>{
            state.UserName = action.payload
        }
    }
})

export const ReportReducer = Report.reducer
export const {ReportAdds ,ReportDel , ReportEdit ,ReportUserName} = Report.actions