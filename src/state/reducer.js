import { LOAD } from './constants';

export const reducer = (state, action) => {
  switch (action.type) {
    case LOAD:
      return state = action.data;

    default:
      return state;
  }
}