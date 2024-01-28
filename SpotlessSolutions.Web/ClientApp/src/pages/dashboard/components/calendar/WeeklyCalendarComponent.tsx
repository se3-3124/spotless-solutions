import {useContext} from "react";

import Grid from "@mui/material/Grid";

import CalendarContext from "../../../../contexts/CalendarContext.ts";

import "./WeeklyCalendarComponent.style.scss";

type WeekCalendarType = {
    date: Date,
    isToday: boolean;
}

export default function WeeklyCalendarComponent() {
    const { active } = useContext(CalendarContext);

    const isToday = (date: Date): boolean => {
        const today = new Date();
        return today.getDate() === date.getDate()
            && today.getMonth() === date.getMonth()
            && today.getFullYear() === date.getFullYear();
    }
    
    const makeWeekCalendar = (): WeekCalendarType[] => {
        const calendar: WeekCalendarType[] = [];
        
        const currentDay = active.getDay();
        
        for (let i = currentDay; i > 0; i--) {
            const current = new Date(active.getFullYear(), active.getMonth(), active.getDate() - 1);
            calendar.push({
                date: current,
                isToday: isToday(current)
            });
        }
        
        calendar.push({
            date: active,
            isToday: isToday(active)
        });
        
        for (let i = (currentDay + 1); i < 7; i++) {
            const current = new Date(active.getFullYear(), active.getMonth(), active.getDate() + i);
            calendar.push({
                date: current,
                isToday: isToday(current)
            });
        }
        
        return calendar;
    }
    
    return (
        <Grid container>
            {
                ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((w, i) => (
                    <Grid xs={1.7} key={`wkn-${i}`}>
                        <div className="weekly-calendar-week-field">
                            <p>{w}</p>
                        </div>
                    </Grid>
                ))
            }
            {
                makeWeekCalendar().map((d, i) => (
                    <Grid xs={1.7} key={`wkc-${i}`}>
                        <div className={`weekly-component${d.isToday ? ' today' : ''}`}>
                            <p>{d.date.getDate()}</p>
                        </div>
                    </Grid>
                ))
            }
        </Grid>
    )
}
