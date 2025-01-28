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
            dates.add(event.start_date);
        });
        return Array.from(dates).sort();
    }

    // Function to find event for a specific date
    function findEventByDate(events: Event[], date: string): Event | null {
        return events.find(event => event.start_date === date) || null;
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
            ofpptData = ofpptData.sort((a, b) => Number(a.id) - Number(b.id));

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
        <!-- Header -->
        <div class="comparison-header">
            <div class="header-item general">General Education</div>
            <div class="header-item university">University</div>
            <div class="header-item ofppt">OFPPT</div>
        </div>

        <!-- Calendar Items -->
        <div class="comparison-grid">
            <!-- General Education Events -->
            <div class="education-column">
                {#each uniqueDates as date}
                    {@const event = findEventByDate(generalData, date)}
                    <div class="event-row {event ? '' : 'empty'}">
                        {#if event}
                            <div class="event-name">{event.eventname}</div>
                            <div class="date-block general">
                                <div>Start: {formatDate(event.start_date)}</div>
                                <div>End: {formatDate(event.end_date)}</div>
                            </div>
                            <div class="event-duration">Duration: {event.days_number} days</div>
                        {/if}
                    </div>
                {/each}
            </div>

            <!-- University Events -->
            <div class="education-column">
                {#each uniqueDates as date}
                    {@const event = findEventByDate(universityData, date)}
                    <div class="event-row {event ? '' : 'empty'}">
                        {#if event}
                            <div class="event-name">{event.eventname}</div>
                            <div class="date-block university">
                                <div>Start: {formatDate(event.start_date)}</div>
                                <div>End: {formatDate(event.end_date)}</div>
                            </div>
                            <div class="event-duration">Duration: {event.days_number} days</div>
                        {/if}
                    </div>
                {/each}
            </div>

            <!-- OFPPT Events -->
            <div class="education-column">
                {#each uniqueDates as date}
                    {@const event = findEventByDate(ofpptData, date)}
                    <div class="event-row {event ? '' : 'empty'}">
                        {#if event}
                            <div class="event-name">{event.event_name}</div>
                            <div class="date-block ofppt">
                                <div>Start: {formatDate(event.start_date)}</div>
                                <div>End: {formatDate(event.end_date)}</div>
                            </div>
                            <div class="event-duration">Duration: {event.days_number} days</div>
                        {/if}
                    </div>
                {/each}
            </div>
        </div>
    </div>
{/if}

<style>
    .calendar-comparison {
        max-width: 1024px;
        margin: 2rem auto;
        padding: 1rem;
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

    .header-item.general { background-color: var(--header-bg); }
    .header-item.university { background-color: var(--header-bg); }
    .header-item.ofppt { background-color: var(--header-bg); }

    .comparison-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
        align-items: start;
    }

    .education-column {
        display: flex;
        flex-direction: column;
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

    .event-name {
        font-weight: bold;
        margin-bottom: 0.5rem;
    }

    .date-block {
        padding: 0.75rem;
        border-radius: 0.375rem;
    }

    .date-block.general { background-color: #93c5fd; }
    .date-block.university { background-color: #c4b5fd; }
    .date-block.ofppt { background-color: #6ee7b7; }

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