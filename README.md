#  Diagnostic Report Manager

A modern, React application showcasing clean architecture, SOLID principles, and modern frontend patterns for managing diagnostic reports at scale.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16.1-black.svg)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB.svg)](https://reactjs.org/)
[![Zustand](https://img.shields.io/badge/Zustand-5.0-orange.svg)](https://github.com/pmndrs/zustand)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC.svg)](https://tailwindcss.com/)

---

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

### ✨ **Clean Architecture in Practice**
- **Layered separation**: UI → Orchestration → Business Logic → Technical Infrastructure
- **Dependency Inversion**: Components depend on abstractions, not implementations
- **Single Responsibility**: Each module has exactly one reason to change
- **Open/Closed Principle**: Extensible without modifying existing code

### 🏗️ **Design Patterns**
- **Strategy Pattern** for file validation (add new file types without touching existing code)
- **Facade Pattern** for complex upload flows
- **Column Strategy** for flexible, reusable data tables
- **Server Actions** for type-safe, optimized data fetching

### 🔒 **Type Safety First**
- **Branded types** prevent ID mixing bugs
- **Exhaustive enums** catch state bugs at compile time
- **Generic components** with full type inference
- **No `any` types** in production code

### ⚡ **Performance Optimized**
- **Server-Side Rendering** for instant page loads
- **Strategic memoization** prevents unnecessary re-renders
- **Efficient state management** with Zustand (no Provider hell)
- **Code splitting** and lazy loading where it matters

---

## Features

### Upload Form (POST Simulation)

- **Multi-file drag & drop** with `react-dropzone`
- **Type validation** via Strategy Pattern (PDF, CSV, extensible to any format)
- **Real-time progress tracking** with simulated 2-second upload lifecycle
- **Error recovery** with one-click retry
- **Accessible** with full ARIA labels and keyboard navigation

**Architecture Highlight:**
```typescript
// Adding a new file type requires ZERO changes to existing code
class CsvUploadStrategy implements UploadStrategy {
  supports(file) { return file.type ===  ReportType.CSV }
  validate(file) { /* rules */ }
  getIcon() { return  }
}
// Just register it - done!
```

### 📊 Dynamic Report Management

- **Server-side filtering & pagination** for optimal performance
- **Real-time search** with debounced URL sync
- **Sortable, accessible tables** with keyboard navigation
- **Responsive cards** with smooth animations
- **Empty states** with helpful CTAs

**Architecture Highlight:**
```tsx
// DataTable is 100% reusable - works with ANY data type
<DataTable
  columns={reportColumns}
  data={reports}
  onRowClick={handleNavigate}
  enableKeyboardNav
/>

<DataTable
  columns={uploadColumns}
  data={files}
  onRowClick={handleRetry}
/>
```
### Utilities

- `cn()`: Tailwind + clsx + tailwind-merge helper for clean class management  
- `getReportColor()`: Maps report type to color (Strategy Pattern functional implementation)  
- `formatDate()`: Formats dates using date-fns  

### User Experience

- Debounce search to improve performance  
- Keyboard-friendly navigation and focus management  
- Accessible components with ARIA labels and screen reader hints  
- Modular, reusable components for maintainability  
### Key Architectural Decisions

| Decision | Rationale | Benefit |
|----------|-----------|---------|
| **Single StrategyManager instance** | Prevent duplicate validation, memory waste |  memory reduction, consistent rules |
| **Validation in useUploadFlow only** | Separation of concerns (SRP) | No duplicate logic, easier testing |
| **Columns in useUploadFlow** | Cohesion (columns depend on hook internals) | Single source of truth, proper memoization |
| **Server Actions for data** | Type-safe, server-side filtering | No client fetching, instant page loads |
| **Zustand over Redux** | No boilerplate, no Provider hell | 70% less code, better DX |

---

## Architecture & Design

### Key Components

| File | Purpose | Pattern |
|------|---------|---------|
| `useUploadFlow.ts` | Orchestrates upload (validation + upload + UI) | Facade |
| `upload-manager.ts` | Selects validation strategy | Strategy + Manager |
| `upload-strategies.tsx` | PDF/CSV validation rules | Strategy (Concrete) |
| `DataTable.tsx` | Generic, reusable table | Column Strategy |
| `reports-store.ts` | Global state with persistence | Observer |
| `report.actions.ts` | Server-side data fetching | Server Actions |


### Key Patterns

| Feature | Pattern | Description |
|-------|--------|-------------|
| DataTable / UploadList | Strategy Pattern | Column-based configuration defines how each cell is rendered, enabling flexible layouts without conditionals |
| UploadList / UploadItem | Strategy Pattern | Upload items are rendered through interchangeable rendering strategies based on file state |
| getReportColor() | Functional Strategy Pattern | Maps report types to UI behavior without conditionals |
| useFileUpload | State Reducer + Controller | Centralized upload logic decoupled from UI components |
| Report Detail Page | Next.js Dynamic Route Pattern | Route-based data fetching using `/reports/[id]` |

---


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


