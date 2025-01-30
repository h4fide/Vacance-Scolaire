<script lang="ts">
    import { selectedCalendarType, selectedFilter, lastVisitedUrl, updateStoredUrl, isDarkMode } from './stores';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import 'bootstrap-icons/font/bootstrap-icons.css';
    import './styles.css';
    import Footer from '$lib/components/Footer.svelte';

    // Single source of truth for calendar type
    $: currentCalendar = $page.url.pathname.slice(1) || 'general';

    // Keep store in sync with URL
    $: if (['general', 'university', 'ofppt'].includes(currentCalendar)) {
        $selectedCalendarType = currentCalendar;
    }

    // Simple calendar change handler
    function handleCalendarChange(newType: string) {
        const filter = $page.url.searchParams.get('fl') || 'all';
        goto(`/${newType}?fl=${filter}`, { replaceState: true });
    }

    $: isDocsPage = $page.url.pathname === '/docs';
    $: isHomePage = $page.url.pathname === '/' || ['general', 'university', 'ofppt'].includes($page.url.pathname.slice(1));
</script>

<nav class="header-nav">
    <div class="nav-left">
        {#if isDocsPage}
            <a href="https://vacance-scolaire.pages.dev" class="home-link" aria-label="Home">
                <i class="bi bi-house"></i></a>
        {/if}
    </div>
    <div class="nav-right">
        <button class="theme-toggle" on:click={() => $isDarkMode = !$isDarkMode}>
            {#if $isDarkMode}
                <i class="bi bi-sun"></i>
            {:else}
                <i class="bi bi-moon"></i>
            {/if}
        </button>
        {#if isHomePage}
            <a href="/docs" class="docs-link">
                API
            </a>
        {/if}
        
        <a href="https://github.com/h4fide/Vacance-Scolaire" target="_blank" rel="noopener noreferrer" class="github-link">
            <i class="bi bi-github"></i>
            GitHub</a>
    </div>
</nav>

{#if !isDocsPage}
    <div class="calendar-type-selector">
        <select 
            value={currentCalendar}
            on:change={(e) => handleCalendarChange(e.currentTarget.value)}
        >
            <option value="general">General Calendar</option>
            <option value="university">University Calendar</option>
            <option value="ofppt">OFPPT Calendar</option>
        </select>
    </div>
{/if}

<slot />
<Footer />

<style>
    /* Mobile responsive styles */
    @media screen and (max-width: 768px) {
        .header-nav {
            padding: 0.75rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .nav-right {
            display: flex;
            gap: 1rem;
            align-items: center;
        }

        .nav-right a, .nav-right button {
            padding: 0.5rem;
            display: flex;
            align-items: center;
            gap: 0.4rem;
            font-size: 0.9rem;
        }

        .bi {
            font-size: 1.1rem;
        }

        .calendar-type-selector {
            padding: 0.5rem;
        }

        .calendar-type-selector select {
            width: 90%;
            max-width: 300px;
        }
    }
</style>