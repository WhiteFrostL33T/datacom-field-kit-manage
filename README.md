# Field Kit Manage

Back-office companion to **Datacom Field Kit** — an admins-only Dashboard home for the office: live crew, today's jobs, yesterday's recap, the week ahead, and a needs-attention list, all computed live from the same Supabase data Field Kit already collects.

- **Separate app.** Field Kit is not modified in any way; Manage only reads.
- **Admins only.** Sign in with your Field Kit account; non-admin accounts get a closed door.
- **Field Kit data is never written.** The working views (Dashboard, Timesheets, Projects, Schedule) only read. Manage's one write-capable area is Company Management (gear icon): the company's own setup and the admin list — never Field Kit's projects, entries, or timers.
- **Live.** Realtime subscriptions plus a 5-minute refresh keep timers and flags current.
- **Print.** The Print brief button renders a one-page morning brief (at-a-glance, yesterday, week ahead, today's jobs, needs attention).
- **Timesheets.** A second view (Dashboard | Timesheets in the header): everyone's hours for a week or a pay period, click a person for their full day-by-day sheet, with print and CSV export.
- **Projects.** A third view: every job in one filterable, searchable list, and a per-project page with all-time totals, hours by person, and the full entry history.
- **Schedule.** A fourth view: the week as a board — every scheduled job on its days, multi-day jobs spanning, unstaffed jobs flagged, and an unscheduled tray for open jobs with no dates.
- **Company Management.** A gear icon in the header opens the company using the app — its profile (name + logo), its people and admin access, and its settings.
- **Jump.** Ctrl/Cmd+K jumps to any job or tech on the page.
- **Demo.** Add `?demo` to the URL to preview with sample data, no sign-in needed — the demo includes a full previous week so Timesheets has something to show.

## One-time setup

Run `supabase-manage-readonly.sql` (kept with the project plan) once in the Supabase Dashboard SQL Editor. It adds two SELECT-only policies so admins can read crew time entries and cable pulls. Until it runs, the app loads and shows projects, timers, and schedules, with a banner explaining that hours are waiting on the SQL.

For Company Management (v1.4), also run `supabase-company.sql` once in the same SQL Editor. It is purely additive: it creates the `company_settings` table (company name, logo, pay-period anchor) with a public read rule (the sign-in screen shows the branding before login) and admin-only write rules, and it lets admins grant or remove admin rights from inside Manage. Until it runs, Company Management shows a one-time-setup note and everything else works exactly as before.

## Version

v1.4 — Dashboard home + Timesheets + Projects + Schedule board + Company Management. New in 1.4: the gear icon in the header opens Company Management — company profile (name + logo, shown in the header, on the sign-in screen, and as a letterhead on printouts), people & access (grant or remove admin rights, with a last-admin guard), and company settings including the pay-period anchor (Timesheets reads the company value whenever the company is set up; the per-device value is the fallback). New in 1.3.2: the Print brief action moved out of the header into the view tabs bar as an icon-only printer button (still Dashboard only), and the home section was renamed from Oversight to Dashboard; the timesheet Print and CSV actions joined it in the tabs bar as matching icon buttons (Timesheets only). New in 1.3.1: hovering a block on a crew member's day timeline (Dashboard, Live crew) shows which job it was for, with the kind, times, and duration — a running block shows its elapsed time so far. (Job costing is a later phase, approved separately.)

## Timesheets

- **Periods.** Toggle between **Week** (Mon–Sun) and **Pay period** (14 days = two Mon–Sun weeks). ‹ › steps one week or one pay period at a time; **Current** jumps back to today.
- **Pay period anchor.** Pay periods count from an anchor date so the 14-day blocks line up with your real payroll cycle. It defaults to Mon Jan 5, 2026. Once the company is set up, the anchor is a company setting (Company Management → Settings) that applies to everyone — and the **Pay period starts** field shown in pay-period mode edits that same setting. Before company setup, the value is remembered per device instead.
- **Summary.** One row per person — day totals in week view, Week 1 / Week 2 in pay-period view — with drive hours and an overtime chip whenever a single week passes 40 h. Anyone on the clock right now counts in as "so far" with a live dot.
- **Detail.** Click a person: totals split by kind (Drive / On site / Remote / Shop), a day-total strip, then every entry day by day with job, ticket, times, hours, lunch, and notes.
- **Print & CSV.** Print gives the crew summary plus one page per person with hours. CSV downloads one row per entry (tech, date, job, customer, ticket, kind, start, end, hours, lunch, notes) for the period on screen — completed entries only, running timers are not included.
- Still read-only: timesheets never writes to Field Kit data. Older weeks load on demand when you page back beyond the most recent entries.

## Projects

- **List.** Every project (except deleted ones) with filter chips and counts — Active is the default; also Scheduled, Open, Overdue, Closed, All — plus a text search over job name, customer, and ticket number. Columns: job + customer, ticket, status chip, schedule ("Today", "Day X of Y", a date or range, "Ended <date>" for overdue, "—" when unscheduled), crew avatars, all-time total hours (live dot when a timer is running on the job), and last activity. Sorted by last activity, newest first. Click a row to open the project.
- **Status.** Derived, never stored: Closed › Overdue › In progress (a timer is running) › Worked today › Unstaffed (due today, nobody assigned) › Not started (due today, crew assigned, no time yet) › Scheduled › Open.
- **Detail.** The full story of one job: header with customer · site · ticket, status, schedule, start date (earliest entry, or the project creation date), and the assigned crew; a totals strip (total hours + entry count, Drive / On site / Remote / Shop, cable pulled in feet + last pull date); **Hours by person** — each person's total with a kind-split stacked bar whose length is scaled to the top person's total; **History** — every entry grouped by day with day totals, kind pill, start–end times, lunch deductions, and notes, plus today's running timer as a live row; and the project's notes when set.
- **History depth.** Entries load up front capped at the newest 3,000. Opening a project page fetches that project's entries once (per project per session), merges them in, and re-renders, so long jobs show their complete history. No fetch happens in demo mode.
- **Printing.** The morning brief prints from the Dashboard and timesheets from the Timesheets tab; the Projects tab has no print output this round. With the Projects tab active, Ctrl+K picks a project to open its page.

## Schedule

- **Board.** The week (Mon–Sun) as a board: every job whose scheduled dates touch the week gets a card on its days, and multi-day jobs stretch across their days in shared lanes. ‹ › steps a week at a time; **This week** jumps back to the current week. Today's column is highlighted whenever it is in view.
- **Cards.** Job name, customer · ticket (the ticket never wraps mid-number), assigned crew as avatars + first names, a range caption with "Day X of Y" while a multi-day job is underway, and a status chip (In progress / Worked today / Closed / Overdue) once the job has touched today or a past day. A job with nobody assigned shows as a red card — "— nobody assigned —" — in any week.
- **Summary + tray.** A line above the board counts the week's jobs and its unstaffed jobs. Under the board, an **Unscheduled** tray lists the open jobs with no dates at all — hours logged so far and last activity, stalest first, with an amber note once a job has been quiet for 7+ days — so backlog never hides just because it has no dates.
- **Click-through.** Clicking any board card or tray row opens that project's page on the Projects tab.
- **Phone.** On narrow screens the board becomes a day-by-day list; a multi-day job appears once, on the day it starts, with its range caption.
- Still read-only — the board is computed from the same loaded projects, members, entries, and timers; it adds no queries and no writes.
## Company management

- **Where.** The gear icon in the header (between refresh and your avatar) opens Company Management. It is not a fifth tab — the four working views stay as they are, and no tab is highlighted while you are in it.
- **Profile.** Company name and logo. An uploaded logo is resized in the app (at most 512 px) and stored with the settings, so there is no file hosting to set up. A live preview shows the branded header and the print letterhead as you edit.
- **Branding.** Once a name and logo are saved, they appear in the app header (company name, with "Field Kit Manage" as a muted sub-line), on the sign-in screen, and as a letterhead on the morning brief and the timesheet printouts. Before setup, the FK branding is the fallback and printouts are unchanged.
- **People & access.** Everyone who has an account: name, email, last activity, and an Admin badge where it applies. **Make admin** and **Remove admin** write to the admin list directly. Two guards: the last admin can't be removed (the button disables, with a note saying why), and removing your own admin rights takes a second, confirming tap — after which Manage politely closes the door behind you. Creating or deactivating login accounts isn't possible from a browser app, so this manages admin rights among people who already have accounts.
- **Settings.** The pay-period anchor as a company setting (see Timesheets) — one value for the whole company once set up.
- **The write boundary.** This is the only area of Manage that writes anything, and it only writes Manage's own company setup and the admin list. The working views stay read-only, and Field Kit data is never changed.
- **Demo.** `?demo` shows a fictional company (NorthPeak Integration) with controls that genuinely work against the in-memory demo data; nothing is kept.

