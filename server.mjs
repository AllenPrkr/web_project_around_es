import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";

const port = 5500;
const host = "127.0.0.1";
const publicDirectory = join(process.cwd(), "public");
const contentTypes = {
  ".css": "text/css",
  ".html": "text/html",
  ".js": "text/javascript",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
};

const server = createServer(async (request, response) => {
  const pathname = new URL(request.url ?? "/", `http://${host}`).pathname;
  const requestedPath = normalize(
    pathname === "/" ? "index.html" : pathname.slice(1),
  );
  const filePath = join(publicDirectory, requestedPath);

  if (!filePath.startsWith(publicDirectory)) {
    response.writeHead(403).end("Forbidden");
    return;
  }

  try {
    await stat(filePath);
    response.writeHead(200, {
      "Content-Type": contentTypes[extname(filePath)] ?? "application/octet-stream",
    });
    createReadStream(filePath).pipe(response);
  } catch {
    response.writeHead(404).end("Not found");
  }
});

server.listen(port, host, () => {
  console.log(`Aplicación disponible en http://${host}:${port}/`);
});
