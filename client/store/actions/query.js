
/**
 * ACTION TYPES
 */
const UPDATE_QUERY = 'UPDATE_QUERY';

/**
 * ACTION CREATORS
 */
export const updateQuery = query => ({ type: UPDATE_QUERY, query })

/**
 * REDUCER
 */
export default function reducer(query = {}, action) {
  switch (action.type) {

    case UPDATE_QUERY:
      return action.query;

    default:
      return query;
  }
}

/**
 * THUNK CREATORS
 */

