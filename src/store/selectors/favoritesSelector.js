import { toArray } from "../../domain/toArray";

export const selectVisibleFavorites = (state) => toArray(state.favorites?.favorite);