import { TEventParams } from '@/modules/master-data/events/entities/request';
import { TGreenPlaceParams } from '@/modules/master-data/green-places/entities/request';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type InitialStateProps = TEventParams & TGreenPlaceParams;

export const searchFilterReducer = createSlice({
  name: 'searchFilterReducer',

  initialState: {} as InitialStateProps,

  reducers: {
    changeSearchFilter: (state, actions: PayloadAction<InitialStateProps>) => {
      return {
        page: 1,
        ...actions.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeSearchFilter } = searchFilterReducer.actions;

export default searchFilterReducer.reducer;
