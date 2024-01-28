import {createContext} from "react";
import {AuthenticationContextType} from "../types/AuthenticationContextType.tsx";

export default createContext<AuthenticationContextType>({} as AuthenticationContextType);
