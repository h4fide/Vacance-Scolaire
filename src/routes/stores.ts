import { writable } from 'svelte/store';

// Initialize stores with default values
export const selectedCalendarType = writable('general');
export const selectedFilter = writable('all');
export const lastVisitedUrl = writable('/general?fl=all');

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

// Theme store
export const isDarkMode = writable(
    typeof window !== 'undefined' 
        ? localStorage.getItem('theme') === 'dark' || !localStorage.getItem('theme')  // Default to dark if no theme is set
        : true  // Default to dark in SSR
);

isDarkMode.subscribe(dark => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('theme', dark ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark-mode', dark);
        // Also apply the class to the HTML element
        document.querySelector('html')?.classList.toggle('dark-mode', dark);
    }
});

// Initialize from localStorage if available
if (typeof window !== 'undefined') {
    const storedCalendar = localStorage.getItem('selectedCalendarType');
    const storedFilter = localStorage.getItem('selectedFilter');
    
    if (storedCalendar) selectedCalendarType.set(storedCalendar);
    if (storedFilter) selectedFilter.set(storedFilter);
}