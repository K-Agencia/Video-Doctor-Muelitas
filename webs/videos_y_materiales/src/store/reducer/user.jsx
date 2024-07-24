import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: null,
  children: {
    firstname: null,
    lastname: null,
    birthdate: null,
  },
  token: {
    AccessToken: null,
    IdToken: null,
    RefreshToken: null,
    ExpiresIn: null,
  }
}

export const userSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setDataUser: (state, action) => {
      state.id = action.payload.id
      state.children.firstname = action.payload.children.firstname;
      state.children.lastname = action.payload.children.lastname;
      state.children.birthdate = action.payload.children.birthdate;
      state.token.AccessToken = action.payload.token.AccessToken;
      state.token.IdToken = action.payload.token.IdToken;
      state.token.RefreshToken = action.payload.token.RefreshToken;
      state.token.ExpiresIn = action.payload.token.ExpiresIn;
    },
    deleteDataUser: (state) => {
      state.id = initialState.id
      state.children.firstname = initialState.children.firstname;
      state.children.lastname = initialState.children.lastname;
      state.children.birthdate = initialState.children.birthdate;
      state.token.AccessToken = initialState.token.AccessToken;
      state.token.IdToken = initialState.token.IdToken;
      state.token.RefreshToken = initialState.token.RefreshToken;
      state.token.ExpiresIn = initialState.token.ExpiresIn;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setDataUser, deleteDataUser } = userSlice.actions

export default userSlice.reducer