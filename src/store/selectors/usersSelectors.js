import { toUsersArray } from "../../domain/toUsersArray";

export const selectVisibleUsers = (state) =>{
    const usersList = state.users?.usersList ?? [];
    return toUsersArray(usersList);
}