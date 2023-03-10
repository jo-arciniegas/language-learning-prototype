import {createModel} from '@rematch/core';
import type {RootModel} from './models';
import CourseService from '../services/course';
import QaService from '../services/qa';

type ComplexQaState = {
  data: Array<any>;
};

export const qa = createModel<RootModel>()({
  state: {
    data: [],
  } as ComplexQaState,
  reducers: {
    updateData(state, payload: Array<any>) {
      return {
        ...state,
        data: payload,
      };
    },
  },
  effects: dispatch => ({
    async getDataAsync() {
      const response: any = await QaService.getQas();
      if (response.data) {
        dispatch.qa.updateData(response.data);
      } else {
        dispatch.qa.updateData([]);
      }
    },
  }),
});
