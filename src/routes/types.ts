export interface SchoolAndUniversityEvent {
    _id: number;
    eventname: string;
    start_date: string;
    end_date: string;
    days_number: number | string;
}

export interface OFPPTEvent {
    id: string;
    event_name: string;
    start_date: string;
    end_date: string;
    days_number: number;
}

export type CalendarEvent = SchoolAndUniversityEvent | OFPPTEvent;