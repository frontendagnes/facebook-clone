export const initialState = {
  user: null,
  likes: [],
};
//Selector sum of the prices in the like
export const getLikeTotal = (likes) =>
  likes?.reduce((sum, item) => item.data.like + sum, 0);

export const getLikeElement = (likes, user) => 
    likes?.some((item) => { return item.data.id === user.uid})

export const actionTypes = {
  SET_USER: "SET_USER",
  DELETE_USER: "DELETE_USER",
  ADD_LIKE: "ADD_LIKE",
  REMOVE_LIKE: "REMOVE_LIKE",
  SET_LIKE: "SET_LIKE",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.DELETE_USER:
      return {
        ...state,
        user: null,
      };
    case actionTypes.SET_LIKE:
      return{
        ...state,
        likes: action.item
      }
    case actionTypes.ADD_LIKE:
      return {
        ...state,
        likes: [...state.likes, action.item],
      };
    case actionTypes.REMOVE_LIKE:
      const index = state.likes.findIndex(
        (likeItem) => likeItem.id === action.id
      );
      let newLikes = [...state.likes];
      if (index >= 0) {
        newLikes.splice(index, 1);
      } else {
        console.warn(`Cant remove your LIKE (id: ${action.id})`);
      }
      return {
        ...state,
        likes: newLikes,
      };
    default:
      return state;
  }
};

export default reducer;
