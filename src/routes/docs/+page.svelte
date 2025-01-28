<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@400;500;600;700&display=swap" rel="stylesheet">
</svelte:head>

<script lang="ts">
    import './styles.css';
    import { onMount } from 'svelte';
    import Prism from 'prismjs';
    import 'prismjs/components/prism-json';
    import 'prismjs/themes/prism-okaidia.css';
    import { endpoints } from './endpoints';
    
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
    if (err != nil) {
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

    // Update copy function
    function copyToClipboard(text: string, button: HTMLButtonElement) {
        navigator.clipboard.writeText(text).then(() => {
            // Don't change text content since we're using an icon
            button.classList.add('copied');
            setTimeout(() => {
                button.classList.remove('copied');
            }, 2000);
        });
    }


    let expandedResponses: Set<number> = new Set();
    
    
    function toggleResponse(index: number) {
        if (expandedResponses.has(index)) {
            expandedResponses.delete(index);
        } else {
            expandedResponses.add(index);
        }
        expandedResponses = expandedResponses; // trigger reactivity
    }

    // Add response highlighting function
    function highlightResponse(element: HTMLElement) {
        if (element) {
            Prism.highlightElement(element);
        }
    }

    onMount(() => {
        // Highlight all JSON responses on initial load
        const responseBlocks = document.querySelectorAll('.response-block code');
        responseBlocks.forEach(block => highlightResponse(block as HTMLElement));
    });

    // Add table sorting functionality
    let sortedEndpoints = [...endpoints];
    let sortField: 'method' | 'path' = 'path';
    let sortDirection: 'asc' | 'desc' = 'asc';

    function sortEndpoints(field: typeof sortField) {
        if (sortField === field) {
            sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            sortField = field;
            sortDirection = 'asc';
        }
        
        sortedEndpoints.sort((a, b) => {
            const compareResult = a[field].localeCompare(b[field]);
            return sortDirection === 'asc' ? compareResult : -compareResult;
        });
        sortedEndpoints = sortedEndpoints;
    }

    // Add section filtering
    const sections = {
        general: endpoints.filter(e => e.path.includes('/general')),
        university: endpoints.filter(e => e.path.includes('/university')),
        ofppt: endpoints.filter(e => e.path.includes('/ofppt')),
        root: endpoints.filter(e => e.path === '/api')
    };

    // Add section labels
    const sectionLabels = {
        root: 'Base API',
        general: 'General School',
        university: 'University',
        ofppt: 'OFPPT'
    };

    const baseUrl = "https://vacance-scolaire.pages.dev";
    
    function getFullUrl(path: string) {
        return `${baseUrl}${path}`;
    }
</script>

<main class="docs-container">
    <header class="api-header">
        <h1>Vacances Scolaires API</h1>
        <p>Accédez aux calendriers des vacances scolaires, universitaires et de l'OFPPT au Maroc via des points de terminaison REST simples.</p>
    </header>

    <section class="section endpoints-overview">
        <h2>Endpoints Overview</h2>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th on:click={() => sortEndpoints('method')}>
                            Method
                            {#if sortField === 'method'}
                                <span class="sort-arrow">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                            {/if}
                        </th>
                        <th on:click={() => sortEndpoints('path')}>
                            Path
                            {#if sortField === 'path'}
                                <span class="sort-arrow">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                            {/if}
                        </th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Base endpoint -->
                    {#each sections.root as endpoint}
                        <tr>
                            <td><span class="method-badge">{endpoint.method}</span></td>
                            <td><code class="endpoint-path-cell">{endpoint.path}</code></td>
                            <td>{endpoint.description}</td>
                        </tr>
                    {/each}
                    
                    <!-- General section -->
                    <tr class="section-divider">
                        <td colspan="3">
                            <span class="section-label">General School Endpoints</span>
                        </td>
                    </tr>
                    {#each sections.general as endpoint}
                        <tr>
                            <td><span class="method-badge">{endpoint.method}</span></td>
                            <td><code class="endpoint-path-cell">{endpoint.path}</code></td>
                            <td>{endpoint.description}</td>
                        </tr>
                    {/each}

                    <!-- University section -->
                    <tr class="section-divider">
                        <td colspan="3">
                            <span class="section-label">University Endpoints</span>
                        </td>
                    </tr>
                    {#each sections.university as endpoint}
                        <tr>
                            <td><span class="method-badge">{endpoint.method}</span></td>
                            <td><code class="endpoint-path-cell">{endpoint.path}</code></td>
                            <td>{endpoint.description}</td>
                        </tr>
                    {/each}

                    <!-- OFPPT section -->
                    <tr class="section-divider">
                        <td colspan="3">
                            <span class="section-label">OFPPT Endpoints</span>
                        </td>
                    </tr>
                    {#each sections.ofppt as endpoint}
                        <tr>
                            <td><span class="method-badge">{endpoint.method}</span></td>
                            <td><code class="endpoint-path-cell">{endpoint.path}</code></td>
                            <td>{endpoint.description}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </section>

    <!-- Root endpoint -->
    <section class="section">
        <h2>Base Endpoint</h2>
        <div class="endpoint-grid">
            {#each sections.root as endpoint, i}
                <div class="endpoint-card">
                    <div>
                        <span class="endpoint-method">{endpoint.method}</span>
                        <span class="endpoint-path">{endpoint.path}</span>
                    </div>
                    <p class="endpoint-description">{endpoint.description}</p>
                    <div class="url-tag">URL</div>
                    <div class="url-display">
                        <span class="url-text">{getFullUrl(endpoint.path)}</span>
                        <button 
                            class="url-copy-button"
                            on:click={(e) => copyToClipboard(getFullUrl(endpoint.path), e.currentTarget)}
                            aria-label="Copy to clipboard"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                        </button>
                    </div>
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
                        <div class="tag">CURL</div>
                        <div class="code-block">
                            <code>{getCodeSnippet(endpoint.example, selectedLanguage)}</code>
                            <button 
                                class="copy-button" 
                                on:click={(e) => copyToClipboard(getCodeSnippet(endpoint.example, selectedLanguage), e.currentTarget)}
                                aria-label="Copy to clipboard"
                            >
                            </button>
                        </div>
                        <div class="response-header">
                            <h4 class="response-title">Response Preview</h4>
                            <button 
                                class="expand-button" 
                                on:click={() => toggleResponse(i)}
                                aria-label={expandedResponses.has(i) ? 'Collapse response' : 'Expand response'}
                            >
                                {expandedResponses.has(i) ? '−' : '+'}
                            </button>
                        </div>
                        <div class="code-block response-block" class:expanded={expandedResponses.has(i)}>
                            <pre><code 
                                class="language-json"
                                use:highlightResponse
                            >{JSON.stringify(endpoint.response, null, 2)}</code></pre>
                            <button 
                                class="copy-button" 
                                on:click={(e) => copyToClipboard(JSON.stringify(endpoint.response, null, 2), e.currentTarget)}
                                aria-label="Copy to clipboard"
                            >
                            </button>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </section>

    <!-- General endpoints -->
    <section class="section">
        <h2>General School Endpoints</h2>
        <div class="endpoint-grid">
            {#each sections.general as endpoint, i}
                <div class="endpoint-card">
                    <div>
                        <span class="endpoint-method">{endpoint.method}</span>
                        <span class="endpoint-path">{endpoint.path}</span>
                    </div>
                    <p class="endpoint-description">{endpoint.description}</p>
                    <div class="url-tag">URL</div>
                    <div class="url-display">
                        <span class="url-text">{getFullUrl(endpoint.path)}</span>
                        <button 
                            class="url-copy-button"
                            on:click={(e) => copyToClipboard(getFullUrl(endpoint.path), e.currentTarget)}
                            aria-label="Copy to clipboard"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                        </button>
                    </div>
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
                        <div class="tag">CURL</div>
                        <div class="code-block">
                            <code>{getCodeSnippet(endpoint.example, selectedLanguage)}</code>
                            <button 
                                class="copy-button" 
                                on:click={(e) => copyToClipboard(getCodeSnippet(endpoint.example, selectedLanguage), e.currentTarget)}
                                aria-label="Copy to clipboard"
                            >
                            </button>
                        </div>
                        <div class="response-header">
                            <h4 class="response-title">Response Preview</h4>
                            <button 
                                class="expand-button" 
                                on:click={() => toggleResponse(i)}
                                aria-label={expandedResponses.has(i) ? 'Collapse response' : 'Expand response'}
                            >
                                {expandedResponses.has(i) ? '−' : '+'}
                            </button>
                        </div>
                        <div class="code-block response-block" class:expanded={expandedResponses.has(i)}>
                            <pre><code 
                                class="language-json"
                                use:highlightResponse
                            >{JSON.stringify(endpoint.response, null, 2)}</code></pre>
                            <button 
                                class="copy-button" 
                                on:click={(e) => copyToClipboard(JSON.stringify(endpoint.response, null, 2), e.currentTarget)}
                                aria-label="Copy to clipboard"
                            >
                            </button>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </section>

    <!-- University endpoints -->
    <section class="section">
        <h2>University Endpoints</h2>
        <div class="endpoint-grid">
            {#each sections.university as endpoint, i}
                <div class="endpoint-card">
                    <div>
                        <span class="endpoint-method">{endpoint.method}</span>
                        <span class="endpoint-path">{endpoint.path}</span>
                    </div>
                    <p class="endpoint-description">{endpoint.description}</p>
                    <div class="url-tag">URL</div>
                    <div class="url-display">
                        <span class="url-text">{getFullUrl(endpoint.path)}</span>
                        <button 
                            class="url-copy-button"
                            on:click={(e) => copyToClipboard(getFullUrl(endpoint.path), e.currentTarget)}
                            aria-label="Copy to clipboard"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                        </button>
                    </div>
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
                        <div class="tag">CURL</div>
                        <div class="code-block">
                            <code>{getCodeSnippet(endpoint.example, selectedLanguage)}</code>
                            <button 
                                class="copy-button" 
                                on:click={(e) => copyToClipboard(getCodeSnippet(endpoint.example, selectedLanguage), e.currentTarget)}
                                aria-label="Copy to clipboard"
                            >
                            </button>
                        </div>
                        <div class="response-header">
                            <h4 class="response-title">Response Preview</h4>
                            <button 
                                class="expand-button" 
                                on:click={() => toggleResponse(i)}
                                aria-label={expandedResponses.has(i) ? 'Collapse response' : 'Expand response'}
                            >
                                {expandedResponses.has(i) ? '−' : '+'}
                            </button>
                        </div>
                        <div class="code-block response-block" class:expanded={expandedResponses.has(i)}>
                            <pre><code 
                                class="language-json"
                                use:highlightResponse
                            >{JSON.stringify(endpoint.response, null, 2)}</code></pre>
                            <button 
                                class="copy-button" 
                                on:click={(e) => copyToClipboard(JSON.stringify(endpoint.response, null, 2), e.currentTarget)}
                                aria-label="Copy to clipboard"
                            >
                            </button>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </section>

    <!-- OFPPT endpoints -->
    <section class="section">
        <h2>OFPPT Endpoints</h2>
        <div class="endpoint-grid">
            {#each sections.ofppt as endpoint, i}
                <div class="endpoint-card">
                    <div>
                        <span class="endpoint-method">{endpoint.method}</span>
                        <span class="endpoint-path">{endpoint.path}</span>
                    </div>
                    <p class="endpoint-description">{endpoint.description}</p>
                    <div class="url-tag">URL</div>
                    <div class="url-display">
                        <span class="url-text">{getFullUrl(endpoint.path)}</span>
                        <button 
                            class="url-copy-button"
                            on:click={(e) => copyToClipboard(getFullUrl(endpoint.path), e.currentTarget)}
                            aria-label="Copy to clipboard"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                        </button>
                    </div>
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
                        <div class="tag">CURL</div>
                        <div class="code-block">
                            <code>{getCodeSnippet(endpoint.example, selectedLanguage)}</code>
                            <button 
                                class="copy-button" 
                                on:click={(e) => copyToClipboard(getCodeSnippet(endpoint.example, selectedLanguage), e.currentTarget)}
                                aria-label="Copy to clipboard"
                            >
                            </button>
                        </div>
                        <div class="response-header">
                            <h4 class="response-title">Response Preview</h4>
                            <button 
                                class="expand-button" 
                                on:click={() => toggleResponse(i)}
                                aria-label={expandedResponses.has(i) ? 'Collapse response' : 'Expand response'}
                            >
                                {expandedResponses.has(i) ? '−' : '+'}
                            </button>
                        </div>
                        <div class="code-block response-block" class:expanded={expandedResponses.has(i)}>
                            <pre><code 
                                class="language-json"
                                use:highlightResponse
                            >{JSON.stringify(endpoint.response, null, 2)}</code></pre>
                            <button 
                                class="copy-button" 
                                on:click={(e) => copyToClipboard(JSON.stringify(endpoint.response, null, 2), e.currentTarget)}
                                aria-label="Copy to clipboard"
                            >
                            </button>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </section>

</main>
