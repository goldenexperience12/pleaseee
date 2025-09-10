const API_BASE = "https://api.jikan.moe/v4";

async function fetchAnime(query) {
  const res = await fetch(`${API_BASE}/anime?q=${encodeURIComponent(query)}&limit=12`);
  const json = await res.json();
  return json.data;
}

function renderAnimeList(animes) {
  const list = document.getElementById("anime-list");
  list.innerHTML = "";

  animes.forEach(anime => {
    const card = document.createElement("div");
    card.className = "anime-card";

    const img = anime.images?.jpg?.image_url || "";

    card.innerHTML = `
      <a href="details.html?id=${anime.mal_id}">
        <img src="${img}" alt="${anime.title}">
        <h2>${anime.title}</h2>
      </a>
    `;

    list.appendChild(card);
  });
}

document.getElementById("searchBtn").addEventListener("click", async () => {
  const query = document.getElementById("search").value.trim();
  if (!query) return;
  const results = await fetchAnime(query);
  renderAnimeList(results);
});

// Default load (example: naruto)
fetchAnime("naruto").then(renderAnimeList);
