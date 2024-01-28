import {createContext} from "react";

export type DashboardDrawerState = {
    toggle(): void,
    open: boolean;
}

export default createContext<DashboardDrawerState>({} as DashboardDrawerState);
