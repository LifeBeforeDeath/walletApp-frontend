import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
    name:'wallet',
    initialState:{TransactionItems:[]},
    reducers:{
        replaceTransaction(state,action){
            state.TransactionItems = action.payload;
        },
        // addItemToWallet(state,action){
        //     const newItem = action.payload;
        //     const existingItem = state.walletItems.find((item)=>item.id === newItem.id);
        //     if(!existingItem){
        //         state.walletItems.push({
        //             id:newItem.id,
        //             name:newItem.name,
        //             accountNumber:newItem.accountNumber,
        //             description:newItem.description,
        //             priority:newItem.priority,
        //             currentBalance:0.00
        //         })
        //     }
        // },
        // removeItemFromWallet(state,action){
        //     const id = action.payload;
        //     state.walletItems = state.walletItems.filter((item)=> item.id !== id);

        // },
        // errorReducer(state,action){
        //     state.error = action.payload
        // },
        // updateToWallet(state,action){
        //     state.updateWallet = action.payload;
        // }
    }
});

export const transactionActions = transactionSlice.actions;
export default transactionSlice;