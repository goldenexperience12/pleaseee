const API_BASE = "https://api.jikan.moe/v4";

// Get anime ID from URL query
const params = new URLSearchParams(window.location.search);
const animeId = params.get("id");

async function fetchAnimeDetails(id) {
  const res = await fetch(`${API_BASE}/anime/${id}/full`);
  const json = await res.json();
  return json.data;
}

async function fetchAnimeEpisodes(id) {
  const res = await fetch(`${API_BASE}/anime/${id}/episodes`);
  const json = await res.json();
  return json.data || [];
}

async function renderAnimeDetails() {
  const detailsDiv = document.getElementById("anime-details");

  if (!animeId) {
    detailsDiv.innerHTML = "<p>No anime selected.</p>";
    return;
  }

  const anime = await fetchAnimeDetails(animeId);
  const episodes = await fetchAnimeEpisodes(animeId);

  detailsDiv.innerHTML = `
    <h1>${anime.title}</h1>
    <img src="${anime.images.jpg.large_image_url}" alt="${anime.title}">
    <p><strong>Genres:</strong> ${anime.genres.map(g => g.name).join(", ")}</p>
    <p><strong>Rating:</strong> ${anime.score || "N/A"}</p>
    <p><strong>Synopsis:</strong> ${anime.synopsis || "No synopsis available."}</p>

    <h3>Episodes</h3>
    <ul>
      ${episodes.length 
        ? episodes.map(ep => `<li>${ep.mal_id}. ${ep.title}</li>`).join("")
        : "<li>No episodes available.</li>"
      }
    </ul>

    <h3>Reviews</h3>
    <p>Reviews are available via Jikan’s review endpoint, but may be limited.</p>
  `;
}

renderAnimeDetails();
