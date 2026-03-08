# Rap sheet map assets

The rap sheet shows a small map under the headshot: **state outline** + **fraternity hand sign** on the brother’s city.

## What you need to add

### 1. Hand sign (one file)
- **Path:** `assets/hand-sign.png`
- Your gold fraternity hand sign image.
- Use a **transparent background** (PNG) so it sits cleanly on the state.

### 2. State outlines (one file per state)
- **Folder:** `assets/states/`
- **Filenames (lowercase):** `va.png`, `md.png`, `pa.png`, `al.png`, `ga.png`, `nc.png`
- **Best result:** Transparent background + **gold border** (stroke) so the state reads well on the dark background.
- If your current outlines are not transparent or not gold, you can:
  - Replace them with PNGs that have transparency and a gold outline, or
  - Use SVG (same names with `.svg`) and we can style stroke in code later.

### 3. (Optional) Adjust city positions
- In `script.js`, find **`CITY_POSITION`**.
- Each city has `[x%, y%]` (0–100). The hand sign is placed at that point on the state.
- Tweak those numbers so the hand lines up with the correct city on your state images.
- Add or change keys to match how hometowns are written (e.g. `"prince george's county"` for Prince George’s County, MD).

## Summary

| Asset              | Location                 | Notes                          |
|--------------------|--------------------------|--------------------------------|
| Hand sign          | `assets/hand-sign.png`   | Transparent PNG, gold hand     |
| Virginia           | `assets/states/va.png`   | Transparent + gold border best |
| Maryland           | `assets/states/md.png`   | Same                           |
| Pennsylvania       | `assets/states/pa.png`   | Same                           |
| Alabama            | `assets/states/al.png`   | Same                           |
| Georgia            | `assets/states/ga.png`   | Same                           |
| North Carolina     | `assets/states/nc.png`   | Same                           |

Once these files are in place, the rap sheet map will show the correct state and city for each brother.
