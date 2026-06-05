# Add Edit Profile modal dialog

**Author:** @jordan-dev  ·  **Branch:** `pr/edit-profile-modal` → `main`

## What this does

Implements the Edit Profile modal from the Figma (`docs/dialog.png`). Clicking
**Edit profile** builds and shows the dialog with Name and Username fields, an
"Editing as @username" hint, and a **Save changes** button. Saving persists the values
so they're pre-filled the next time you open it. Closes via the X, the backdrop, or Save.

## Implementation notes

- The dialog is built fresh each time it opens, so it always reflects the latest saved
  values — no stale state to manage.
- Keeps the dialog vertically centered on scroll/resize.
- Deep-clone the saved profile on save so we never mutate state by accident.

## How I tested

- Opened in Chrome, edited and saved, reopened — values persisted, hint updated.
- X, backdrop, and Save all close it.
- Scrolled/resized with it open; stays centered.

## Checklist

- [x] Matches the design
- [x] Works in Chrome
- [x] No console errors
- [x] Types compile

Solid component IMO — ready for review.
