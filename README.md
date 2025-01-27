# Payments App

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Postgres](https://img.shields.io/badge/Postgres-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TurboRepo](https://img.shields.io/badge/TurboRepo-EF4444?style=for-the-badge&logo=turborepo&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3178C6?style=for-the-badge&logo=zod&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![Amazon EC2](https://img.shields.io/badge/Amazon%20S3-FF9900?style=for-the-badge&logo=amazondec2&logoColor=white)

A robust payment processing application designed with a modern tech stack. It uses Postgres as the database, Prisma for ORM, and Next.js for the frontend, all managed in a monorepo structure with TurboRepo.

---

## 🚀 Getting Started

### Prerequisites
Ensure you have the following installed:
- [Docker](https://www.docker.com/get-started)
- [Node.js](https://nodejs.org/)
- [NPM](https://docs.npmjs.com/)

---

### 🗂 Project Structure

```
.
├── apps
│   ├── bank-webhook        # Handles bank webhook processing
│   ├── mock-bank           # Mock bank Next.js application
│   └── user-app            # User-facing Next.js application
├── packages
│   ├── db                  # Prisma setup and database migrations
│   ├── eslint-config       # Shared ESLint configurations
│   ├── managed_context     # Metadata for managed environments
│   ├── store               # Shared state management (e.g., Recoil atoms/hooks)
│   ├── test_suite_analysis # Test suite analysis metadata
│   ├── typescript-config   # Shared TypeScript configurations
│   └── ui                  # Reusable UI components
├── turbo.json              # TurboRepo configuration
├── package.json            # Root-level package definitions
├── package-lock.json       # Dependency lockfile
└── tsconfig.json           # Root-level TypeScript configuration# Payments App
├── package-lock.json       # Dependency lockfile
└── tsconfig.json           # Root-level TypeScript configuration
```

### Important Todos
- Deployment fix for EC2
- Reverse Proxy using NGINX
- CI/CD Pipeline 
