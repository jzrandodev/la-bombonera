/* Static dev server for the preview pane.
 *
 * `python3 -m http.server` cannot be used here: http/server.py evaluates
 * os.getcwd() while building its argument parser, and this project lives
 * under ~/Downloads, which macOS protects — the launched process gets
 * EPERM before --directory is even read. This resolves its own location
 * from import.meta.url instead, so it needs no cwd of its own.
 *
 * Node hits the same wall: it resolves a RELATIVE entry path through
 * process.cwd() before it runs a line of this file, and dies with
 * EPERM uv_cwd. So launch.json must point at this script by ABSOLUTE
 * path. That is the one thing to fix here if the project folder is ever
 * renamed again — it has been renamed once already.
 *
 * PORT is honoured so launch.json can use autoPort and a stale process
 * on 4173 can never block startup again.
 */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, normalize, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PORT = Number(process.env.PORT) || 4173;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8'
};

createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    let rel = decodeURIComponent(url.pathname);
    if (rel.endsWith('/')) rel += 'index.html';
    /* keep the server inside ROOT no matter what the request says */
    const path = join(ROOT, normalize(rel).replace(/^(\.\.[/\\])+/, ''));
    if (!path.startsWith(ROOT)) { res.writeHead(403).end('forbidden'); return; }

    let target = path;
    try {
      if ((await stat(target)).isDirectory()) target = join(target, 'index.html');
    } catch {
      /* cleanUrls, the way Vercel serves this: /foo also tries /foo.html */
      if (!extname(target)) target += '.html';
    }

    const body = await readFile(target);
    res.writeHead(200, {
      'Content-Type': TYPES[extname(target).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': 'no-store'
    });
    res.end(body);
  } catch (err) {
    res.writeHead(err.code === 'ENOENT' ? 404 : 500).end(String(err.code || err));
  }
}).listen(PORT, '127.0.0.1', () => {
  console.log(`serving ${ROOT} on http://127.0.0.1:${PORT}`);
});
