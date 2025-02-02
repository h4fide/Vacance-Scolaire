<script lang="ts">
    import { onDestroy } from 'svelte';
    import { selectedCalendarType, selectedFilter, updateStoredUrl } from './stores';
    import type { CalendarEvent, SchoolAndUniversityEvent, OFPPTEvent } from './types';
    import schoolCalendar from '../database/Calendrier_Scolaire.json';
    import universityCalendar from '../database/Calendrier_Universitaire.json';
    import ofpptCalendar from '../database/Calendrier _OFPPT.json';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import '../app.css';
    import CalendarComparison from '$lib/components/CalendarComparison.svelte';
    
    $: calendarData = {
        general: schoolCalendar as SchoolAndUniversityEvent[],
        university: universityCalendar as SchoolAndUniversityEvent[],
        ofppt: ofpptCalendar as OFPPTEvent[]
    }[$selectedCalendarType] || [];

    // Helper function to get event name regardless of property name
    function getEventName(event: CalendarEvent): string {
        return 'eventname' in event ? event.eventname : event.event_name;
    }

    const today = new Date();
    
    
    // Helper function to handle plural days with proper typing
    function getDaysText(days: string | number): string {
        const numDays = typeof days === 'string' ? parseInt(days) : days;
        return numDays === 1 ? '1 day' : `${days} days`;
    }

    // Calculate remaining days with error handling
    function getRemainingDays(startDate: string): string {
        try {
            const start = new Date(startDate);
            const diff = start.getTime() - today.getTime();
            const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
            return days === 1 ? 'Tomorrow' : `In ${days} days`;
        } catch (error) {
            return 'Date error';
        }
    }

    function formatDate(dateString: string): string {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('fr-FR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        // Capitalize first letter of day and month
        return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }

    function formatDateRange(startDate: string, endDate: string): string {
        const start = formatDate(startDate);
        const end = formatDate(endDate);
        return startDate === endDate ? start : `${start} - ${end}`;
    }

    // Add this new helper function to adjust end dates to end of day
    function getEndOfDay(dateString: string): Date {
        const date = new Date(dateString);
        date.setHours(23, 59, 59, 999);
        return date;
    }

    // Sort and categorize events
    $: events = {
        past: calendarData.filter(event => getEndOfDay(event.end_date) < today)
            .sort((a, b) => getEndOfDay(b.end_date).getTime() - getEndOfDay(a.end_date).getTime()), // Changed to descending order
        current: calendarData.filter(event => 
            new Date(event.start_date) <= today && getEndOfDay(event.end_date) >= today
        ),
        upcoming: calendarData.filter(event => new Date(event.start_date) > today)
            .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())
    };

    // Make nextEvent reactive
    $: nextEvent = events.upcoming?.[0];

    // Add these new functions for countdown
    function getNextEvent() {
        return events.upcoming[0];
    }

    function calculateTimeLeft(targetDate: string) {
        const now = new Date().getTime();
        const target = new Date(targetDate).getTime();
        const difference = target - now;

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((difference % (1000 * 60)) / 1000)
        };
    }

    // Initialize timeLeft
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    let intervalId: number;

    // Cleanup previous interval when component is destroyed
    onDestroy(() => {
        if (intervalId) clearInterval(intervalId);
    });

    // Update countdown reactively
    $: if (nextEvent) {
        if (intervalId) clearInterval(intervalId);
        intervalId = setInterval(() => {
            timeLeft = calculateTimeLeft(nextEvent.start_date);
        }, 1000);
    }

    $: filteredEvents = () => {
        const currentAndUpcoming = [...events.current, ...events.upcoming];
        const past = events.past;
        
        switch($selectedFilter) {
            case 'current':
                return { currentAndUpcoming, past: [] };
            case 'past':
                return { currentAndUpcoming: [], past };
            default:
                return { currentAndUpcoming, past };
        }
    };

    // Add this new helper function
    function getDaysAgo(endDate: string): string {
        try {
            const end = new Date(endDate);
            const diff = today.getTime() - end.getTime();
            const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
            return days === 1 ? 'Yesterday' : `${days} days ago`;
        } catch (error) {
            return 'Date error';
        }
    }

    // Sync filter with URL parameter
    $: {
        const urlFilter = $page.url.searchParams.get('fl');
        if (urlFilter && ['all', 'current', 'past'].includes(urlFilter)) {
            $selectedFilter = urlFilter;  // Use $ to update store value
        }
    }

    // Update URL and storage when filter changes
    $: if ($selectedFilter) {
        const url = new URL(window.location.href);
        url.searchParams.set('fl', $selectedFilter);
        updateStoredUrl($selectedCalendarType, $selectedFilter);
        goto(url.toString(), { replaceState: true });
    }

    // Update the TR class binding to use the same end of day logic
    function isCurrentEvent(event: CalendarEvent): boolean {
        return new Date(event.start_date) <= today && getEndOfDay(event.end_date) >= today;
    }
</script>

<main class="page-container">
    <h1>
        {#if $selectedCalendarType === 'general'}
            General Calendar Events
        {:else if $selectedCalendarType === 'university'}
            University Calendar Events
        {:else}
            OFPPT Calendar Events
        {/if}
    </h1>

    {#if nextEvent}
        <div class="countdown-box">
            <h2 class="countdown-title">{getEventName(nextEvent)}</h2>
            <div class="countdown-timer">
                <div class="countdown-item">
                    <div class="countdown-number">{timeLeft.days}</div>
                    <div class="countdown-label">Days</div>
                </div>
                <div class="countdown-item">
                    <div class="countdown-number">{timeLeft.hours}</div>
                    <div class="countdown-label">Hours</div>
                </div>
                <div class="countdown-item">
                    <div class="countdown-number">{timeLeft.minutes}</div>
                    <div class="countdown-label">Minutes</div>
                </div>
                <div class="countdown-item">
                    <div class="countdown-number">{timeLeft.seconds}</div>
                    <div class="countdown-label">Seconds</div>
                </div>
            </div>
        </div>
    {/if}
    
    <div class="table-container main-content">
        <select bind:value={$selectedFilter} class="filter-select">
            <option value="all">All Events</option>
            <option value="current">Current & Upcoming</option>
            <option value="past">Past Events</option>
        </select>
        
        <table>
            <thead>
                <tr>
                    <th>Event Name</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Duration</th>
                </tr>
            </thead>
            <tbody>
                {#each filteredEvents().currentAndUpcoming as event}
                    <tr class={isCurrentEvent(event) ? 'current-event' : ''}>
                        <td>{getEventName(event)}</td>
                        <td>
                            {#if isCurrentEvent(event)}
                                <span class="status current">Current</span>
                            {:else}
                                <span class="status upcoming">{getRemainingDays(event.start_date)}</span>
                            {/if}
                        </td>
                        <td>{formatDateRange(event.start_date, event.end_date)}</td>
                        <td>{getDaysText(event.days_number)}</td>
                    </tr>
                {/each}

                {#if filteredEvents().currentAndUpcoming.length > 0 && filteredEvents().past.length > 0}
                    <tr class="separator">
                        <td colspan="4">
                            <div class="dots">
                                <span>•</span>
                                <span>•</span>
                                <span>•</span>
                            </div>
                        </td>
                    </tr>
                {/if}

                {#each filteredEvents().past as event}
                    <tr class="past-event">
                        <td>{getEventName(event)}</td>
                        <td>
                            <span class="status past">{getDaysAgo(event.end_date)}</span>
                        </td>
                        <td>{formatDateRange(event.start_date, event.end_date)}</td>
                        <td>{getDaysText(event.days_number)}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>

    <CalendarComparison />
</main>