// ==UserScript==
// @name         Codenames AniList Search
// @namespace    http://tampermonkey.net/
// @version      1.0.5
// @description  Adds AniList search buttons to Codenames tiles.
// @author       You
// @match        https://codenames.game/*
// @downloadURL  https://raw.githubusercontent.com/4Lajf/codenames-scripts/main/codenamesSearch.user.js
// @updateURL    https://raw.githubusercontent.com/4Lajf/codenames-scripts/main/codenamesSearch.user.js
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const attachSearchButtons = () => {
        // Find all tiles
        const tiles = document.querySelectorAll('.card.shadow-bellow-card:not(.cover)');

        tiles.forEach(tile => {
            // Avoid duplicates
            if (tile.querySelector('.search-btn')) return;

            // Create a new search button element
            const searchBtn = document.createElement('button');
            searchBtn.innerText = '🔍';
            searchBtn.classList.add('search-btn');
            Object.assign(searchBtn.style, {
                position: 'absolute',
                top: '5px',
                right: '5px',
                zIndex: 1000,
                cursor: 'pointer'
            });
            searchBtn.onclick = () => {
                // Extract the text from the tile
                const tileText = tile.textContent.trim().replace("🔍", "")
                const searchQuery = encodeURIComponent(tileText);
                // Open a new search tab
                // AniList
                window.open(`https://anilist.co/search/anime?sort=SEARCH_MATCH&search=${searchQuery}`, '_blank');
                // AniDB
                // window.open(`https://anidb.net/anime/?adb.search=${searchQuery}&do.search=1`, '_blank');
                // Anime News Network
                // window.open(`https://www.animenewsnetwork.com/search?q=${searchQuery}`, '_blank');
                // Kitsu
                // window.open(`https://kitsu.io/anime?text=${searchQuery}`, '_blank');
                // MyAnimeList
                // window.open(`https://myanimelist.net/anime.php?q=${searchQuery}`, '_blank');
            };

            // Make sure the tile can contain an absolutely positioned element
            if (getComputedStyle(tile).position === 'static') {
                tile.style.position = 'relative';
            }

            // Attach the search button to the tile
            tile.appendChild(searchBtn);
        });
    };

    // Use MutationObserver to track changes and add buttons when tiles are added
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                attachSearchButtons();
            }
        });
    });

    // Start observing the document body for changes
    observer.observe(document.body, { childList: true, subtree: true });

    // Initial check in case the page is already loaded
    attachSearchButtons();
})();
