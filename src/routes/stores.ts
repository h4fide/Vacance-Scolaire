import { writable } from 'svelte/store';

// Initialize stores with default values
export const selectedCalendarType = writable('school');
export const selectedFilter = writable('all');
export const lastVisitedUrl = writable('/school?fl=all');

// Update stored URL and localStorage
export function updateStoredUrl(calendar: string, filter: string) {
    if (typeof window !== 'undefined') {
        const url = `/${calendar}?fl=${filter}`;
        localStorage.setItem('lastVisitedUrl', url);
        localStorage.setItem('selectedCalendarType', calendar);
        localStorage.setItem('selectedFilter', filter);
        lastVisitedUrl.set(url);
    }
}

// Initialize from localStorage if available
if (typeof window !== 'undefined') {
    const storedCalendar = localStorage.getItem('selectedCalendarType');
    const storedFilter = localStorage.getItem('selectedFilter');
    
    if (storedCalendar) selectedCalendarType.set(storedCalendar);
    if (storedFilter) selectedFilter.set(storedFilter);
}