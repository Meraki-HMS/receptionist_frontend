export default function DashboardCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center justify-center">
      <div className="text-blue-600 text-3xl mb-2">
        <i className={icon}></i>
      </div>
      <h3 className="text-gray-600 text-sm mb-2">{title}</h3>
      <p className="text-xl font-bold text-blue-600">{value}</p>
    </div>
  );
}
