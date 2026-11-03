# Field Kit Manage

Back-office companion to **Datacom Field Kit** — an admins-only, **read-only** Oversight home for the office: live crew, today's jobs, yesterday's recap, the week ahead, and a needs-attention list, all computed live from the same Supabase data Field Kit already collects.

- **Separate app.** Field Kit is not modified in any way; Manage only reads.
- **Admins only.** Sign in with your Field Kit account; non-admin accounts get a closed door.
- **Zero writes.** There is no code path in this app that creates, edits, or deletes Field Kit data.
- **Live.** Realtime subscriptions plus a 5-minute refresh keep timers and flags current.
- **Print.** The Print brief button renders a one-page morning brief (at-a-glance, yesterday, week ahead, today's jobs, needs attention).
- **Timesheets.** A second view (Oversight | Timesheets in the header): everyone's hours for a week or a pay period, click a person for their full day-by-day sheet, with print and CSV export.
- **Projects.** A third view: every job in one filterable, searchable list, and a per-project page with all-time totals, hours by person, and the full entry history.
- **Schedule.** A fourth view: the week as a board — every scheduled job on its days, multi-day jobs spanning, unstaffed jobs flagged, and an unscheduled tray for open jobs with no dates.
- **Jump.** Ctrl/Cmd+K jumps to any job or tech on the page.
- **Demo.** Add `?demo` to the URL to preview with sample data, no sign-in needed — the demo includes a full previous week so Timesheets has something to show.

## One-time setup

Run `supabase-manage-readonly.sql` (kept with the project plan) once in the Supabase Dashboard SQL Editor. It adds two SELECT-only policies so admins can read crew time entries and cable pulls. Until it runs, the app loads and shows projects, timers, and schedules, with a banner explaining that hours are waiting on the SQL.

## Version

v1.3 — Oversight home + Timesheets + Projects + Schedule board. (Job costing is a later phase, approved separately.)

## Timesheets

- **Periods.** Toggle between **Week** (Mon–Sun) and **Pay period** (14 days = two Mon–Sun weeks). ‹ › steps one week or one pay period at a time; **Current** jumps back to today.
- **Pay period anchor.** Pay periods count from an anchor date so the 14-day blocks line up with your real payroll cycle. It defaults to Mon Jan 5, 2026; set **Pay period starts** (shown in pay-period mode) to your actual cycle start and it's remembered on that device.
- **Summary.** One row per person — day totals in week view, Week 1 / Week 2 in pay-period view — with drive hours and an overtime chip whenever a single week passes 40 h. Anyone on the clock right now counts in as "so far" with a live dot.
- **Detail.** Click a person: totals split by kind (Drive / On site / Remote / Shop), a day-total strip, then every entry day by day with job, ticket, times, hours, lunch, and notes.
- **Print & CSV.** Print gives the crew summary plus one page per person with hours. CSV downloads one row per entry (tech, date, job, customer, ticket, kind, start, end, hours, lunch, notes) for the period on screen — completed entries only, running timers are not included.
- Still read-only: timesheets never writes to Field Kit data. Older weeks load on demand when you page back beyond the most recent entries.

## Projects

- **List.** Every project (except deleted ones) with filter chips and counts — Active is the default; also Scheduled, Open, Overdue, Closed, All — plus a text search over job name, customer, and ticket number. Columns: job + customer, ticket, status chip, schedule ("Today", "Day X of Y", a date or range, "Ended <date>" for overdue, "—" when unscheduled), crew avatars, all-time total hours (live dot when a timer is running on the job), and last activity. Sorted by last activity, newest first. Click a row to open the project.
- **Status.** Derived, never stored: Closed › Overdue › In progress (a timer is running) › Worked today › Unstaffed (due today, nobody assigned) › Not started (due today, crew assigned, no time yet) › Scheduled › Open.
- **Detail.** The full story of one job: header with customer · site · ticket, status, schedule, start date (earliest entry, or the project creation date), and the assigned crew; a totals strip (total hours + entry count, Drive / On site / Remote / Shop, cable pulled in feet + last pull date); **Hours by person** — each person's total with a kind-split stacked bar whose length is scaled to the top person's total; **History** — every entry grouped by day with day totals, kind pill, start–end times, lunch deductions, and notes, plus today's running timer as a live row; and the project's notes when set.
- **History depth.** Entries load up front capped at the newest 3,000. Opening a project page fetches that project's entries once (per project per session), merges them in, and re-renders, so long jobs show their complete history. No fetch happens in demo mode.
- **Printing.** The morning brief prints from Oversight and timesheets from the Timesheets tab; the Projects tab has no print output this round. With the Projects tab active, Ctrl+K picks a project to open its page.

## Schedule

- **Board.** The week (Mon–Sun) as a board: every job whose scheduled dates touch the week gets a card on its days, and multi-day jobs stretch across their days in shared lanes. ‹ › steps a week at a time; **This week** jumps back to the current week. Today's column is highlighted whenever it is in view.
- **Cards.** Job name, customer · ticket (the ticket never wraps mid-number), assigned crew as avatars + first names, a range caption with "Day X of Y" while a multi-day job is underway, and a status chip (In progress / Worked today / Closed / Overdue) once the job has touched today or a past day. A job with nobody assigned shows as a red card — "— nobody assigned —" — in any week.
- **Summary + tray.** A line above the board counts the week's jobs and its unstaffed jobs. Under the board, an **Unscheduled** tray lists the open jobs with no dates at all — hours logged so far and last activity, stalest first, with an amber note once a job has been quiet for 7+ days — so backlog never hides just because it has no dates.
- **Click-through.** Clicking any board card or tray row opens that project's page on the Projects tab.
- **Phone.** On narrow screens the board becomes a day-by-day list; a multi-day job appears once, on the day it starts, with its range caption.
- Still read-only — the board is computed from the same loaded projects, members, entries, and timers; it adds no queries and no writes.
