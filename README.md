









# Support Ticket Dashboard

A full-stack support ticket management application built as part of the Web Application Developer technical assignment.

The idea behind the application is simple: a small support team should be able to move away from managing customer requests in spreadsheets and instead have one place where they can create, find, review and update support tickets.

The application provides ticket creation, search, filtering, sorting, pagination, ticket details, status and priority updates, and overall ticket statistics.

The application uses PostgreSQL for persistent storage, Prisma for database access, an Express API for the backend, and React for the frontend.

---

## 1. Project Overview

The application is designed around the day-to-day workflow of a support team.

A support agent can:

1. Create a new support ticket.
2. Provide the customer's email and describe the problem.
3. Assign a priority and status.
4. Search for an existing ticket.
5. Filter tickets by status or priority.
6. Sort tickets by creation date.
7. Navigate through tickets using pagination.
8. Open a ticket to see its complete information.
9. Change its status or priority.
10. See overall ticket statistics without those statistics being affected by the active filters.

All ticket data is stored in PostgreSQL, so changes are not lost when the application is refreshed.

---

## 2. Main Features

### Ticket Creation

Users can create a ticket with:

- Title
- Description
- Customer email
- Priority
- Status

The title is limited to 120 characters.

The application validates the form before submitting it so users receive immediate feedback when something is missing or invalid.

The backend validates the same information again using Zod. This is intentional because frontend validation should only improve the user experience; the server should never rely on the client to provide valid data.

When a ticket is created, `createdAt` and `updatedAt` are generated automatically by the database layer.

---

### Ticket Search

The ticket list includes a search box that can search using:

- Ticket title
- Customer email

The search is case-insensitive.

The search is performed by the backend rather than downloading all tickets to the browser and filtering them on the client.

The frontend also debounces the search input so that a request is not sent for every individual keystroke.

---

### Ticket Filtering

Tickets can be filtered by:

- Status

  - Open
  - In Progress
  - Resolved
- Priority

  - Low
  - Medium
  - High

Search and filters can be used together.

For example:


```
Search: payment
Status: Open
Priority: High
```


## Time Spent

Total time spent on the assignment: approximately **5 hours**.

The time was mainly spent on:

- Backend API implementation
- PostgreSQL and Prisma setup
- Database migrations and seed data
- Ticket creation and updates
- Search, filtering, sorting and pagination
- Frontend dashboard implementation
- Responsive UI
- Validation and error handling
- Automated backend tests
- Screenshots and documentation

The implementation was prioritized around the required functionality from the assignment. Features outside the required scope were intentionally not added in order to stay within the requested time limit.

---

## AI Usage

AI tools were used during development as a development aid.

They were mainly used for:

- Debugging TypeScript and runtime errors
- Troubleshooting Prisma and PostgreSQL setup
- Reviewing implementation approaches
- Reviewing API validation and error handling
- Improving code structure and maintainability
- Assisting with documentation
- Reviewing the implementation against the assignment requirements

AI was used to assist with development and problem solving, while the final implementation was reviewed, integrated, tested and adjusted during development.

I understand the submitted code and can explain the implementation, technical decisions and tradeoffs. I can also modify the implementation during the follow-up interview.
