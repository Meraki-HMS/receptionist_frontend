"use client";
import DashboardCard from "../common/DashboardCard";
import { doctorStats } from "../../../mockData/doctorData";

export default function StatCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      <DashboardCard
        title="Today's Appointments"
        value={doctorStats.appointments.value}
        subtitle="patients"
        icon="bi bi-calendar-check"
        trend={doctorStats.appointments.trend}
        trendPositive={doctorStats.appointments.positive}
        color="green"
        onClick={() => console.log("Navigate to appointments")}
      />
      <DashboardCard
        title="Pending Consultations"
        value={doctorStats.consultations.value}
        subtitle="waiting"
        icon="bi bi-people-fill"
        trend={doctorStats.consultations.trend}
        trendPositive={doctorStats.consultations.positive}
        color="blue"
        onClick={() => console.log("Navigate to patient queue")}
      />
      <DashboardCard
        title="Prescriptions Today"
        value={doctorStats.prescriptions.value}
        subtitle="issued"
        icon="bi bi-file-medical"
        trend={doctorStats.prescriptions.trend}
        trendPositive={doctorStats.prescriptions.positive}
        color="purple"
        onClick={() => console.log("Navigate to prescriptions")}
      />
      <DashboardCard
        title="Lab Reports Pending"
        value={doctorStats.labReports.value}
        subtitle="reviews"
        icon="bi bi-clipboard-data"
        trend={doctorStats.labReports.trend}
        trendPositive={doctorStats.labReports.positive}
        color="orange"
        onClick={() => console.log("Navigate to lab reports")}
      />
    </div>
  );
}