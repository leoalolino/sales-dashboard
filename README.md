# Sales Analytics Dashboard

An interactive sales analytics dashboard built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **Recharts**, organized using the **Atomic Design** component methodology.

## Features

- **Multi-Year Sales Data** — View revenue, profit, and orders for 2022, 2023, and 2024
- **Custom Filter Input** — Set a minimum revenue threshold to focus on top-performing months
- **Year Selector** — Toggle between individual years or view all years combined
- **Multiple Chart Types** — Switch between Bar, Line, and Pie charts via toggle buttons
- **API Integration** — Fetch data from a built-in API route or use client-side mock data (toggle with checkbox)
- **Summary Statistics** — Total revenue, total orders, and average monthly revenue with period-over-period change

## Tech Stack

| Tool           | Purpose              |
| -------------- | -------------------- |
| Next.js 15     | React framework      |
| TypeScript     | Type safety          |
| Tailwind CSS   | Styling              |
| Recharts       | Charting library     |
| Atomic Design  | Component structure  |

## Project Structure (Atomic Design)

```
src/
├── app/
│   ├── api/sales/route.ts    # API endpoint with year & minRevenue params
│   ├── dashboard/page.tsx    # Dashboard page
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Landing page
├── components/
│   ├── atoms/                # Smallest building blocks
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── Select.tsx
│   ├── molecules/            # Composed atoms
│   │   ├── ChartTypeSwitcher.tsx
│   │   ├── FilterBar.tsx
│   │   ├── SalesChart.tsx
│   │   └── StatCard.tsx
│   └── organisms/            # Complex UI sections
│       └── SalesDashboard.tsx
└── lib/
    ├── mockData.ts           # Sales data for 2022-2024
    └── types.ts              # TypeScript interfaces
```

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Open in browser
open http://localhost:3000
```

Navigate to the **Dashboard** page to explore the charts and filters.

## API Endpoint

```
GET /api/sales?year=2024&minRevenue=50000
```

| Parameter    | Type   | Description                               |
| ------------ | ------ | ----------------------------------------- |
| `year`       | number | Filter by year (2022, 2023, 2024)         |
| `minRevenue` | number | Minimum revenue threshold per month       |

## Build

```bash
npm run build
```
