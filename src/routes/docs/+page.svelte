<script lang="ts">
    import './styles.css';
    
    type Language = 'curl' | 'nodejs' | 'python' | 'csharp' | 'java' | 'go' | 'php' | 'ruby';
    
    let selectedLanguage: Language = 'curl';
    
    const languages = [
        { id: 'curl' as Language, name: 'cURL' },
        { id: 'nodejs' as Language, name: 'Node.js' },
        { id: 'python' as Language, name: 'Python' },
        { id: 'csharp' as Language, name: 'C#' },
        { id: 'java' as Language, name: 'Java' },
        { id: 'go' as Language, name: 'Go' },
        { id: 'php' as Language, name: 'PHP' },
        { id: 'ruby' as Language, name: 'Ruby' }
    ];

    function getCodeSnippet(url: string, lang: Language): string {
        const snippets: Record<Language, string> = {
            curl: `curl "${url}"`,
            nodejs: `fetch("${url}")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`,
            python: `import requests

response = requests.get("${url}")
data = response.json()
print(data)`,
            csharp: `using System.Net.Http;
using System.Text.Json;

using (var client = new HttpClient())
{
    var response = await client.GetStringAsync("${url}");
    var data = JsonSerializer.Deserialize<dynamic>(response);
}`,
            java: `import java.net.URI;
import java.net.http.*;

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("${url}"))
    .build();
HttpResponse<String> response = client.send(request, 
    HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());`,
            go: `package main

import (
    "fmt"
    "net/http"
    "io/ioutil"
)

func main() {
    resp, err := http.Get("${url}")
    if err != nil {
        panic(err)
    }
    defer resp.Body.Close()
    
    body, _ := ioutil.ReadAll(resp.Body)
    fmt.Println(string(body))
}`,
            php: `<?php
$response = file_get_contents("${url}");
$data = json_decode($response, true);
print_r($data);`,
            ruby: `require 'net/http'
require 'json'

uri = URI("${url}")
response = Net::HTTP.get(uri)
data = JSON.parse(response)
puts data`
        };
        return snippets[lang];
    }

    // Add copy function
    function copyToClipboard(text: string, button: HTMLButtonElement) {
        navigator.clipboard.writeText(text).then(() => {
            button.textContent = 'Copied!';
            button.classList.add('copied');
            setTimeout(() => {
                button.textContent = 'Copy';
                button.classList.remove('copied');
            }, 2000);
        });
    }

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
                        <div class="language-selector">
                            {#each languages as lang}
                                <button 
                                    class="lang-button" 
                                    class:active={selectedLanguage === lang.id}
                                    on:click={() => selectedLanguage = lang.id}
                                >
                                    {lang.name}
                                </button>
                            {/each}
                        </div>
                        <div class="code-block">
                            <code>{getCodeSnippet(endpoint.example, selectedLanguage)}</code>
                            <button 
                                class="copy-button" 
                                on:click={(e) => copyToClipboard(getCodeSnippet(endpoint.example, selectedLanguage), e.currentTarget)}
                            >
                                Copy
                            </button>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </section>

</main>