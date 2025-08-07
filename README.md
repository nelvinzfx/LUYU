# LUYU - Platform Ojol Syariah

## Purpose

LUYU is a concept application for a sharia-based ride-hailing platform. The
project showcases how users might manage their bookings, payments and account
information in a clean and modern interface.

## Key Features

- **Dashboard:** Central hub that summarizes activity and quick actions.
- **Orders:** List, track and manage current or past ride orders.
- **Wallet:** Top up, withdraw and review transaction history.
- **Analytics:** Basic charts and statistics for rides and finances.
- **Settings:** Manage profile details and security preferences.

## Technology Stack

The prototype is built with a simple web stack to keep development light:

- **HTML5** for structure
- **CSS3** for styling
- **Vanilla JavaScript** for interactivity and state management

## Running Locally

Since LUYU is a static web application you can preview it using any static file
server. One easy option is to use [`http-server`](https://www.npmjs.com/package/http-server):

```bash
npm install -g http-server
http-server .
```

Then navigate to `http://localhost:8080` in your browser to explore the app.
You can also use other tools such as `python -m http.server` if preferred.

## Contributing

Contributions are welcome! To keep the project consistent please follow these
guidelines:

### Coding Style

- Use two spaces for indentation.
- Prefer descriptive variable and function names.
- Keep HTML, CSS and JavaScript in separate sections and avoid unused code.
- Run a formatter such as [Prettier](https://prettier.io/) before committing.

### Roadmap

- Improve mobile responsiveness and dark‑mode support.
- Add real backend integration for orders and wallet operations.
- Expand analytics with export options and richer charts.
- Provide automated tests and linting scripts.
