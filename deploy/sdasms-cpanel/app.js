/**
 * SDASMS — cPanel Node.js Entry Point
 *
 * This file is the entry point for cPanel's Phusion Passenger / Node.js App.
 * It simply starts the Next.js standalone server.
 *
 * The standalone server.js (built by `next build` with output: "standalone")
 * is the production-ready server that handles all requests efficiently.
 */

// Start the standalone Next.js server
// The standalone server.js handles everything — routing, SSR, static files, API routes
process.env.HOSTNAME = process.env.HOSTNAME || "0.0.0.0";

require("./server.js");
