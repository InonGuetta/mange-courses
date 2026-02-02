import { toArray } from "../../domain/toArray";

export const selectVisibleUsers = (state) => toArray(state.users?.usersList);