<script lang="ts">
    import { selectedCalendarType, selectedFilter, lastVisitedUrl, updateStoredUrl } from './stores';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import 'bootstrap-icons/font/bootstrap-icons.css';

    // Single source of truth for calendar type
    $: currentCalendar = $page.url.pathname.slice(1) || 'school';

    // Keep store in sync with URL
    $: if (['school', 'university', 'ofppt'].includes(currentCalendar)) {
        $selectedCalendarType = currentCalendar;
    }

    // Simple calendar change handler
    function handleCalendarChange(newType: string) {
        const filter = $page.url.searchParams.get('fl') || 'all';
        goto(`/${newType}?fl=${filter}`, { replaceState: true });
    }
</script>

<nav class="header-nav">
    <div class="nav-left">
    </div>
    <div class="nav-right">
        <a href="/api-docs" class="api-link">
            <i class="bi bi-file-text"></i>
            API
        </a>
        <a href="https://github.com/h4fide/Vacance-Scolaire" target="_blank" rel="noopener noreferrer" class="github-link">
            <i class="bi bi-github"></i>
            GitHub</a>
    </div>
</nav>

<div class="calendar-type-selector">
    <select 
        value={currentCalendar}
        on:change={(e) => handleCalendarChange(e.currentTarget.value)}
    >
        <option value="school">School Calendar</option>
        <option value="university">University Calendar</option>
        <option value="ofppt">OFPPT Calendar</option>
    </select>
</div>

<slot />

<style>
    .calendar-type-selector {
        text-align: center;
        padding: 1rem;
    }

    select {
        padding: 8px 16px;
        font-size: 1rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        background-color: white;
        cursor: pointer;
    }

    select:hover {
        border-color: #2196f3;
    }

    .header-nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 2rem;
        background-color: #f8f9fa;
        border-bottom: 1px solid #e9ecef;
    }

    .nav-right {
        display: flex;
        gap: 1.5rem;
        align-items: center;
    }

    .nav-right a {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        text-decoration: none;
        color: #495057;
        font-weight: 500;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        transition: all 0.2s ease;
    }

    .nav-right a:hover {
        background-color: #e9ecef;
        color: #212529;
    }

    .github-link:hover {
        background-color: #24292e;
        color: white;
    }

    .api-link:hover {
        background-color: #0d6efd;
        color: white;
    }

    .api-link {
        border: 1px solid #dee2e6;
    }

    i.bi {
        font-size: 1.2rem;
    }

</style>