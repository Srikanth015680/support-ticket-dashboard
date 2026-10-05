import { Link, Navigate, Route, Routes } from "react-router-dom";

import ErrorState from "./components/ErrorState";
import Header from "./components/Header";
import CreateTicketPage from "./pages/CreateTicketPage";
import TicketDetailsPage from "./pages/TicketDetailsPage";
import TicketsPage from "./pages/TicketsPage";
import { primaryButtonClass } from "./lib/ui";

export default function App() {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[16rem_1fr]">
      <Header />

      <main className="min-w-0 px-4 py-6 sm:px-8 lg:py-10">
        <div className="mx-auto max-w-6xl">
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/tickets" replace />}
            />

            <Route path="/tickets" element={<TicketsPage />} />

            <Route
              path="/tickets/new"
              element={<CreateTicketPage />}
            />

            <Route
              path="/tickets/:id"
              element={<TicketDetailsPage />}
            />

            <Route
              path="*"
              element={
                <div className="rounded-2xl border border-line bg-white shadow-card">
                  <ErrorState
                    title="Page not found"
                    message="The page you are looking for does not exist."
                  >
                    <Link to="/tickets" className={primaryButtonClass}>
                      Go to tickets
                    </Link>
                  </ErrorState>
                </div>
              }
            />
          </Routes>
        </div>
      </main>
    </div>
  );
}