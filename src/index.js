import expect from 'expect';
import storeFactory from './store';

import {
  addError,
  clearError,
  changeSuggestions,
  clearSuggestions
} from './actions';

const store = storeFactory();

store.dispatch(
  addError('something went wrong')
);

expect(store.getState().errors)
  .toEqual(['something went wrong']);

store.dispatch(
  clearError(0)
);

expect(store.getState().errors)
  .toEqual([]);

store.dispatch(
  changeSuggestions(['One', 'Two', 'Three'])
);

expect(store.getState().resortNames.suggestions)
  .toEqual(['One', 'Two', 'Three']);

store.dispatch(clearSuggestions());

expect(store.getState().resortNames.suggestions).toEqual([]);
