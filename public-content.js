(function loadChapterContent() {
  window.EPI_CONTENT_READY = fetch("/api/content", { headers: { Accept: "application/json" } })
    .then((response) => {
      if (!response.ok) throw new Error("Content request failed.");
      return response.json();
    })
    .then((content) => {
      window.EPI_CMS_CONTENT = content;
      window.dispatchEvent(new CustomEvent("epi:content-ready", { detail: content }));
      return content;
    })
    .catch(() => ({ configured: false, events: [], iceColdTuesdays: [], galleryImages: [] }));
})();
