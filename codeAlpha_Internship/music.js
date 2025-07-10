const audio = document.getElementById("audioPlayer");
const playPauseBtn = document.getElementById("playPause");
const fileUpload = document.getElementById("fileUpload");
const playlistEl = document.getElementById("playlist");
const volumeSlider = document.getElementById("volume");
const searchInput = document.getElementById("searchInput");
const themeToggle = document.getElementById("themeToggle");

let playlist = [];
let currentTrackIndex = 0;
let isPlaying = false;

fileUpload.addEventListener("change", (e) => {
  playlist = [...e.target.files];
  renderPlaylist();
});

playPauseBtn.addEventListener("click", () => {
  if (isPlaying) {
    audio.pause();
    playPauseBtn.textContent = "▶️";
  } else {
    audio.play();
    playPauseBtn.textContent = "⏸️";
  }
  isPlaying = !isPlaying;
});

volumeSlider.addEventListener("input", (e) => {
  audio.volume = e.target.value;
});

function playTrack(index) {
  const track = playlist[index];
  if (track) {
    audio.src = URL.createObjectURL(track);
    audio.play();
    isPlaying = true;
    playPauseBtn.textContent = "⏸️";
    currentTrackIndex = index;
  }
}

function renderPlaylist() {
  playlistEl.innerHTML = "";
  playlist.forEach((file, index) => {
    const li = document.createElement("li");
    li.textContent = file.name;
    li.addEventListener("click", () => playTrack(index));
    playlistEl.appendChild(li);
  });
}

document.getElementById("next").addEventListener("click", () => {
  currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
  playTrack(currentTrackIndex);
});

document.getElementById("prev").addEventListener("click", () => {
  currentTrackIndex =
    (currentTrackIndex - 1 + playlist.length) % playlist.length;
  playTrack(currentTrackIndex);
});

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filtered = playlist.filter(file =>
    file.name.toLowerCase().includes(query)
  );
  renderFilteredPlaylist(filtered);
});

function renderFilteredPlaylist(filteredList) {
  playlistEl.innerHTML = "";
  filteredList.forEach((file, index) => {
    const li = document.createElement("li");
    li.textContent = file.name;
    li.addEventListener("click", () => playTrack(index));
    playlistEl.appendChild(li);
  });
}

// Theme toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});
