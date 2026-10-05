import {
  Priority,
  Status,
} from "../src/generated/prisma/client.js";
import { prisma } from "../src/lib/prisma.js";

type SeedTicket = {
  title: string;
  description: string;
  customerEmail: string;
  priority: Priority;
  status: Status;
  daysAgo: number;
};

const tickets: SeedTicket[] = [
  {
    title: "Payment failed",
    description:
      "Customer cannot complete payment; card is declined at checkout.",
    customerEmail: "olivia.martin@example.com",
    priority: "HIGH",
    status: "OPEN",
    daysAgo: 1,
  },
  {
    title: "Cannot reset password",
    description:
      "Reset email never arrives, even after checking spam.",
    customerEmail: "liam.johnson@example.com",
    priority: "MEDIUM",
    status: "OPEN",
    daysAgo: 2,
  },
  {
    title: "Account locked",
    description:
      "Account locked after several failed login attempts.",
    customerEmail: "emma.davis@example.com",
    priority: "HIGH",
    status: "IN_PROGRESS",
    daysAgo: 2,
  },
  {
    title: "Invoice missing",
    description:
      "March invoice is not visible in the billing section.",
    customerEmail: "noah.wilson@example.com",
    priority: "LOW",
    status: "RESOLVED",
    daysAgo: 14,
  },
  {
    title: "Unable to upload document",
    description:
      "PDF upload stalls at 100% and then shows an error.",
    customerEmail: "ava.thompson@example.com",
    priority: "MEDIUM",
    status: "OPEN",
    daysAgo: 3,
  },
  {
    title: "Subscription cancellation",
    description:
      "Customer wants to cancel before the next billing cycle.",
    customerEmail: "william.brown@example.com",
    priority: "LOW",
    status: "IN_PROGRESS",
    daysAgo: 4,
  },
  {
    title: "Login issue",
    description:
      "Login page keeps redirecting back to itself.",
    customerEmail: "sophia.miller@example.com",
    priority: "HIGH",
    status: "OPEN",
    daysAgo: 1,
  },
  {
    title: "Refund request",
    description:
      "Charged twice for the annual plan; requesting a refund.",
    customerEmail: "james.garcia@example.com",
    priority: "HIGH",
    status: "IN_PROGRESS",
    daysAgo: 5,
  },
  {
    title: "Wrong billing address on invoice",
    description:
      "Invoice shows the old billing address.",
    customerEmail: "isabella.rodriguez@example.com",
    priority: "LOW",
    status: "RESOLVED",
    daysAgo: 20,
  },
  {
    title: "Two-factor code not received",
    description:
      "SMS verification codes are not delivered.",
    customerEmail: "benjamin.lee@example.com",
    priority: "HIGH",
    status: "OPEN",
    daysAgo: 0,
  },
  {
    title: "Export to CSV is empty",
    description:
      "Exported report contains headers but no rows.",
    customerEmail: "mia.walker@example.com",
    priority: "MEDIUM",
    status: "IN_PROGRESS",
    daysAgo: 6,
  },
  {
    title: "Dashboard loads slowly",
    description:
      "Dashboard takes more than 20 seconds to load.",
    customerEmail: "lucas.hall@example.com",
    priority: "MEDIUM",
    status: "OPEN",
    daysAgo: 7,
  },
  {
    title: "Change account email",
    description:
      "Needs to change the account email to a new domain.",
    customerEmail: "charlotte.allen@example.com",
    priority: "LOW",
    status: "RESOLVED",
    daysAgo: 25,
  },
  {
    title: "Promo code not applied",
    description:
      "Discount code SPRING20 is rejected at checkout.",
    customerEmail: "henry.young@example.com",
    priority: "LOW",
    status: "OPEN",
    daysAgo: 8,
  },
  {
    title: "Cannot add team member",
    description:
      "Invite button is disabled on the team page.",
    customerEmail: "amelia.king@example.com",
    priority: "MEDIUM",
    status: "IN_PROGRESS",
    daysAgo: 9,
  },
  {
    title: "App crashes on startup",
    description:
      "Mobile app closes immediately after the splash screen.",
    customerEmail: "alexander.wright@example.com",
    priority: "HIGH",
    status: "RESOLVED",
    daysAgo: 12,
  },
  {
    title: "Duplicate notifications",
    description:
      "Receiving each notification email twice.",
    customerEmail: "harper.scott@example.com",
    priority: "LOW",
    status: "OPEN",
    daysAgo: 10,
  },
  {
    title: "Missing data after migration",
    description:
      "Several projects are missing after the account migration.",
    customerEmail: "daniel.green@example.com",
    priority: "HIGH",
    status: "IN_PROGRESS",
    daysAgo: 3,
  },
  {
    title: "Update credit card",
    description:
      "Unable to save a new credit card in settings.",
    customerEmail: "evelyn.baker@example.com",
    priority: "MEDIUM",
    status: "IN_PROGRESS",
    daysAgo: 18,
  },
  {
    title: "API key not working",
    description:
      "New API key returns 401 on every request.",
    customerEmail: "matthew.adams@example.com",
    priority: "HIGH",
    status: "OPEN",
    daysAgo: 2,
  },
  {
    title: "Typo on pricing page",
    description:
      "The Pro plan description contains a spelling mistake.",
    customerEmail: "abigail.nelson@example.com",
    priority: "LOW",
    status: "RESOLVED",
    daysAgo: 30,
  },
  {
    title: "Cannot download receipt",
    description:
      "Download receipt button returns a blank page.",
    customerEmail: "jackson.hill@example.com",
    priority: "MEDIUM",
    status: "OPEN",
    daysAgo: 11,
  },
  {
    title: "Time zone shown incorrectly",
    description:
      "Scheduled reports use UTC instead of local time.",
    customerEmail: "emily.ramirez@example.com",
    priority: "LOW",
    status: "IN_PROGRESS",
    daysAgo: 13,
  },
  {
    title: "Unexpected plan downgrade",
    description:
      "Plan was downgraded without any notification.",
    customerEmail: "sebastian.campbell@example.com",
    priority: "HIGH",
    status: "RESOLVED",
    daysAgo: 16,
  },
  {
    title: "Search returns no results",
    description:
      "Searching for existing projects shows nothing.",
    customerEmail: "elizabeth.mitchell@example.com",
    priority: "MEDIUM",
    status: "OPEN",
    daysAgo: 4,
  },
  {
    title: "Request for data deletion",
    description:
      "Customer asks for their data to be deleted.",
    customerEmail: "mateo.carter@example.com",
    priority: "MEDIUM",
    status: "IN_PROGRESS",
    daysAgo: 15,
  },
  {
    title: "Cannot log in with Google",
    description:
      "Google sign-in shows an unknown error.",
    customerEmail: "sofia.roberts@example.com",
    priority: "HIGH",
    status: "OPEN",
    daysAgo: 5,
  },
  {
    title: "Invoice shows wrong tax rate",
    description:
      "VAT is calculated at the wrong rate on invoice.",
    customerEmail: "jack.phillips@example.com",
    priority: "MEDIUM",
    status: "RESOLVED",
    daysAgo: 22,
  },
  {
    title: "Feature request: dark mode",
    description:
      "Customer would like a dark theme option.",
    customerEmail: "avery.evans@example.com",
    priority: "LOW",
    status: "OPEN",
    daysAgo: 19,
  },
];

async function main() {
  const now = Date.now();

  await prisma.ticket.deleteMany();

  await prisma.ticket.createMany({
    data: tickets.map((ticket) => ({
      title: ticket.title,
      description: ticket.description,
      customerEmail: ticket.customerEmail,
      priority: ticket.priority,
      status: ticket.status,
      createdAt: new Date(
        now - ticket.daysAgo * 24 * 60 * 60 * 1000,
      ),
    })),
  });

  console.log(`Seeded ${tickets.length} tickets`);
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });