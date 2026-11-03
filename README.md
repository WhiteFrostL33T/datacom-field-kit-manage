# Field Kit Manage

Back-office companion to **Datacom Field Kit** — an admins-only, **read-only** Oversight home for the office: live crew, today's jobs, yesterday's recap, the week ahead, and a needs-attention list, all computed live from the same Supabase data Field Kit already collects.

- **Separate app.** Field Kit is not modified in any way; Manage only reads.
- **Admins only.** Sign in with your Field Kit account; non-admin accounts get a closed door.
- **Zero writes.** There is no code path in this app that creates, edits, or deletes Field Kit data.
- **Live.** Realtime subscriptions plus a 5-minute refresh keep timers and flags current.
- **Print.** The Print brief button renders a one-page morning brief (at-a-glance, yesterday, week ahead, today's jobs, needs attention).
- **Jump.** Ctrl/Cmd+K jumps to any job or tech on the page.
- **Demo.** Add `?demo` to the URL to preview the home with sample data, no sign-in needed.

## One-time setup

Run `supabase-manage-readonly.sql` (kept with the project plan) once in the Supabase Dashboard SQL Editor. It adds two SELECT-only policies so admins can read crew time entries and cable pulls. Until it runs, the app loads and shows projects, timers, and schedules, with a banner explaining that hours are waiting on the SQL.

## Version

v1.0 — Oversight home only (schedule board, timesheets, and job costing are later phases, each approved separately).
