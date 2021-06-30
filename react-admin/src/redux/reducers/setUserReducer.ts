import { User } from "../../models/user";

export const setUserReducer = (state = { user: new User() }, action: { type: string, user: User }) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...StaticRange,
                user: action.user
            }
        default:
            return state;
    }
}