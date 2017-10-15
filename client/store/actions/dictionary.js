import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_DICTONARY = 'GET_DICTONARY';
// const ADD_TO_DICTONARY = 'ADD_TO_DICTONARY';
// const REMOVE_FROM_DICTONARY = 'REMOVE_FROM_DICTONARY';
// const REMOVE_DICTONARY = 'REMOVE_DICTONARY';
// const UPDATE_DICTONARY = 'UPDATE_DICTONARY';

/**
 * ACTION CREATORS
 */
export const getDictionary = dictionary => ({ type: GET_DICTONARY, dictionary });
// const addToDictionary = word => ({ type: ADD_TO_DICTONARY, word });
// const removeFromDictionary = id => ({ type: REMOVE_FROM_DICTONARY, id });
// const updateDictionary = Word => ({ type: UPDATE_DICTONARY, Word });
// export const removeDictionary = () => ({ type: REMOVE_DICTONARY });

/**
 * REDUCER
 */
export default function reducer(dictionary = {}, action) {
  switch (action.type) {
    case GET_DICTONARY:
      return action.dictionary;

    // case ADD_TO_DICTONARY:
    //   return [action.word, ...dictionary];

    // case REMOVE_FROM_DICTONARY:
    //   return dictionary.filter(word => word.id !== action.id);

    // case REMOVE_DICTONARY:
    //   return [];

    // case UPDATE_DICTONARY:
    //   return dictionary.map((word) => {
    //     if (word.id === action.Word.id) return action.Word
    //     return word;
    //   });

    default:
      return dictionary;
  }
}

/**
 * THUNK CREATORS
 */

export const getDictionaryTC = () => (dispatch) => {
  console.log('getDictionaryTC')
  return axios.get('/dictionary.json')
    .then(res => {
      console.log(res.data)
      res.data
    })
    .then((dictionary) => {
      if (dictionary) dispatch(getDictionary({dictionary})); //testing
      else dispatch(getDictionary({}));
    })
    .catch(err => dispatch(getDictionary({})))
      // console.error('getting dictionary unsucessful', err));
};

// export const createItem = itemObj => (dispatch) => {
//   const { quantity, price, animalId, enhancementId } = itemObj;
//   return axios.post('/api/cart/item', { quantity, price, animalId, enhancementId })
//     .then(res => res.data)
//     .then((createdItem) => {
//       dispatch(addToDictionary(createdItem));
//     })
//     .catch(err => console.error('create item unsucessful', err));
// };

// export const updateWord = itemObj => (dispatch) => {
//   const { wordId, quantity } = itemObj;
//   return axios.put(`/api/cart/item/${wordId}`, { quantity })
//     .then(res => res.data)
//     .then(updateWord => dispatch(updateDictionary(word)))
//     .catch(err => console.error('updating item unsuccessful', err));
// }

// export const removeItem = id => (dispatch) => {
//   return axios.delete(`/api/cart/item/${id}`)
//     .then(() => dispatch(removeFromDictionary(id)))
//     .catch(err => console.error('removing item unsucessful', err));
// }
