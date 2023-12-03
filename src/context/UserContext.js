import { createContext } from "react";

const UserContext = createContext({
    id_user: 2,
    type_user: 2,
    uri_image_profile: "",
    name: ""
});

export default UserContext