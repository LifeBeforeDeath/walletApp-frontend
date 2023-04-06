import { configureStore } from "@reduxjs/toolkit";
import walletSlice from "./wallet-slice";
import transactionSlice from "./transaction-slice";
import userSlice from "./user-slice";

const store = configureStore({
    reducer:{
        wallet:walletSlice.reducer,
        transaction:transactionSlice.reducer,
        user:userSlice.reducer
    }
});

export default store;