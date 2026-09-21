# Home Feature

Modern-track home page: hero section + Featured by Curators row + admin-configured homepage playlist rows + Recent videos grid.

## Data flow

1. Django renders `templates/cms/index_revamp.html` and injects four `json_script` blocks:
   - `#home-initial-data-featured` — `/api/v1/media?show=featured` payload (first 20 items)
   - `#home-initial-data-recommended` — `/api/v1/media?show=recommended` payload
   - `#home-initial-data-index-featured` — `/api/v1/indexfeatured` payload (admin playlist rows)
   - `#home-initial-data-latest` — `/api/v1/media?show=latest` payload (first 20 items)

   The template also preloads the two Latin font subsets the shell uses, because the text that
   needs them renders only after React boots.

2. `src/entries/index-revamp.js` reads the blocks via `readInitialDataFromDom()` and
   `seedHomeQueryClient()` seeds `homeQueryClient` before first render. Every row paints from seeded
   data, so the first load makes no list API calls and renders no skeleton rows (skeletons that
   vanish when a response lands shift the layout). A block that is `null` or malformed is skipped and
   its hook fetches normally.

3. `useFeaturedMedia` and `useRecommendedMedia` hooks observe keys `['home','featured']` and
   `['home','recommended']`. On `staleTime` expiry or focus, they refetch from the API.

4. `HeroSection.Player` uses list playback data when present. When the featured list item has no playback payload,
   it fetches the legacy media detail endpoint derived from `url`, `friendly_token`, `uid`, or `id` before mounting
   the player. The player module itself (legacy `VideoPlayer`, `@mediacms/media-player`, Video.js and their CSS) is
   not part of the homepage entry: `utils/heroPlayerLoader.js` fetches it with a dynamic `import()` only when the
   viewer activates the poster, and the player mounts with autoplay so that first click still starts playback (#750).

5. `useRecentMedia()` observes `['home','recent']` for the Recent videos grid, seeded from
   `#home-initial-data-latest` and refetched from `/api/v1/media?show=latest` on `staleTime` expiry. This mirrors
   the legacy homepage/latest feed.

## Homepage playlist rows

The legacy homepage lets admins configure playlist rows through `IndexPageFeatured`.
The modern homepage now uses the same source:

1. `useIndexFeaturedPlaylists()` observes `['home','index-featured']`, seeded from
   `#home-initial-data-index-featured` and refetched from `/api/v1/indexfeatured` on `staleTime` expiry.
2. Each configured row fetches its returned `api_url` via `usePlaylistMedia(apiUrl)`.
3. `normalizeMediaList()` accepts playlist detail envelopes via `playlist_media`, plus paginated `results`
   and bare arrays.
4. `IndexPageFeatured.text` renders through `SectionRow.HtmlDescription`, preserving the legacy row behavior
   for admin-authored HTML such as `<br>` and `<a>`, with DOMPurify as a client-side safety net.
5. Rows hide themselves when their playlist has no visible media, matching the existing `SectionRow` contract.

## Component tree

```text
HomePage (QueryClientProvider)
└── HomePageContent
    ├── HeroSection (compound, reads useFeaturedMedia)
    │   ├── HeroSection.Player  (poster play control → HeroVideoPlayer on activation → @mediacms/media-player)
    │   └── HeroSection.Card   (title, meta, ExpandableText)
    ├── FeaturedByCuratorsRow  (thin wrapper → SectionRow + useRecommendedMedia)
    ├── HomepagePlaylistRow × N (thin wrapper → SectionRow + usePlaylistMedia)
    └── RecentVideosRow        (thin wrapper → SectionRow.Grid + useRecentMedia)
        └── SectionRow (compound)
            ├── SectionRow.Title
            ├── SectionRow.HtmlDescription (sanitized admin HTML, playlist rows only)
            ├── SectionRow.Carousel → Carousel (playlist/curator rows)
            └── SectionRow.Grid     → responsive movie grid (Recent videos)
                └── MediaTile       → VerticalMovieItem
```

Playlist and curator rows use the carousel body. Recent videos intentionally uses `SectionRow.Grid` to match the
legacy latest-video block rather than the horizontal playlist carousel.

```text
Carousel (compound)
                ├── Carousel.Track
                ├── Carousel.Dots
                └── Carousel.Arrows
```
