# Undergraduate Content Portal Setup

The private portal is available at `/undergraduate/`. It uses server-side password validation and writes content to Supabase.

## 1. Create the Supabase data

1. Create or open the chapter Supabase project.
2. Open **SQL Editor**.
3. Run `supabase/migrations/001_undergraduate_cms.sql`.
4. Run `supabase/migrations/002_seed_existing_gallery.sql`.

The first migration creates `events`, `ice_cold_tuesdays`, and `gallery_images`, plus the public `chapter-media` storage bucket. It also seeds the calendar and Ice Cold Tuesday content that was previously stored in `script.js`. The second migration registers the 79 existing website photos so they can be edited or removed through the portal without moving the original image files.

## 2. Add Vercel environment variables

Add the five values listed in `.env.example` to the Vercel project for Production, Preview, and Development. `SUPABASE_SERVICE_ROLE_KEY`, `UNDERGRAD_PORTAL_PASSWORD`, and `CMS_SESSION_SECRET` must never be placed in public browser code.

Generate `CMS_SESSION_SECRET` as a long random value (at least 32 characters). After adding or changing variables, redeploy the site.

## 3. Use the portal

- **Calendar & recaps:** Add or edit event details, flyers, recap text, and recap photos. Recap photos are also added to the gallery and linked to the event.
- **Ice Cold Tuesday:** Choose a Tuesday, enter its Reel URL, title, caption, and optional thumbnail.
- **Gallery:** Upload one or many photos, add optional text and a category, and optionally connect them to a calendar event.

The public homepage and Events page keep their existing calendar layout and interactions. Supabase content is loaded into those existing components. If Supabase is temporarily unavailable or has not yet been configured, the current hard-coded calendar, Ice Cold Tuesday entry, and gallery remain visible as a fallback.
