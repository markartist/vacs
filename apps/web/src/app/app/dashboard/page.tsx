import { DashboardCards } from "../../../components/dashboard-cards";

export default async function DashboardPage() {
  return (
    <>
      <section className="module-shell">
        <h1 className="module-title">Dashboard</h1>
        <p className="module-description">
          Authenticated VACS shell is ready. Content-generation modules will be added in later phases.
        </p>
      </section>
      <DashboardCards />
    </>
  );
}
