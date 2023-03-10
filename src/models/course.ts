import {createModel} from '@rematch/core';
import type {RootModel} from './models';
import CourseService from '../services/course';
import QaService from '../services/qa';

type ComplexCourseState = {
  data: Array<any>;
};

export const course = createModel<RootModel>()({
  state: {
    data: [],
  } as ComplexCourseState,
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
      const response: any = await CourseService.getCourses();
      if (response.data) {
        dispatch.course.updateData(response.data);
      } else {
        dispatch.course.updateData([]);
      }
    },
  }),
});
