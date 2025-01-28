<script lang="ts">
    import { onMount } from 'svelte';
    
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

    // Function to find event for a specific date
    function findEventByDate(events: Event[], date: string): Event | null {
        return events.find(event => event.end_date === date) || null;
    }

    // Add this function to check if an event is in the past
    function isEventInPast(event: Event): boolean {
        const today = new Date();
        const endDate = new Date(event.end_date);
        return endDate < today;
    }

    // Add this function to check if an event is current
    function isEventCurrent(event: Event): boolean {
        const today = new Date();
        const startDate = new Date(event.start_date);
        const endDate = new Date(event.end_date);
        return startDate <= today && today <= endDate;
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
</script>

{#if loading}
    <div class="loading">Loading...</div>
{:else if error}
    <div class="error">{error}</div>
{:else}
    <div class="calendar-comparison">
        <!-- Remove the standalone current indicator -->
        
        <!-- Header -->
        <div class="comparison-header">
            <div class="header-item general">General Education</div>
            <div class="header-item university">University</div>
            <div class="header-item ofppt">OFPPT</div>
        </div>

        <!-- Calendar Items -->
        <div class="comparison-grid">
            {#each uniqueDates as date}
                {@const gEvent = findEventByDate(generalData, date)}
                {@const uEvent = findEventByDate(universityData, date)}
                {@const oEvent = findEventByDate(ofpptData, date)}
                {@const hasCurrentEvent = (gEvent && isEventCurrent(gEvent)) || 
                                        (uEvent && isEventCurrent(uEvent)) || 
                                        (oEvent && isEventCurrent(oEvent))}
                
                <div class="comparison-row {hasCurrentEvent ? 'has-current' : ''}">
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
    }


    .header-item.general { background: linear-gradient(120deg, #00c0a0, #006083); }
    .header-item.university { background: linear-gradient(120deg, #9000d3, #3f006c); }
    .header-item.ofppt { background: linear-gradient(120deg, #0031d3, #00196c); }

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
    }

    .event-row.empty {
        background-color: transparent;
        border: 1px dashed var(--border-color);
        opacity: 0.5;
    }

    .event-row.past {
        filter: grayscale(100%);
        opacity: 0.8;
        transition: opacity 0.3s ease;
    }

    .event-row.past:hover {
        opacity: 0.95;
    }

    .event-row.past .date-block {
        background: linear-gradient(160deg, #666, #333) !important;
    }

    .event-row.current {
        position: relative;
        border: 1px solid rgba(34, 197, 94, 0.3);
        background-color: transparent;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }

    .event-row.current::before {
        content: '';
        position: absolute;
        left: -1rem;
        top: 50%;
        width: 1rem;
        height: 2px;
        border-top: 2px dashed #22c55e;
    }

    /* Remove or comment out the existing .current::after animation */
    /* .event-row.current::after { ... } */
    /* @keyframes blink { ... } */

    .event-name {
        font-weight: bold;
        margin-bottom: 0.5rem;
    }

    .date-block {
        padding: 0.75rem;
        border-radius: 0.375rem;
    }

    .date-block.general { background: linear-gradient(160deg, #00c0a0, #006083); }
    .date-block.university { background: linear-gradient(160deg, #9000d3, #3f006c); }
    .date-block.ofppt { background: linear-gradient(160deg, #0031d3, #00196c); }

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
</style>