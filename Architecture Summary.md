# Architecture Summary

## System Architecture

The Chargeback Lifecycle Tracker follows a client-server architecture consisting of a Next.js frontend and a FastAPI backend.

### Frontend Layer

The frontend is built using Next.js 14 and TypeScript, providing a responsive analytics dashboard for visualizing chargeback data. The user interface includes:

- Statistics and KPI visualizations
- Chargeback case management table
- Interactive dispute timeline viewer
- Merchant evidence tracking
- Root cause analysis
- Intelligence sidebar with operational context
- Dynamic filtering controls
- Sample data export functionality

Visualization components are implemented using Recharts, while Tailwind CSS provides styling aligned with Real Rails design requirements.

### Backend Layer

The backend is built using FastAPI and exposes REST endpoints that provide:

- Chargeback case data
- Case timeline information
- Dispute outcome statistics
- Dashboard KPIs
- Downloadable sample datasets

The backend generates synthetic chargeback records and dispute lifecycle events to simulate real-world payment dispute workflows.

### Data Flow

1. User interacts with dashboard filters.
2. Frontend requests filtered data from FastAPI endpoints.
3. Backend processes filters and returns structured JSON.
4. Frontend updates charts, tables, and timelines dynamically.
5. Users can export sample chargeback datasets through the download endpoint.

### Key Components

Frontend:
- Next.js
- TypeScript
- Tailwind CSS
- Recharts
- TanStack Table

Backend:
- FastAPI
- Pydantic
- Pandas

Data Sources:
- Synthetic Chargeback Dataset
- CFPB Consumer Complaint Database (reference context)
- Federal Reserve Payments Study (reference context)