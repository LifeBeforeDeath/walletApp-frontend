import { configureStore } from "@reduxjs/toolkit";
import walletSlice from "./wallet-slice";
import transactionSlice from "./transaction-slice";

const store = configureStore({
    reducer:{
        wallet:walletSlice.reducer,
        transaction:transactionSlice.reducer
    }
});

export default store;