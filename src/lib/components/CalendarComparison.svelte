<script lang="ts">
    import { onMount } from 'svelte';
    import { isDarkMode } from '../../routes/stores';
    
    type Event = {
        _id?: string | number;
        id?: string | number;
        eventname?: string;
        event_name?: string;
        start_date: string;
        end_date: string;
        days_number: number | string;
    };

    let generalData: Event[] = [];
    let universityData: Event[] = [];
    let ofpptData: Event[] = [];
    let loading = true;
    let error: string | null = null;

    // Function to get all unique dates and sort them
    function getAllDates(general: Event[], university: Event[], ofppt: Event[]): string[] {
        const dates = new Set<string>();
        [...general, ...university, ...ofppt].forEach(event => {
            dates.add(event.end_date);
        });
        return Array.from(dates).sort();
    }

    // Add helper function to adjust end dates to end of day
    function getEndOfDay(dateString: string): Date {
        const date = new Date(dateString);
        date.setHours(23, 59, 59, 999);
        return date;
    }

    // Function to find event for a specific date
    function findEventByDate(events: Event[], date: string): Event | null {
        return events.find(event => getEndOfDay(event.end_date).getTime() === getEndOfDay(date).getTime()) || null;
    }

    // Update isEventInPast function
    function isEventInPast(event: Event): boolean {
        const today = new Date();
        return getEndOfDay(event.end_date) < today;
    }

    // Update isEventCurrent function
    function isEventCurrent(event: Event): boolean {
        const today = new Date();
        const startDate = new Date(event.start_date);
        return startDate <= today && getEndOfDay(event.end_date) >= today;
    }

    // Update isUpcomingEvent function
    function isUpcomingEvent(event: Event): boolean {
        const today = new Date();
        const startDate = new Date(event.start_date);
        return startDate > today;
    }

    // Add this helper function
    function hasCurrentEvents(general: Event[], university: Event[], ofppt: Event[]): boolean {
        return [...general, ...university, ...ofppt].some(event => isEventCurrent(event));
    }

    let uniqueDates: string[] = [];

    onMount(async () => {
        try {
            const responses = await Promise.all([
                fetch('https://vacance-scolaire.pages.dev/api/general'),
                fetch('https://vacance-scolaire.pages.dev/api/university'),
                fetch('https://vacance-scolaire.pages.dev/api/ofppt')
            ]);

            [generalData, universityData, ofpptData] = await Promise.all(
                responses.map(res => res.json())
            );

            // Sort data by ID after fetching
            generalData = generalData.sort((a, b) => Number(a._id) - Number(b._id));
            universityData = universityData.sort((a, b) => Number(a._id) - Number(b._id));
            ofpptData = ofpptData.sort((a, b) => Number(b.id) - Number(b.id));

            uniqueDates = getAllDates(generalData, universityData, ofpptData);
            loading = false;
        } catch (err) {
            error = 'Failed to fetch data';
            loading = false;
        }
    });

    function formatDate(dateString: string): string {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    }

    // Add new state for mobile navigation
    let activeMobileSection: 'general' | 'university' | 'ofppt' = 'general';
</script>

{#if loading}
    <div class="loading">Loading...</div>
{:else if error}
    <div class="error">{error}</div>
{:else}
    <div class="calendar-comparison">
        <!-- Mobile Navigation -->
        <div class="mobile-nav">
            <button 
                class="mobile-nav-btn general {activeMobileSection === 'general' ? 'active' : ''}"
                on:click={() => activeMobileSection = 'general'}
            >
                General Education
            </button>
            <button 
                class="mobile-nav-btn university {activeMobileSection === 'university' ? 'active' : ''}"
                on:click={() => activeMobileSection = 'university'}
            >
                University
            </button>
            <button 
                class="mobile-nav-btn ofppt {activeMobileSection === 'ofppt' ? 'active' : ''}"
                on:click={() => activeMobileSection = 'ofppt'}
            >
                OFPPT
            </button>
        </div>

        <!-- Desktop Header (hidden on mobile) -->
        <div class="comparison-header">
            <div class="header-item general">General Education</div>
            <div class="header-item university">University</div>
            <div class="header-item ofppt">OFPPT</div>
        </div>

        <!-- Calendar Items -->
        <div class="comparison-grid" data-active-section={activeMobileSection}>
            {#each uniqueDates as date, index}
                {@const gEvent = findEventByDate(generalData, date)}
                {@const uEvent = findEventByDate(universityData, date)}
                {@const oEvent = findEventByDate(ofpptData, date)}
                {@const hasCurrentEvent = (gEvent && isEventCurrent(gEvent)) || 
                                        (uEvent && isEventCurrent(uEvent)) || 
                                        (oEvent && isEventCurrent(oEvent))}
                {@const isUpcoming = (gEvent && isUpcomingEvent(gEvent)) || 
                                    (uEvent && isUpcomingEvent(uEvent)) || 
                                    (oEvent && isUpcomingEvent(oEvent))}
                
                <!-- Add the NEXT separator -->
                {#if isUpcoming && 
                    ((hasCurrentEvents(generalData, universityData, ofpptData) && 
                    !hasCurrentEvent && 
                    !uniqueDates.slice(0, index).some(d => 
                        findEventByDate(generalData, d) && isUpcomingEvent(findEventByDate(generalData, d)!) ||
                        findEventByDate(universityData, d) && isUpcomingEvent(findEventByDate(universityData, d)!) ||
                        findEventByDate(ofpptData, d) && isUpcomingEvent(findEventByDate(ofpptData, d)!)
                    )) ||
                    (!hasCurrentEvents(generalData, universityData, ofpptData) && 
                    !uniqueDates.slice(0, index).some(d => 
                        findEventByDate(generalData, d) && isUpcomingEvent(findEventByDate(generalData, d)!) ||
                        findEventByDate(universityData, d) && isUpcomingEvent(findEventByDate(universityData, d)!) ||
                        findEventByDate(ofpptData, d) && isUpcomingEvent(findEventByDate(ofpptData, d)!)
                    )))}
                    <div class="next-separator">
                        <span class="next-label">NEXT</span>
                    </div>
                {/if}

                <div class="comparison-row {hasCurrentEvent ? 'has-current' : ''} {isUpcoming ? 'upcoming' : ''}">
                    {#if hasCurrentEvent}
                        <div class="current-indicator">
                            <span class="current-tag">CURRENT</span>
                        </div>
                    {/if}
                    
                    <div class="event-row {gEvent ? '' : 'empty'} 
                        {gEvent && isEventInPast(gEvent) ? 'past' : ''} 
                        {gEvent && isEventCurrent(gEvent) ? 'current' : ''}">
                        {#if gEvent}
                            <div class="event-name">{gEvent.eventname}</div>
                            <div class="date-block general">
                                <div>Start: {formatDate(gEvent.start_date)}</div>
                                <div>End: {formatDate(gEvent.end_date)}</div>
                            </div>
                            <div class="event-duration">Duration: {gEvent.days_number} days</div>
                        {/if}
                    </div>

                    <div class="event-row {uEvent ? '' : 'empty'} 
                        {uEvent && isEventInPast(uEvent) ? 'past' : ''} 
                        {uEvent && isEventCurrent(uEvent) ? 'current' : ''}">
                        {#if uEvent}
                            <div class="event-name">{uEvent.eventname}</div>
                            <div class="date-block university">
                                <div>Start: {formatDate(uEvent.start_date)}</div>
                                <div>End: {formatDate(uEvent.end_date)}</div>
                            </div>
                            <div class="event-duration">Duration: {uEvent.days_number} days</div>
                        {/if}
                    </div>

                    <div class="event-row {oEvent ? '' : 'empty'} 
                        {oEvent && isEventInPast(oEvent) ? 'past' : ''} 
                        {oEvent && isEventCurrent(oEvent) ? 'current' : ''}">
                        {#if oEvent}
                            <div class="event-name">{oEvent.event_name}</div>
                            <div class="date-block ofppt">
                                <div>Start: {formatDate(oEvent.start_date)}</div>
                                <div>End: {formatDate(oEvent.end_date)}</div>
                            </div>
                            <div class="event-duration">Duration: {oEvent.days_number} days</div>
                        {/if}
                    </div>
                </div>
                {#if isUpcoming && index < uniqueDates.length - 1}
                    <div class="row-separator"></div>
                {/if}
            {/each}
        </div>
    </div>
{/if}

<style>
    .calendar-comparison {
        max-width: 1024px;
        margin: 2rem auto;
        padding: 1rem;
    }

    .comparison-row {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
        position: relative; /* Add position relative */
    }

    .current-indicator {
        position: absolute;
        left: -40px;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        align-items: center;
        z-index: 1;
    }

    .current-tag {
        background-color: #22c55e;
        color: white;
        padding: 8px 4px;
        border-radius: 4px;
        font-size: 0.75rem;
        font-weight: bold;
        writing-mode: vertical-rl;
        text-orientation: mixed;
        transform: rotate(180deg);
        letter-spacing: 1px;
    }

    .comparison-header {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
        margin-bottom: 1.5rem;
    }

    .header-item {
        padding: 0.5rem;
        text-align: center;
        font-weight: bold;
        border-radius: 0.375rem;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }


    .header-item.general { 
        background: linear-gradient(120deg, #00c0a0, #006083);
        color: white;

    }
    .header-item.university { 
        background: linear-gradient(120deg, #9000d3, #3f006c);
        color: white;
    }
    .header-item.ofppt { 
        background: linear-gradient(120deg, #0031d3, #00196c);
        color: white;
    }

    .comparison-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
        align-items: start;
    }

    .comparison-row {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
    }


    .event-row {
        min-height: 140px; /* Set a fixed minimum height for consistency */
        background-color: var(--bg-color);
        padding: 1rem;
        border-radius: 0.5rem;
        border: 1px solid var(--border-color);
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        transition: all 0.3s ease;
    }

    .event-row.empty {
        background-color: transparent;
        border: 1px dashed var(--border-color);
        opacity: 0.5;
    }

    .event-row.past {
        filter: grayscale(100%);
        opacity: 0.4;
        transition: opacity 0.3s ease;
    }

    .event-row.past:hover {
        opacity: 0.95;
    }

    .event-row.past .date-block {
        background: var(--header-bg) !important;
        border: 1px solid var(--border-color);
        color: var(--text-color) !important; /* Add this line to ensure text visibility */
    }

    .event-row.current {
        position: relative;
        border: 1px solid rgba(34, 197, 94, 0.3);
        background-color: color-mix(in srgb, var(--bg-color) 95%, rgb(34 197 94));
        box-shadow: 0 0 15px rgba(34, 197, 94, 0.2);
        animation: glowPulse 2s ease-in-out infinite;
        transition: all 0.3s ease;
    }

    .event-row.current:hover {
        transform: scale(1.02);
        box-shadow: 0 0 20px rgba(34, 197, 94, 0.3);
    }

    @keyframes glowPulse {
        0% {
            box-shadow: 0 0 15px rgba(34, 197, 94, 0.2);
        }
        50% {
            box-shadow: 0 0 25px rgba(34, 197, 94, 0.4);
        }
        100% {
            box-shadow: 0 0 15px rgba(34, 197, 94, 0.2);
        }
    }

    .event-name {
        font-weight: bold;
        margin-bottom: 0.5rem;
    }

    .date-block {
        padding: 0.75rem;
        border-radius: 0.375rem;
        color: white;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    }

    .date-block.general { 
        background: linear-gradient(160deg, #00c0a0, #006083);
        color: white;
    }
    .date-block.university { 
        background: linear-gradient(160deg, #9000d3, #3f006c);
        color: white;
    }
    .date-block.ofppt { 
        background: linear-gradient(160deg, #0031d3, #00196c);
        color: white;
    }

    .event-duration {
        margin-top: 0.5rem;
        font-size: 0.875rem;
        color: var(--text-color);
    }

    .loading, .error {
        text-align: center;
        padding: 2rem;
        color: var(--text-color);
    }

    .error {
        color: #dc2626;
    }

    .row-separator {
        display: none;
    }

    .next-separator {
        position: relative;
        height: 2px;
        margin: 2rem 0;
        background: linear-gradient(
            90deg, 
            color-mix(in srgb, var(--text-color) 20%, transparent),
            color-mix(in srgb, var(--text-color) 80%, transparent),
            color-mix(in srgb, var(--text-color) 20%, transparent)
        );
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .next-label {
        position: absolute;
        background-color: var(--bg-color);
        padding: 0 1rem;
        color: var(--text-color);
        font-weight: bold;
        font-size: 0.875rem;
        letter-spacing: 0.05em;
    }

    .comparison-row.upcoming {
        position: relative;
        border-radius: 0.5rem;
        background-color: rgba(144, 0, 211, 0.02);
    }

    .mobile-nav {
        display: none;
        grid-template-columns: repeat(3, 1fr);
        gap: 0.5rem;
        margin-bottom: 1rem;
        position: sticky;
        top: 0;
        z-index: 10;
        background-color: var(--bg-color);
        padding: 0.5rem;
        border-bottom: 1px solid var(--border-color);
    }

    .mobile-nav-btn {
        padding: 0.5rem;
        border: none;
        border-radius: 0.375rem;
        font-size: 0.875rem;
        color: white;
        cursor: pointer;
        opacity: 0.7;
        transition: opacity 0.3s ease;
        font-weight: bold   ;
        font-family:Arial, Helvetica, sans-serif;
    }

    .mobile-nav-btn.active {
        opacity: 1;
    }

    .mobile-nav-btn.general { 
        background: linear-gradient(120deg, #00c0a0, #006083);
        color: white;
    }
    .mobile-nav-btn.university { 
        background: linear-gradient(120deg, #9000d3, #3f006c);
        color: white;
    }
    .mobile-nav-btn.ofppt { 
        background: linear-gradient(120deg, #0031d3, #00196c);
        color: white;
    }

    @media (max-width: 768px) {
        .mobile-nav {
            display: grid;
        }

        .comparison-header {
            display: none;
        }

        .comparison-row {
            display: grid;
            grid-template-columns: 1fr;
        }

        .event-row {
            display: none;
        }

        /* Show only active section and non-empty rows */
        .comparison-grid[data-active-section="general"] .event-row:not(.empty):nth-child(1),
        .comparison-grid[data-active-section="university"] .event-row:not(.empty):nth-child(2),
        .comparison-grid[data-active-section="ofppt"] .event-row:not(.empty):nth-child(3) {
            display: flex;
        }

        /* Remove current event indicators and styling on mobile */
        .current-indicator,
        .current-tag {
            display: none;
        }

        .event-row.current {
            display: none !important; /* Override all other display rules */
        }

        .event-row.current {
            border: 1px solid var(--border-color);
            background-color: var(--bg-color);
            box-shadow: none;
            animation: none;
        }

        .event-row.current:hover {
            transform: none;
            box-shadow: none;
        }

        .calendar-comparison {
            margin: 1rem;
            padding: 0;
        }

        .next-separator {
            margin: 1.5rem 0;
        }

        /* Updated selectors for mobile view */
        .comparison-grid[data-active-section="general"] .comparison-row .event-row:nth-child(1):not(.empty):not(.current),
        .comparison-grid[data-active-section="university"] .comparison-row .event-row:nth-child(2):not(.empty):not(.current),
        .comparison-grid[data-active-section="ofppt"] .comparison-row .event-row:nth-child(3):not(.empty):not(.current) {
            display: flex;
        }

        /* Hide current event styles for university and ofppt sections */
        .comparison-grid[data-active-section="university"] .comparison-row.has-current,
        .comparison-grid[data-active-section="ofppt"] .comparison-row.has-current {
            background: none;
        }
    }
</style>