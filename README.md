# Field Kit Manage

Back-office companion to **Datacom Field Kit** — an admins-only, **read-only** Oversight home for the office: live crew, today's jobs, yesterday's recap, the week ahead, and a needs-attention list, all computed live from the same Supabase data Field Kit already collects.

- **Separate app.** Field Kit is not modified in any way; Manage only reads.
- **Admins only.** Sign in with your Field Kit account; non-admin accounts get a closed door.
- **Zero writes.** There is no code path in this app that creates, edits, or deletes Field Kit data.
- **Live.** Realtime subscriptions plus a 5-minute refresh keep timers and flags current.
- **Print.** The Print brief button renders a one-page morning brief (at-a-glance, yesterday, week ahead, today's jobs, needs attention).
- **Timesheets.** A second view (Oversight | Timesheets in the header): everyone's hours for a week or a pay period, click a person for their full day-by-day sheet, with print and CSV export.
- **Jump.** Ctrl/Cmd+K jumps to any job or tech on the page.
- **Demo.** Add `?demo` to the URL to preview with sample data, no sign-in needed — the demo includes a full previous week so Timesheets has something to show.

## One-time setup

Run `supabase-manage-readonly.sql` (kept with the project plan) once in the Supabase Dashboard SQL Editor. It adds two SELECT-only policies so admins can read crew time entries and cable pulls. Until it runs, the app loads and shows projects, timers, and schedules, with a banner explaining that hours are waiting on the SQL.

## Version

v1.1.1 — Oversight home + Timesheets. (v1.1.1: navigation is now a top bar under the header.). (Schedule board and job costing are later phases, each approved separately.)

## Timesheets

- **Periods.** Toggle between **Week** (Mon–Sun) and **Pay period** (14 days = two Mon–Sun weeks). ‹ › steps one week or one pay period at a time; **Current** jumps back to today.
- **Pay period anchor.** Pay periods count from an anchor date so the 14-day blocks line up with your real payroll cycle. It defaults to Mon Jan 5, 2026; set **Pay period starts** (shown in pay-period mode) to your actual cycle start and it's remembered on that device.
- **Summary.** One row per person — day totals in week view, Week 1 / Week 2 in pay-period view — with drive hours and an overtime chip whenever a single week passes 40 h. Anyone on the clock right now counts in as "so far" with a live dot.
- **Detail.** Click a person: totals split by kind (Drive / On site / Remote / Shop), a day-total strip, then every entry day by day with job, ticket, times, hours, lunch, and notes.
- **Print & CSV.** Print gives the crew summary plus one page per person with hours. CSV downloads one row per entry (tech, date, job, customer, ticket, kind, start, end, hours, lunch, notes) for the period on screen — completed entries only, running timers are not included.
- Still read-only: timesheets never writes to Field Kit data. Older weeks load on demand when you page back beyond the most recent entries.
