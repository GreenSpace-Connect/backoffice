import { TCommunityResponse } from '@/modules/master-data/communities/entities/response';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type InitialStateProps = {
  communityActived: TCommunityResponse['id'] | null;
};

export const userReducer = createSlice({
  name: 'userReducer',

  initialState: {
    communityActived: null,
  } as InitialStateProps,

  reducers: {
    chnageCommunityActived: (
      state,
      actions: PayloadAction<InitialStateProps['communityActived']>,
    ) => {
      state.communityActived = actions.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { chnageCommunityActived } = userReducer.actions;

export default userReducer.reducer;
