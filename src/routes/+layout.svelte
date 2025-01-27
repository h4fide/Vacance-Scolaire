
<script lang="ts">
    import { selectedCalendarType } from './stores';
</script>

<div class="calendar-type-selector">
    <select bind:value={$selectedCalendarType}>
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
</style>