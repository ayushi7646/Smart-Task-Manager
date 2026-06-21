# Smart Task Manager

A task manager built using a multi-agent AI development workflow with AntiGravity and Claude Code. Users can add tasks, mark them complete, delete them, search through them and track progress at a glance.

Live site: https://ayushi7646.github.io/Smart-Task-Manager/

## Features
- Add tasks with priority (high, medium or low) and an optional due date
- Mark tasks complete or move them back to pending
- Delete tasks
- Separate pending and completed sections
- Live total, pending and completed counters
- Search/filter tasks by text
- Light and dark mode toggle
- Fully responsive layout for mobile and desktop


## Tech stack
- HTML for structure
- CSS for styling and theming (light/dark mode via CSS custom properties)
- Vanilla JavaScript for all task logic, no frameworks or build tools


## Project structure
```
Smart-Task-Manager/
├── index.html     # page structure and markup
├── style.css      # theme tokens, layout and component styles
├── script.js      # task logic: add, complete, delete, search, rendering
└── README.md
```

## Agent workflow
This project was built following a four-agent collaborative structure inside AntiGravity:
- Planning Agent — defined the feature set, file structure and implementation approach for the task manager.
- Frontend Agent — designed the UI, including the task input form, pending/completed sections, stats bar and responsive layout.
- Backend Logic Agent — implemented the core task operations: adding, completing, deleting and filtering tasks.
- Integration & Testing Agent — connected the frontend and logic layers, then tested all user flows for bugs and edge cases.

## Running locally
Clone the repo and open index.html directly in a browser, no server or build step required.
```
git clone https://github.com/ayushi7646/Smart-Task-Manager.git
cd Smart-Task-Manager
open index.html
```
