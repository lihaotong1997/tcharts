import { createStore } from "vuex";
import state from "./state";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

import create from "./create/index";
const store = createStore({
    state,
    getters,
    mutations,
    actions,
    modules:{
        create,
    }
})
export default store;