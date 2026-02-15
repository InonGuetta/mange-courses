import { toArray } from "../../utilities/toArray";

export const selectVisibleFavorites = (state) => toArray(state.favorites?.favorite);