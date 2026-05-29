# SWS AI Document Management Dashboard

Document management dashboard built with React, Vite, Tailwind CSS, Spring Boot, JPA, WebSocket, and MySQL-ready persistence.

## Features

- Single and bulk PDF upload
- Drag-and-drop upload zone
- Individual upload progress bars per file
- File metadata and upload status tracking
- Persistent document table with download links
- Smart notification flow for batches larger than 3 files
- Realtime notifications across routes with Spring WebSocket
- Notification center with unread count, mark read, and mark all read

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, Axios, React Router
- Backend: Java 17 compatible Spring Boot app, Spring Web, Spring Data JPA, Spring WebSocket
- Database:
  - Default local run: H2 file database for quick verification
  - Interview/production mode: MySQL profile

## Project Structure

- `frontend/` React application
- `backend/` Spring Boot API and WebSocket server
- `database/schema.sql` SQL schema reference
- `docs/deployment-guide.md` run and deployment notes

## Run the Backend

This workspace includes a local Maven download in `.tools/` because Maven was not installed globally in the environment used for development.

From `backend/`:

```powershell
..\.tools\apache-maven-3.9.9\bin\mvn.cmd -s settings.xml test
..\.tools\apache-maven-3.9.9\bin\mvn.cmd -s settings.xml spring-boot:run
```

The default profile uses H2 so the app can start immediately.

### Run With MySQL

Create a MySQL database named `document_dashboard`, then set:

```powershell
$env:SPRING_PROFILES_ACTIVE="mysql"
$env:DB_URL="jdbc:mysql://localhost:3306/document_dashboard"
$env:DB_USERNAME="root"
$env:DB_PASSWORD="root"
..\.tools\apache-maven-3.9.9\bin\mvn.cmd -s settings.xml spring-boot:run
```

## Run the Frontend

From `frontend/`:

```powershell
npm install
npm run dev
```

The frontend expects the backend API at `http://localhost:8080/api` by default.

Optional overrides:

```powershell
$env:VITE_API_BASE_URL="http://localhost:8080/api"
$env:VITE_WS_URL="http://localhost:8080/ws"
```

## Build Checks

Backend:

```powershell
..\.tools\apache-maven-3.9.9\bin\mvn.cmd -s settings.xml test
```

Frontend:

```powershell
npm run build
```

## API Endpoints

### Documents

- `POST /api/documents/upload`
- `GET /api/documents`
- `GET /api/documents/{id}/download`

### Notifications

- `GET /api/notifications`
- `GET /api/notifications/unread-count`
- `PATCH /api/notifications/{id}/read`
- `PATCH /api/notifications/read-all`

## Notes

- Bulk upload notifications are triggered when more than 3 files are uploaded in the same selection.
- Each file is uploaded through its own request so the UI can show real per-file progress.
- Realtime notifications are delivered over Spring WebSocket and remain visible on the notifications page after refresh because they are persisted in the backend database.
