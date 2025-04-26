
## Home View

<img width="1438" alt="linear_playlist_home_view" src="https://github.com/user-attachments/assets/47385db7-516a-4c28-908a-60411ea8ce37" />

## Playlist View (Tracks)

<img width="1440" alt="linear_playlist_app" src="https://github.com/user-attachments/assets/2c134fc9-d12e-4ff8-a191-82197715e25d" />

### Getting started

You can use `npm` to install the dependencies and run the basic React project.

```bash
npm install
npm run dev
```

### Playlist data

The playlist data is stored in `src/data/playlists.json`. It includes a list of audio files and some associated metadata,
you can import the json file directly with no need for network requests.

### Attribution

This project includes music from the following albums:

- **"Deep House"** by _Nul Tiel Records_ is licensed under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/).
- **"Neither and Both"** by _Brylie Christopher Oxley_ is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

--------------------------------------------------------------------------------------------------------------

### Note to Reviewer

The audio player requires an initial click to load metadata before playback controls become fully functional. After this first interaction, all subsequent clicks will operate the audio player as expected. This two-step process is a known limitation in the current implementation that I plan to address in future iterations by enabling immediate playback without the initial click.

🔗 Deployed App: <https://linear-playlist.vercel.app/>

🔗 GitHub Repo: <https://github.com/linear-wt/media-player-exercise-kamosah>

🔗 Personal GitHub Repo: <https://github.com/kamosah/linear-playlist>

## Requirements

- [x] play through a playlist of audio files
- [x] display info on the currently playing track
- [x] supporting basic functionality
  - [x] play/pause
  - [x] next track
