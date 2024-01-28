import {createContext} from "react";

export type CalendarContextType = {
    active: Date;
}

export default createContext<CalendarContextType>({
    active: new Date()
});
