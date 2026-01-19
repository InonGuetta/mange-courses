import { toFavoritesArray } from "../../domain/toFavoritesArray";

export const selectVisibleFavorites = (state) => {
    return toFavoritesArray(state.favorites?.favorite ?? []);
}