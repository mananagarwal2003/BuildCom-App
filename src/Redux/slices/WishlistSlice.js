const {createSlice} =require("@reduxjs/toolkit")
const WishlistSlice =createSlice({
    name:'Wishlist',
    initialState:{
        data:[],
    },
    reducers:{
        addItemToWishList(state,action){
            let tempData=state.data;
            tempData.push(action.payload);
            state.data=tempData;
        },
        removeItemFromList(state, action) {
            let tempData = state.data;
            tempData.splice(action.payload);
            state.data = tempData;
          },
    }
})

export const {addItemToWishList,removeItemFromList}=WishlistSlice.actions;
export default WishlistSlice.reducer;