import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import uiReducer from "./uiSlice";
import userReducer from './userSlice'
import bagReducer from './bagSlice'
import themeReducer from './ThemeSlice'
import wishlistReducer from './wishlistSlice'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const rootReducer = combineReducers({
    ui: uiReducer,
    user: userReducer,
    bag: bagReducer,
    theme: themeReducer,
    wishlist: wishlistReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

// uncomment this to user persist
export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
})
export const persistor = persistStore(store);

// uncomment this to not use persist
// export const store = configureStore({
//     reducer: rootReducer,
//     middleware: getDefaultMiddleware =>
//     getDefaultMiddleware({
//         serializableCheck: false,
//     }),
// })