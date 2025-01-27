<script lang="ts">
    import './styles.css';
    const baseUrl = 'https://vacance-scolaire.pages.dev/api';
    
    const endpoints = [
        {
            method: 'GET',
            path: '/',
            description: 'Get API information and available endpoints',
            example: `${baseUrl}`
        },
        {
            method: 'GET',
            path: '/general',
            description: 'Get all general calendar events',
            example: `${baseUrl}/general`
        },
        {
            method: 'GET',
            path: '/general/next',
            description: 'Get the next upcoming general event',
            example: `${baseUrl}/general/next`
        },
        {
            method: 'GET',
            path: '/general/upcoming',
            description: 'Get all upcoming general events',
            example: `${baseUrl}/general/upcoming`
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

    const exampleResponses = {
        base: {
            message: 'Welcome to the Vacances Scolaires API',
            endpoints: {
                general: {
                    all: '/api/general',
                    next: '/api/general/next',
                    upcoming: '/api/general/upcoming'
                }
                // ... other endpoints
            }
        },
        calendar: [
            {
                "_id": 1,
                "eventname": "Winter Break",
                "start_date": "2024-01-21",
                "end_date": "2024-01-28",
                "days_number": 7
            }
        ]
    };
</script>

<main class="docs-container">
    <header class="api-header">
        <h1>Vacances Scolaires API</h1>
        <p>Access school, university, and OFPPT holiday calendars in Morocco through simple REST endpoints.</p>
    </header>


    <section class="section">
        <h2>Endpoints</h2>
        <div class="endpoint-grid">
            {#each endpoints as endpoint}
                <div class="endpoint-card">
                    <div>
                        <span class="endpoint-method">{endpoint.method}</span>
                        <span class="endpoint-path">{endpoint.path}</span>
                    </div>
                    <p class="endpoint-description">{endpoint.description}</p>
                    <div class="response-example">
                        <div class="response-title">Example Request:</div>
                        <div class="code-block">
                            <code>curl {endpoint.example}</code>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </section>

</main>