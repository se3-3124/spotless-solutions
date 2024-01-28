import {useContext} from "react";

import Grid from "@mui/material/Grid";

import CalendarContext from "../../../../contexts/CalendarContext.ts";

import "./CalendarComponent.style.scss";

type CalendarObject = {
    date: Date,
    isToday: boolean
}

export default function CalendarComponent() {
    const { active } = useContext(CalendarContext);
    
    const getFirstDayOfMonth = () => {
        return new Date(active.getFullYear(), active.getMonth(), 1)
            .getDay();
    }

    const getLastDayOfMonth = () => {
        const year = active.getFullYear();
        const month = active.getMonth();
        const lastDate = new Date(year, month + 1, 0)
            .getDate()
        return new Date(year, month, lastDate).getDay();
    }
    
    const isToday = (date: Date): boolean => {
        const today = new Date();
        return today.getDate() === date.getDate()
            && today.getMonth() === date.getMonth()
            && today.getFullYear() === date.getFullYear();
    }

    const getPreviousMonthDates = (): CalendarObject[] => {
        const data: CalendarObject[] = [];
        const year = active.getFullYear();
        const month = active.getMonth();
        
        const monthLastDate = new Date(year, month, 0)
            .getDate();
        
        for (let i = getFirstDayOfMonth(); i > 0; i--) {
            const date = new Date(year, month - 1, monthLastDate - i + 1);
            data.push({ date, isToday: isToday(date) })
        }
        
        return data;
    }
    
    const getCurrentMonthDates = (): CalendarObject[] => {
        const data: CalendarObject[] = [];
        const year = active.getFullYear();
        const month = active.getMonth();
        
        const lastDate = new Date(year, month + 1, 0).getDate();
        
        for (let i = 1; i <= lastDate; i++) {
            data.push({
                date: new Date(year, month, i),
                isToday: isToday(new Date(year, month, i))
            });
        }
        
        return data;
    }
    
    const getFirstDatesNextMonth = (): CalendarObject[] => {
        const data: CalendarObject[] = [];
        const year = active.getFullYear();
        const month = active.getMonth();
        
        const dayEnd = getLastDayOfMonth();
        
        for (let i = dayEnd; i < 6; i++) {
            data.push({
                date: new Date(year, month, i - dayEnd + 1),
                isToday: isToday(new Date(year, month, i - dayEnd + 1))
            });
        }
        
        return data;
    }

    return (
        <Grid container spacing={0}>
            {
                ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((w, i) => (
                    <Grid xs={1.7} key={`wkn-${i}`}>
                        <div className="calendar-week-field">
                            <p>{w}</p>
                        </div>
                    </Grid>
                ))
            }
            {
                getPreviousMonthDates().map((d, i) => (
                    <Grid xs={1.7} key={`p-${i}`}>
                        <div className={`calendar-item${d.isToday ? ' today' : ''}`}>
                            <p className="inactive">{d.date.getDate()}</p>
                        </div>
                    </Grid>
                ))
            }
            {
                getCurrentMonthDates().map((d, i) => (
                    <Grid xs={1.7} key={`c-${i}`}>
                        <div className={`calendar-item${d.isToday ? ' today' : ''}`}>
                            {d.date.getDate()}
                        </div>
                    </Grid>
                ))
            }
            {
                getFirstDatesNextMonth().map((d, i) => (
                    <Grid xs={1.7} key={`n-${i}`}>
                        <div className={`calendar-item${d.isToday ? ' today' : ''}`}>
                            <p className="inactive">{d.date.getDate()}</p>
                        </div>
                    </Grid>
                ))
            }
        </Grid>
    )
}
