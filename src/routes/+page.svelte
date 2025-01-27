<script lang="ts">
    import { onDestroy } from 'svelte';
    import { selectedCalendarType } from './stores';
    import type { CalendarEvent, SchoolAndUniversityEvent, OFPPTEvent } from './types';
    import schoolCalendar from '../database/Calendrier_Scolaire.json';
    import universityCalendar from '../database/Calendrier_Universitaire.json';
    import ofpptCalendar from '../database/Calendrier _OFPPT.json';
    
    $: calendarData = {
        school: schoolCalendar as SchoolAndUniversityEvent[],
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

    // Sort and categorize events
    $: events = {
        past: calendarData.filter(event => new Date(event.end_date) < today),
        current: calendarData.filter(event => 
            new Date(event.start_date) <= today && new Date(event.end_date) >= today
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

    let selectedFilter = 'all';
    
    $: filteredEvents = () => {
        switch(selectedFilter) {
            case 'current':
                return [...events.current, ...events.upcoming];
            case 'past':
                return events.past;
            default:
                return [...events.current, ...events.upcoming, ...events.past];
        }
    };
</script>

<main>
    <h1>
        {#if $selectedCalendarType === 'school'}
            School Calendar Events
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
    
    <div class="table-container">
        <select bind:value={selectedFilter} class="filter-select">
            <option value="all">All Events</option>
            <option value="current">Current & Upcoming</option>
            <option value="past">Past Events</option>
        </select>
        
        <table>
            <thead>
                <tr>
                    <th>Event Name</th>
                    <th>Date</th>
                    <th>Duration</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {#each filteredEvents() as event}
                    <tr class={new Date(event.end_date) < today ? 'past-event' : 
                             new Date(event.start_date) <= today && new Date(event.end_date) >= today ? 'current-event' : ''}>
                        <td>{getEventName(event)}</td>
                        <td>{formatDateRange(event.start_date, event.end_date)}</td>
                        <td>{getDaysText(event.days_number)}</td>
                        <td>
                            {#if new Date(event.end_date) < today}
                                <span class="status past">Past</span>
                            {:else if new Date(event.start_date) <= today && new Date(event.end_date) >= today}
                                <span class="status current">Current</span>
                            {:else}
                                <span class="status upcoming">{getRemainingDays(event.start_date)}</span>
                            {/if}
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</main>

<style>
    .table-container {
        margin: 2rem auto;
        max-width: 1200px;
        overflow-x: auto;
    }
    
    table {
        width: 100%;
        border-collapse: collapse;
        background: white;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    
    th, td {
        padding: 12px;
        text-align: left;
        border-bottom: 1px solid #ddd;
    }
    
    th {
        background-color: #f5f5f5;
        font-weight: bold;
    }
    
    .current-event {
        background-color: #e8f5e9;
    }
    
    .past-event {
        color: #666;
    }
    
    .status {
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 0.9em;
    }
    
    .status.current {
        background-color: #4caf50;
        color: white;
    }
    
    .status.upcoming {
        background-color: #2196f3;
        color: white;
    }
    
    .status.past {
        background-color: #9e9e9e;
        color: white;
    }

    .filter-select {
        margin-bottom: 1rem;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 1rem;
        background-color: white;
    }
</style>