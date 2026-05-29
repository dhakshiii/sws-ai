# Deployment Guide

## Backend

1. Open a terminal in `backend/`.
2. Use the local Maven binary downloaded in this workspace or your installed Maven.
3. For the default local profile:
   - `..\.tools\apache-maven-3.9.9\bin\mvn.cmd -s settings.xml spring-boot:run`
4. For MySQL:
   - Set `SPRING_PROFILES_ACTIVE=mysql`
   - Set `DB_URL`, `DB_USERNAME`, and `DB_PASSWORD`
   - Run the same Maven command.

## Frontend

1. Open a second terminal in `frontend/`.
2. Install packages with `npm install`.
3. Start the dev server with `npm run dev`.

## Build Commands

- Backend tests: `..\.tools\apache-maven-3.9.9\bin\mvn.cmd -s settings.xml test`
- Frontend build: `npm run build`
