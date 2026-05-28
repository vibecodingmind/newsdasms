/**
 * SDASMS — cPanel Node.js Entry Point
 *
 * This is the startup file for cPanel's "Setup Node.js App" feature.
 * It launches the Next.js standalone server which handles all routing.
 *
 * cPanel/Passenger automatically sets the PORT environment variable.
 * The standalone server.js reads PORT and binds to it.
 */

// Set production mode
process.env.NODE_ENV = 'production';
process.env.HOSTNAME = '0.0.0.0';

// Start the Next.js standalone server
require('./server.js');
