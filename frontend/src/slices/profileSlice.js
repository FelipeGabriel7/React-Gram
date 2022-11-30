import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'
import  profileService, { getUserDetails, profileUpdate } from '../services/profileService'

const initialState = {
  user: {},
  error: false,
  loading: false,
  success: false,
  message: null
}

export const infoUser = createAsyncThunk("user/profile" , 
async(user , thunkAPI) => {

  try{
    const token = thunkAPI.getState().auth.user.token;

    const data = await profileService(user , token)
  
    return data;
  }catch(e){
    console.log(e)
  }
}
)

export const infoUpdate = createAsyncThunk("user/update" , async(user , thunkAPI) => {

  try{

    const token = thunkAPI.getState().auth.user.token;


    const data = await profileUpdate(user , token )


    if(data.error){
      return thunkAPI.rejectWithValue(data.error[0])
    }


    return data;

  }catch(e){
    console.log(e)
  }

})


export const userDetails = createAsyncThunk("users/details" , async(id , thunkAPI) => {

  try{

    const data = await getUserDetails(id)


    if(data.error){
      return thunkAPI.rejectWithValue(data.error[0])
    }


    return data;

  }catch(e){
    console.log(e)
  }

})


export const profileSlice = createSlice({
  name: "user", 
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(infoUser.pending , (state) => {
      state.error = false;
      state.loading =  true;
    }).addCase(infoUser.fulfilled , (state , action) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      state.user = action.payload;
    }).addCase(infoUpdate.pending , (state) => {
      state.loading = true;
      state.error = null;
      state.user = {};
    }).addCase(infoUpdate.fulfilled , (state , action) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      state.user = action.payload;
      state.message = "Usuário atualizado com sucesso!"
    }).addCase(infoUser.rejected , (state , action) => {
      state.loading = false;
      state.error = action.payload;
      state.user = {};
    }).addCase(userDetails.pending , (state) => {
      state.loading = true;
      state.error = false
    }).addCase(userDetails.fulfilled , (state , action) => {
      state.loading = false;
      state.error = false;
      state.success = true;
      state.user = action.payload;
    }).addCase(userDetails.rejected , (state , action) => {
      state.loading = false;
      state.error = action.payload;
      state.user = {};
    })
  }
})

export const { resetMessage } = profileSlice.actions;
export default profileSlice.reducer;  