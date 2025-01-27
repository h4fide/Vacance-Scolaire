<script lang="ts">
    const baseUrl = 'https://vacance-scolaire.pages.dev/api';
    
    const endpoints = [
        {
            method: 'GET',
            path: '/school',
            description: 'Get all school calendar events',
            example: `${baseUrl}/school`
        },
        {
            method: 'GET',
            path: '/school/next',
            description: 'Get the next upcoming school event',
            example: `${baseUrl}/school/next`
        },
        {
            method: 'GET',
            path: '/school/upcoming',
            description: 'Get all upcoming school events',
            example: `${baseUrl}/school/upcoming`
        },
        {
            method: 'GET',
            path: '/university',
            description: 'Get all university calendar events',
            example: `${baseUrl}/university`
        },
        {
            method: 'GET',
            path: '/university/next',
            description: 'Get the next upcoming university event',
            example: `${baseUrl}/university/next`
        },
        {
            method: 'GET',
            path: '/university/upcoming',
            description: 'Get all upcoming university events',
            example: `${baseUrl}/university/upcoming`
        },
        {
            method: 'GET',
            path: '/ofppt',
            description: 'Get all OFPPT calendar events',
            example: `${baseUrl}/ofppt`
        },
        {
            method: 'GET',
            path: '/ofppt/next',
            description: 'Get the next upcoming OFPPT event',
            example: `${baseUrl}/ofppt/next`
        },
        {
            method: 'GET',
            path: '/ofppt/upcoming',
            description: 'Get all upcoming OFPPT events',
            example: `${baseUrl}/ofppt/upcoming`
        }
    ];
</script>

<main class="docs-container">
    <h1>API Documentation</h1>
    
    <section class="intro">
        <h2>Introduction</h2>
        <p>Welcome to the Vacances Scolaires API documentation. This API provides access to school, university, and OFPPT holiday calendars in Morocco.</p>
        <p>All endpoints return JSON data and are freely accessible without authentication.</p>
        
        <div class="base-url">
            <h3>Base URL</h3>
            <code>{baseUrl}</code>
        </div>
    </section>

    <section class="endpoints">
        <h2>Endpoints</h2>
        {#each endpoints as endpoint}
            <div class="endpoint-card">
                <div class="endpoint-header">
                    <span class="method">{endpoint.method}</span>
                    <code class="path">{endpoint.path}</code>
                </div>
                <p class="description">{endpoint.description}</p>
                <div class="example">
                    <h4>Example Request</h4>
                    <code>{endpoint.example}</code>
                </div>
            </div>
        {/each}
    </section>

    <section class="response-example">
        <h2>Example Response</h2>
        <pre><code>{JSON.stringify([
    {
        "_id": 1,
        "eventname": "Winter Break",
        "start_date": "2024-01-21",
        "end_date": "2024-01-28",
        "days_number": 7
    }
], null, 2)}</code></pre>
    </section>

    <section class="response-format">
        <h2>Response Formats</h2>
        
        <div class="format-example">
            <h3>Full Calendar Response</h3>
            <pre><code>{JSON.stringify([
    {
        "_id": 1,
        "eventname": "Winter Break",
        "start_date": "2024-01-21",
        "end_date": "2024-01-28",
        "days_number": 7
    }
], null, 2)}</code></pre>
        </div>

        <div class="format-example">
            <h3>Next Event Response</h3>
            <pre><code>{JSON.stringify({
    "_id": 1,
    "eventname": "Winter Break",
    "start_date": "2024-01-21",
    "end_date": "2024-01-28",
    "days_number": 7
}, null, 2)}</code></pre>
        </div>

        <div class="format-example">
            <h3>Upcoming Events Response</h3>
            <pre><code>{JSON.stringify([
    {
        "_id": 1,
        "eventname": "Winter Break",
        "start_date": "2024-01-21",
        "end_date": "2024-01-28",
        "days_number": 7
    },
    {
        "_id": 2,
        "eventname": "Spring Break",
        "start_date": "2024-03-15",
        "end_date": "2024-03-22",
        "days_number": 7
    }
], null, 2)}</code></pre>
        </div>
    </section>
</main>

<style>
    .docs-container {
        max-width: 900px;
        margin: 0 auto;
        padding: 2rem;
    }

    h1 {
        color: #2c3e50;
        margin-bottom: 2rem;
    }

    h2 {
        color: #34495e;
        margin: 2rem 0 1rem;
    }

    .intro {
        margin-bottom: 3rem;
    }

    .base-url {
        background: #f8f9fa;
        padding: 1rem;
        border-radius: 6px;
        margin: 1rem 0;
    }

    .endpoint-card {
        background: white;
        border: 1px solid #e9ecef;
        border-radius: 8px;
        padding: 1.5rem;
        margin-bottom: 1.5rem;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }

    .endpoint-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
    }

    .method {
        background: #2196f3;
        color: white;
        padding: 0.3rem 0.8rem;
        border-radius: 4px;
        font-weight: bold;
        font-size: 0.9rem;
    }

    .path {
        font-family: monospace;
        background: #f8f9fa;
        padding: 0.3rem 0.8rem;
        border-radius: 4px;
    }

    .description {
        color: #666;
        margin-bottom: 1rem;
    }

    .example {
        background: #f8f9fa;
        padding: 1rem;
        border-radius: 6px;
    }

    .example h4 {
        margin: 0 0 0.5rem 0;
        color: #495057;
    }

    .example code {
        color: #e83e8c;
    }

    .response-example {
        margin-top: 3rem;
    }

    .response-example pre {
        background: #f8f9fa;
        padding: 1.5rem;
        border-radius: 6px;
        overflow-x: auto;
    }

    code {
        font-family: 'Courier New', Courier, monospace;
    }

    .format-example {
        margin: 2rem 0;
    }

    .format-example h3 {
        color: #495057;
        margin-bottom: 1rem;
    }

    .format-example pre {
        background: #f8f9fa;
        padding: 1.5rem;
        border-radius: 6px;
        overflow-x: auto;
    }
</style>