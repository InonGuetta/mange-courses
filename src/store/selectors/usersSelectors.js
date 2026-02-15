import { toArray } from "../../utilities/toArray";

export const selectVisibleUsers = (state) => toArray(state.users?.usersList); 