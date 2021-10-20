import FilterConstants from '../constants/filter.constants';

const initialState = {
  statusBuyNow: false,
  statusHasBids: false,
  statusHasOffers: false,
  statusOnAuction: false,
  collections: [],
  category: null,
  groupType: 'all',
  sortBy: 'viewed',
};

export function Filter(state = initialState, action) {
  switch (action.type) {
    case FilterConstants.UPDATE_STATUS_FILTER: {
      const newState = { ...state };
      newState[action.field] = action.selected;
      return newState;
    }
    case FilterConstants.UPDATE_COLLECTIONS_FILTER: {
      return {
        ...state,
        collections: action.collections,
      };
    }
    case FilterConstants.UPDATE_CATEGORIES_FILTER: {
      return {
        ...state,
        category: action.category,
      };
    }
    case FilterConstants.UPDATE_GROUP_TYPE_FILTER: {
      return {
        ...state,
        groupType: action.groupType,
      };
    }
    case FilterConstants.UPDATE_SORT_BY_FILTER: {
      return {
        ...state,
        sortBy: action.sortBy,
      };
    }
    default: {
      return state;
    }
  }
}
