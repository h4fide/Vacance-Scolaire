
<script lang="ts">
    import { page } from '$app/stores';
    import { selectedCalendarType } from '../stores';
    import MainPage from '../+page.svelte';

    // Sync calendar type with URL parameter
    $: {
        const calendar = $page.params.calendar;
        if (['school', 'university', 'ofppt'].includes(calendar)) {
            $selectedCalendarType = calendar;
        }
    }
</script>

<MainPage />