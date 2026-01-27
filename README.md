#  Diagnostic Report Manager

A modern, React application to manage and view diagnostic reports.

## Table of Contents

- [Overview](#overview)  
- [Features](#features)  
- [Architecture & Design](#architecture--design)  
- [Installation](#installation)  
- [Usage](#usage)  
- [Technical Notes](#technical-notes)  
- [Patterns & Best Practices](#patterns--best-practices)  
- [Testing](#testing)  
- [Future Improvements](#future-improvements)  

---

## Overview

This application allows users to:

- View a list of diagnostic reports efficiently  
- Filter reports in real-time by name using URL-driven search  
- Paginate results dynamically  
- View individual reports with interactive cards  
- Experience accessible and responsive UI  

---

## Features

### Upload Form (POST Simulation)

- Drag & Drop file upload using **react-dropzone**
- Multiple file support with type validation (PDF, CSV)
- Simulated upload lifecycle:
  - **Loading**: progress indicator with animated bar
  - **Success**: file added to the list after simulated delay
  - **Error**: retry option available
- Upload simulation waits **2 seconds** before completing (Promise / setTimeout)
- Each file is assigned a **unique ID** for reliable state management
- Fully accessible dropzone with ARIA labels and keyboard support and SSR rendering

### Utilities

- `cn()`: Tailwind + clsx + tailwind-merge helper for clean class management  
- `getReportColor()`: Maps report type to color (Strategy Pattern functional implementation)  
- `formatDate()`: Formats dates using date-fns  

### User Experience

- Debounce search to improve performance  
- Keyboard-friendly navigation and focus management  
- Accessible components with ARIA labels and screen reader hints  
- Modular, reusable components for maintainability  

---

## Architecture & Design

### Key Components

- **Dropzone**
  - Responsible only for file intake and validation
  - Emits accepted files upward (no business logic)

- **useFileUpload (custom hook)**
  - Centralizes upload state and simulation logic
  - Manages progress, status transitions, retry, and removal
  - Simulates network latency using a 2-second delay

- **UploadList**
  - Renders uploaded files using a column-based configuration
  - Delegates rendering responsibility to composable cells

  - **ReportCard**: Interactive card with hover effect, split text animation, and status badges  

  - **ReportTable**: Column strategies, Upload renderers & Memoized sorting, keyboard navigation, pagination, and ARIA labels  

  - **SearchInput**: Real-time search with debounce, URL sync, and accessible input  

  - **Reports-Store**:treated the store as a domain layer, It centralizes report CRUD operations selectors

  - **UploadStrategy & UploadStrategyManager**: Implements the Strategy Pattern and Decouples file-specific rules from UI and upload logic Makes it easy to add new file types in the future without touching the hook or Dropzone

### Key Patterns

- ** Strategy Pattern**: `getReportColor()` maps report types to color badges; easily extensible to icons, validation, or other behaviors  
- **Component-first architecture**: UI separated from logic for maintainability  
- **Server Actions & Mock API**: `getAllReports()` and `getReport()` simulate backend calls with filters and pagination  
- **Memoization & Callback Optimization**: `useMemo` and `useCallback` prevent unnecessary re-renders  

---



### Patterns & Best Practices

| Feature | Pattern | Description |
|-------|--------|-------------|
| DataTable / UploadList | Strategy Pattern | Column-based configuration defines how each cell is rendered, enabling flexible layouts without conditionals |
| UploadList / UploadItem | Strategy Pattern | Upload items are rendered through interchangeable rendering strategies based on file state |
| getReportColor() | Functional Strategy Pattern | Maps report types to UI behavior without conditionals |
| useFileUpload | State Reducer + Controller | Centralized upload logic decoupled from UI components |
| Report Detail Page | Next.js Dynamic Route Pattern | Route-based data fetching using `/reports/[id]` |



### Technical Discussion: Scaling File Uploads Beyond 1GB

Our frontend architecture is designed to handle large file uploads gracefully:

- **Decoupled components:** `UploadList` and `UploadItem` are independent of upload logic
- **Centralized state:** `useFileUpload` manages progress, errors, and retries
- **Extensible design:** Supports chunked uploads, resumable uploads, or direct-to-cloud strategies without UI refactoring
- **Non-blocking UI:** Progress tracking, error handling, and retry logic work seamlessly even for long-running uploads
- **Performance-optimized:** Components use memoization and prevent unnecessary re-renders
- **Accessible feedback:** Upload progress, errors, and completion status can be made perceivable via ARIA live regions for screen readers

> This frontend is ready to integrate with any backend upload strategy (chunked, resumable, streaming) without requiring component rewrites. The separation of concerns ensures scalability and maintainability.

## Installation

```bash
# Clone the repo
git clone https://github.com/andersondev17/diagnostic-report-manager.git

cd diagnostic-report-manager

# Define environment variables (optional)
# NODE_ENV can be "development" or "production"
export NODE_ENV=development 

# Install dependencies
npm install

# Run locally
npm run dev


