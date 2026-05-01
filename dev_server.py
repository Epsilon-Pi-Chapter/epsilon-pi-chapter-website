#!/usr/bin/env python3
from __future__ import annotations

import json
import mimetypes
import os
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlparse


ROOT = Path(__file__).resolve().parent
PORT = 8000
POLL_SECONDS = 1.0
WATCH_EXTENSIONS = {
    ".html",
    ".css",
    ".js",
    ".json",
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".svg",
    ".webp",
    ".ico",
}


def latest_mtime() -> float:
    newest = 0.0
    for path in ROOT.rglob("*"):
        if not path.is_file():
            continue
        if path.name.startswith("."):
            continue
        if path.suffix.lower() not in WATCH_EXTENSIONS:
            continue
        try:
            newest = max(newest, path.stat().st_mtime)
        except OSError:
            continue
    return newest


RELOAD_SNIPPET = f"""
<script>
(() => {{
  const pollMs = {int(POLL_SECONDS * 1000)};
  let lastSeen = null;

  async function checkForUpdates() {{
    try {{
      const response = await fetch("/__codex_reload__", {{ cache: "no-store" }});
      if (!response.ok) return;
      const data = await response.json();
      if (lastSeen === null) {{
        lastSeen = data.version;
        return;
      }}
      if (data.version !== lastSeen) {{
        location.reload();
      }}
    }} catch (_error) {{
      // Ignore transient polling failures while the dev server restarts.
    }}
  }}

  checkForUpdates();
  setInterval(checkForUpdates, pollMs);
}})();
</script>
""".strip()


class DevServerHandler(SimpleHTTPRequestHandler):
    def translate_path(self, path: str) -> str:
        parsed = urlparse(path)
        safe_path = unquote(parsed.path.lstrip("/"))
        full_path = (ROOT / safe_path).resolve()
        if ROOT not in full_path.parents and full_path != ROOT:
            return str(ROOT)
        return str(full_path)

    def do_GET(self) -> None:
        parsed = urlparse(self.path)
        if parsed.path == "/__codex_reload__":
            self.send_response(HTTPStatus.OK)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Cache-Control", "no-store")
            self.end_headers()
            payload = {"version": latest_mtime()}
            self.wfile.write(json.dumps(payload).encode("utf-8"))
            return

        return super().do_GET()

    def send_head(self):
        path = self.translate_path(self.path)
        requested = Path(path)

        if requested.is_dir():
            for index_name in ("index.html", "index.htm"):
                index_file = requested / index_name
                if index_file.exists():
                    requested = index_file
                    break

        if requested.is_file() and requested.suffix.lower() in {".html", ".htm"}:
            raw = requested.read_text(encoding="utf-8")
            if "</body>" in raw:
                content = raw.replace("</body>", f"{RELOAD_SNIPPET}\n</body>", 1)
            else:
                content = f"{raw}\n{RELOAD_SNIPPET}"
            encoded = content.encode("utf-8")

            self.send_response(HTTPStatus.OK)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(encoded)))
            self.send_header("Cache-Control", "no-store")
            self.end_headers()
            return self._memory_file(encoded)

        return super().send_head()

    def _memory_file(self, content: bytes):
        import io

        return io.BytesIO(content)

    def end_headers(self) -> None:
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def guess_type(self, path: str) -> str:
        content_type = mimetypes.guess_type(path)[0]
        return content_type or "application/octet-stream"


def main() -> None:
    os.chdir(ROOT)
    server = ThreadingHTTPServer(("127.0.0.1", PORT), DevServerHandler)
    print(f"Codex dev server running at http://127.0.0.1:{PORT}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
