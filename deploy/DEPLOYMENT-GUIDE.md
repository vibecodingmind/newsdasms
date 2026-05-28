# SDASMS — cPanel Deployment Guide

## Overview

This guide walks you through deploying the SDASMS Next.js application to your cPanel hosting so it goes live at **sdasms.com**.

Since this is a **Node.js application** (not a static site), you need cPanel's **"Setup Node.js App"** feature. Most modern cPanel hosts (that support Node.js) provide this.

---

## Step 1: Check Your cPanel Has Node.js Support

1. Log into your cPanel at `https://sdasms.com/cpanel` or `https://sdasms.com:2083`
2. Search for **"Node.js"** or **"Setup Node.js App"**
3. If you see it, you're good! If not, contact your hosting provider and ask them to enable Node.js support.

> **Alternative:** If your cPanel does NOT have Node.js App support, you can ask your host to install it, or consider using a VPS/Cloud hosting that supports Node.js natively.

---

## Step 2: Create the Node.js App in cPanel

1. In cPanel, go to **"Setup Node.js App"**
2. Click **"Create Application"**
3. Fill in the details:
   - **Node.js version**: Select the latest available (18.x or 20.x+ preferred)
   - **Application mode**: `production`
   - **Application root**: `sdasms` (this is the folder where the app files will live, e.g., `/home/USERNAME/sdasms/`)
   - **Application URL**: `sdasms.com` (your domain)
   - **Application startup file**: `app.js`
4. Click **"Create"**

This will create the application directory and set up the Passenger/Node.js environment.

---

## Step 3: Upload the Application Files

### Option A: Using cPanel File Manager

1. Open **File Manager** in cPanel
2. Navigate to the application root you set (e.g., `/home/USERNAME/sdasms/`)
3. **Delete any default files** cPanel created in that directory
4. Upload the `sdasms-cpanel.zip` file
5. **Extract** the zip file
6. Move all extracted files to the application root

### Option B: Using SSH/FTP

```bash
# Connect via SSH or SFTP
# Upload the entire sdasms-cpanel folder contents to /home/USERNAME/sdasms/

# Or use SCP:
scp -r sdasms-cpanel/* USERNAME@sdasms.com:/home/USERNAME/sdasms/
```

---

## Step 4: Configure the Environment

1. In cPanel's **"Setup Node.js App"**, find your application
2. Under **"Environment variables"**, add:
   - `SDASMS_API_TOKEN` = `158|uXKGmvYYrvKBaw0pr9in439L8qxkAzkfqhzjbv0G32c3bb88`
   - `SMTP_HOST` = `mail.sdasms.com`
   - `SMTP_PORT` = `465`
   - `SMTP_USER` = `hello@sdasms.com`
   - `SMTP_PASS` = `R@tir@dH@ro2030`
   - `MPESA_LIPA_NUMBER` = `51720044`
   - `BANK_NAME` = `Equity Bank Tanzania`
   - `BANK_ACCOUNT_NAME` = `SDASMS Marketing Agency`
   - `BANK_ACCOUNT_NUMBER` = `3002211802039`
   - `NODE_ENV` = `production`
   - `PORT` = `3000`

3. Alternatively, the `.env` file is already included in the deployment package.

---

## Step 5: Start the Application

1. In cPanel's **"Setup Node.js App"**, click **"Run NPM Install"** (if needed)
2. Click **"Restart"** to start the application
3. The app should now be running on your domain!

---

## Step 6: Set Up the Domain (if needed)

If your domain isn't already pointing to the Node.js app:

1. In cPanel, go to **"Domains"** or **"Addon Domains"**
2. Make sure `sdasms.com` document root is set to the Node.js app directory
3. The `.htaccess` in `public_html` should proxy requests to the Node.js app

### For Phusion Passenger (most cPanel Node.js setups):
- The document root should point to your Node.js app directory
- Passenger automatically handles the proxy — no `.htaccess` needed

### For Apache Proxy setup:
- Place the `.htaccess` file (provided) in `public_html`
- Make sure `mod_proxy` and `mod_proxy_http` are enabled

---

## Step 7: Create Uploads Directory

Make sure the uploads directory exists and is writable:

```bash
mkdir -p /home/USERNAME/sdasms/uploads/onboard
chmod 755 /home/USERNAME/sdasms/uploads
chmod 755 /home/USERNAME/sdasms/uploads/onboard
```

---

## Step 8: Verify Everything Works

1. Visit `https://sdasms.com` — you should see the SDASMS homepage
2. Test the onboard form at `https://sdasms.com/get-started`
3. Test the pricing page at `https://sdasms.com/pricing`
4. Check that dark/light mode toggle works
5. Test the contact form

---

## Troubleshooting

### Site shows "Application Error" or blank page
- Check the Node.js app logs in cPanel > Setup Node.js App > "Application Logs"
- Make sure the `.env` file is in the root of the app directory
- Restart the Node.js app

### 502 Bad Gateway
- The Node.js app might not be running — restart it in cPanel
- Check if the port is correct (should be 3000 or the one assigned by cPanel)

### CSS/JS not loading
- Make sure the `.next/static` folder exists in the deployment
- Check browser console for 404 errors
- Try hard refresh (Ctrl+Shift+R)

### Emails not sending
- Verify SMTP credentials in the environment variables
- Check that `mail.sdasms.com` is accessible from the server
- Check the application logs for SMTP errors

### API routes return 500 errors
- Check application logs in cPanel
- Make sure `SDASMS_API_TOKEN` environment variable is set
- Verify file upload directory permissions

---

## File Structure on Server

```
/home/USERNAME/sdasms/
├── app.js                    # Entry point for cPanel Node.js App
├── server.js                 # Next.js standalone server
├── .env                      # Environment variables
├── package.json              # Package config
├── .next/
│   ├── static/               # Static assets (CSS, JS, images)
│   ├── standalone/            # Server bundle
│   └── server/                # Server pages
├── public/                    # Public static files (favicon, etc.)
├── uploads/
│   └── onboard/              # File uploads from registration
└── node_modules/              # Dependencies
```

---

## Important Notes

1. **This is NOT a static site** — it requires Node.js runtime for API routes, SSR, and email sending
2. **SSL/HTTPS** — Use cPanel's "SSL/TLS" or "Let's Encrypt" to enable HTTPS
3. **Backups** — Always keep a backup before making changes
4. **Updates** — To update, rebuild and re-upload the deployment package
