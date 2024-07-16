let initialState = [];

//load cart items from localstorage
if (typeof window !== 'undefined') {
    if (localStorage.getItem('cart')) {
        initialState = JSON.parse(localStorage.getItem('cart'));
    } else {
        initialState = [];
    }
}

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return action.payload;
        case 'CLEAR_CART':
            return [];
        case 'REMOVE_FROM_CART':
            return state.filter((item) => item._id !== action.payload._id);
        case 'INCREMENT_QUANTITY':
            return state.map((item) => (item._id === action.payload._id ? { ...item, count: item.count + 1 } : item));
        case 'DECREMENT_QUANTITY':
            return state.map((item) => (item._id === action.payload._id ? { ...item, count: item.count - 1 } : item));
        default:
            return state;
    }
};
