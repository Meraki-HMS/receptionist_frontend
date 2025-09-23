export default function DashboardCard({ title, value, icon, trend, trendPositive }) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/60 p-4 lg:p-6 hover:shadow-md transition-all duration-300 group hover:scale-[1.02]">
      {/* Icon and Trend */}
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 group-hover:scale-110 transition-transform duration-300">
          <i className={`${icon} text-blue-600 text-xl lg:text-2xl`}></i>
        </div>
        {trend && (
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
            trendPositive 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            <i className={`bi bi-${trendPositive ? 'arrow-up' : 'arrow-down'}-right mr-1`}></i>
            {trend}
          </span>
        )}
      </div>
      
      {/* Content */}
      <div className="space-y-2">
        <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wide">{title}</h3>
        <p className="text-2xl lg:text-3xl font-bold text-gray-800">{value}</p>
      </div>
      
      {/* Progress Bar */}
      <div className="mt-4 w-full bg-gray-200/60 rounded-full h-1.5 shadow-inner">
        <div 
          className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
            trendPositive 
              ? 'bg-gradient-to-r from-green-400 to-green-500' 
              : 'bg-gradient-to-r from-red-400 to-red-500'
          }`}
          style={{ width: trendPositive ? '75%' : '40%' }}
        ></div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-200/50 transition-all duration-300 pointer-events-none"></div>
    </div>
  );
}