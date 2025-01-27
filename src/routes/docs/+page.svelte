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
            path: '/api',
            description: 'Get API information and available endpoints',
            example: `${baseUrl}`,
            response: {
                "message": "Welcome to the Vacances Scolaires API",
                "endpoints": {
                    "general": {
                        "all": "/api/general",
                        "next": "/api/general/next",
                        "upcoming": "/api/general/upcoming"
                    },
                    "university": {
                        "all": "/api/university",
                        "next": "/api/university/next",
                        "upcoming": "/api/university/upcoming"
                    },
                    "ofppt": {
                        "all": "/api/ofppt",
                        "next": "/api/ofppt/next",
                        "upcoming": "/api/ofppt/upcoming"
                    }
                }
            }
        },
        {
            method: 'GET',
            path: '/api/general',
            description: 'Get all general calendar events',
            example: `${baseUrl}/general`,
            response: [
                {
                    "_id": 1,
                    "eventname": "عيد المولد النبوي",
                    "start_date": "2024-09-04",
                    "end_date": "2024-09-05",
                    "days_number": 2
                },
                {
                    "_id": 2,
                    "eventname": "العطلة النصفية الأولى",
                    "start_date": "2024-10-20",
                    "end_date": "2024-10-27",
                    "days_number": 8
                }
            ]
        },
        {
            method: 'GET',
            path: '/api/general/next',
            description: 'Get the next upcoming general event',
            example: `${baseUrl}/general/next`,
            response: {
                "_id": 10,
                "eventname": "العطلة النصفية الثالثة",
                "start_date": "2025-03-16",
                "end_date": "2025-03-23",
                "days_number": 8
            }
        },
        {
            method: 'GET',
            path: '/api/general/upcoming',
            description: 'Get all upcoming general events',
            example: `${baseUrl}/general/upcoming`,
            response: [
                {
                    "_id": 10,
                    "eventname": "العطلة النصفية الثالثة",
                    "start_date": "2025-03-16",
                    "end_date": "2025-03-23",
                    "days_number": 8
                },
                {
                    "_id": 11,
                    "eventname": "عيد الفطر",
                    "start_date": "2025-04-27",
                    "end_date": "2025-04-30",
                    "days_number": "3-4"
                }
            ]
        },
        {
            method: 'GET',
            path: '/api/university',
            description: 'Get all university calendar events',
            example: `${baseUrl}/university`,
            response: [
                {
                    "_id": 1,
                    "eventname": "عيد المولد النبوي",
                    "start_date": "2024-09-04",
                    "end_date": "2024-09-05",
                    "days_number": 2
                },
                {
                    "_id": 2,
                    "eventname": "ذكرى المسيرة الخضراء",
                    "start_date": "2024-11-06",
                    "end_date": "2024-11-06",
                    "days_number": 1
                }
            ]
        },
        {
            method: 'GET',
            path: '/api/university/next',
            description: 'Get the next upcoming university event',
            example: `${baseUrl}/university/next`,
            response: {
                "_id": 8,
                "eventname": "عيد الفطر",
                "start_date": "2025-04-27",
                "end_date": "2025-04-30",
                "days_number": "3 أو 4"
            }
        },
        {
            method: 'GET',
            path: '/api/university/upcoming',
            description: 'Get all upcoming university events',
            example: `${baseUrl}/university/upcoming`,
            response: [
                {
                    "_id": 8,
                    "eventname": "عيد الفطر",
                    "start_date": "2025-04-27",
                    "end_date": "2025-04-30",
                    "days_number": "3 أو 4"
                },
                {
                    "_id": 9,
                    "eventname": "عيد الشغل",
                    "start_date": "2025-05-01",
                    "end_date": "2025-05-01",
                    "days_number": 1
                }
            ]
        },
        {
            method: 'GET',
            path: '/api/ofppt',
            description: 'Get all OFPPT calendar events',
            example: `${baseUrl}/ofppt`,
            response: [
                {
                    "id": "1",
                    "event_name": "عيد المولد النبوي الشريف",
                    "start_date": "2024-09-25",
                    "end_date": "2024-09-26",
                    "days_number": 2
                },
                {
                    "id": "2",
                    "event_name": "ذكرى المسيرة الخضراء",
                    "start_date": "2024-11-06",
                    "end_date": "2024-11-06",
                    "days_number": 1
                }
            ]
        },
        {
            method: 'GET',
            path: '/api/ofppt/next',
            description: 'Get the next upcoming OFPPT event',
            example: `${baseUrl}/ofppt/next`,
            response: {
                "id": "9",
                "event_name": "عطلة الطور الثاني",
                "start_date": "2025-03-16",
                "end_date": "2025-03-23",
                "days_number": 8
            }
        },
        {
            method: 'GET',
            path: '/api/ofppt/upcoming',
            description: 'Get all upcoming OFPPT events',
            example: `${baseUrl}/ofppt/upcoming`,
            response: [
                {
                    "id": "9",
                    "event_name": "عطلة الطور الثاني",
                    "start_date": "2025-03-16",
                    "end_date": "2025-03-23",
                    "days_number": 8
                },
                {
                    "id": "10",
                    "event_name": "عيد الفطر",
                    "start_date": "2025-03-29",
                    "end_date": "2025-04-02",
                    "days_number": 4
                }
            ]
        }
    ];

    // Add expanded state tracking
    let expandedResponses: Set<number> = new Set();
    
    function toggleResponse(index: number) {
        if (expandedResponses.has(index)) {
            expandedResponses.delete(index);
        } else {
            expandedResponses.add(index);
        }
        expandedResponses = expandedResponses; // trigger reactivity
    }
</script>

<main class="docs-container">
    <header class="api-header">
        <h1>Vacances Scolaires API</h1>
        <p>Access school, university, and OFPPT holiday calendars in Morocco through simple REST endpoints.</p>
    </header>


    <section class="section">
        <h2>Endpoints</h2>
        <div class="endpoint-grid">
            {#each endpoints as endpoint, i}
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
                        <div class="response-header">
                            <h4 class="response-title">Example Response:</h4>
                            <button 
                                class="expand-button" 
                                on:click={() => toggleResponse(i)}
                                aria-label={expandedResponses.has(i) ? 'Collapse response' : 'Expand response'}
                            >
                                {expandedResponses.has(i) ? '−' : '+'}
                            </button>
                        </div>
                        <div class="code-block response-block" class:expanded={expandedResponses.has(i)}>
                            <code>{JSON.stringify(endpoint.response, null, 2)}</code>
                            <button 
                                class="copy-button" 
                                on:click={(e) => copyToClipboard(JSON.stringify(endpoint.response, null, 2), e.currentTarget)}
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