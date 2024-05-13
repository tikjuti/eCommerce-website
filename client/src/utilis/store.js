import { createStore } from "redux";
import cartReducer from "../reducers/CartReducer";

const store = createStore(cartReducer);

export default store;
