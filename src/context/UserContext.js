import { createContext } from "react";

const UserContext = createContext({
    id_user: 1,
    type_user: 1,
});

export default UserContext