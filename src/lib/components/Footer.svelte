
<script>
  const sources = [
    {
      name: "Moutamadris - Calendrier des vacances scolaires, universitaires et OFPPT au Maroc",
      url: "https://moutamadris.ma/calendrier-vacances-scolaires-universitaires-ofppt-maroc/"
    }
  ];
</script>

<footer class="footer">
  <div class="footer-content">
    <p>Sources:</p>
    <ul>
      {#each sources as source}
        <li>
          <a href={source.url} target="_blank" rel="noopener noreferrer">
            {source.name}
          </a>
        </li>
      {/each}
    </ul>
  </div>
</footer>

<style>
  .footer {
    text-align: center;
    padding: 20px;
    margin-top: 40px;
    border-top: 1px solid #0691ff;
  }

  .footer-content {
    max-width: 800px;
    margin: 0 auto;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin: 5px 0;
  }

  a {
    color: #666;
    text-decoration: none;
    transition: color 0.2s;
  }

  a:hover {
    color: #333;
  }
</style>