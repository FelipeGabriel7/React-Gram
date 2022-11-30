import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  deletePhotoService,
  editPhotoService,
  getPhoto,
  getPhotosService,
  photoService,
  likedPhoto,
  commentsPhotos,
  getAllPhotos,
  searchPhoto
} from "../services/photoService";

const initialState = {
  photos: [],
  photo: {},
  error: false,
  loading: false,
  success: false,
  message: null,
};

export const photosUser = createAsyncThunk(
  "photos/get",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await getPhotosService(id, token);

    if (data.error) {
      return thunkAPI.rejectWithValue(data.error[0]);
    }

    return data;
  }
);

export const photosPublish = createAsyncThunk(
  "photos/publish",
  async (photo, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService(photo, token);

    if (data.error) {
      return thunkAPI.rejectWithValue(data.error[0]);
    }

    return data;
  }
);

export const photosDelete = createAsyncThunk(
  "photos/delete",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await deletePhotoService(id, token);

    if (data.error) {
      return thunkAPI.rejectWithValue(data.error[0]);
    }

    return data;
  }
);

export const photosUpdate = createAsyncThunk(
  "photos/update",
  async (photo, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await editPhotoService(
      { title: photo.title },
      photo.id,
      token
    );

    if (data.error) {
      return thunkAPI.rejectWithValue(data.error[0]);
    }

    return data;
  }
);

export const photosOne = createAsyncThunk(
  "photos/photo",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await getPhoto(id, token);

    return data;
  }
);

export const likedPhotos = createAsyncThunk(
  "photos/like",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await likedPhoto(id, token);

    if (data.error) {
      return thunkAPI.rejectWithValue(data.error[0]);
    }

    return data;
  }
);

export const commentsPhoto = createAsyncThunk("photos/comments" , async(data , thunkAPI) => {

  const token = thunkAPI.getState().auth.user.token;
  const d = await commentsPhotos({comment: data.comment} , data.id , token)

  if(d.error){
    return thunkAPI.rejectWithValue(data.error[0])
  }

  return d;

})


export const allPhotos = createAsyncThunk("photos/all" , async() => {


  const d = await getAllPhotos()

  return d;

})


export const searchSlice = createAsyncThunk("photos/search" , async(data , thunkAPI) => {

  const token = thunkAPI.getState().auth.user.token

  const d = await searchPhoto(data , token)

  if(d.error){
    return thunkAPI.rejectWithValue(data.error[0])
  }

  return d;


})

export const photoSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(photosPublish.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(photosPublish.rejected, (state, action) => {
        state.loading = false;
        state.photo = {};
        state.error = action.payload;
        state.sucess = false;
      })
      .addCase(photosPublish.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.error = null;
        state.photo = action.payload;
        state.photos.unshift(state.photo);
        state.message = " Foto adicionada com sucesso ! ";
      })
      .addCase(photosUser.rejected, (state, action) => {
        state.loading = false;
        state.photo = {};
        state.error = action.payload;
        state.sucess = false;
      })
      .addCase(photosUser.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.error = null;
        state.photos = action.payload;
      })
      .addCase(photosUser.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(photosDelete.rejected, (state, action) => {
        state.loading = false;
        state.photo = {};
        state.error = action.payload;
        state.sucess = false;
      })
      .addCase(photosDelete.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.error = null;
        state.photos = state.photos.filter(
          (photo) => photo._id !== action.payload._id
        );
        state.message = " Foto Deletada com sucesso ! ";
      })
      .addCase(photosDelete.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(photosUpdate.rejected, (state, action) => {
        state.loading = false;
        state.photo = {};
        state.error = action.payload;
        state.sucess = false;
      })
      .addCase(photosUpdate.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.error = null;

        state.message = " Foto Editada com sucesso ! ";

        state.photos.map((photo) => {
          if (photo._id === action.payload.photo._id) {
            return (photo.title = action.payload.photo.title);
          }

          return photo;
        });
      })
      .addCase(photosUpdate.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(photosOne.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(photosOne.rejected, (state, action) => {
        state.loading = false;
        state.photo = {};
        state.error = action.payload;
        state.success = false;
      })
      .addCase(photosOne.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.error = null;
        state.photo = action.payload;
      })
      .addCase(likedPhotos.rejected, (state, action) => {
        state.loading = false;
        state.photo = {};
        state.error = action.payload;
        state.success = false;
      })
      .addCase(likedPhotos.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.error = null;

        if (state.photo.likes) {
          state.photo.likes.push(action.payload.userId);
        }

        state.photos.map((photo) => {
          if (photo._id === action.payload.photo.photoId) {
            return photo.likes.push(action.payload.userId);
          }

          return photo;
        });

        state.message = " A foto foi curtida ! "

      }).addCase(commentsPhoto.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.error = null;
      
        state.photo.comments.push(action.payload.comment)

        state.message = " Foto Deletada com sucesso ! ";
      })
      .addCase(commentsPhoto.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(commentsPhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      }).addCase(allPhotos.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.error = null;
        state.photos = action.payload;
      })
      .addCase(allPhotos.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(allPhotos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      }).addCase(searchSlice.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.error = null;
        state.photos = action.payload;
      })
      .addCase(searchSlice.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(searchSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
  },
});

export const { resetMessage } = photoSlice.actions;
export default photoSlice.reducer;
