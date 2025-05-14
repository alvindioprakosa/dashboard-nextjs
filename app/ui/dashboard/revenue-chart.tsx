import { generateYAxis } from '@/app/lib/utils';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { Revenue } from '@/app/lib/definitions';

export default async function RevenueChart({ revenue }: { revenue: Revenue[] }) {
  const chartHeight = 350;

  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  const { yAxisLabels, topLabel } = generateYAxis(revenue);

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Recent Revenue
      </h2>

      <div className="rounded-xl bg-gray-50 p-4">
        <div className="grid grid-cols-12 gap-2 rounded-md bg-white p-4 md:gap-4 items-end">
          {/* Y-Axis Labels */}
          <div
            className="col-span-1 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label}>{label.toLocaleString()}</p>
            ))}
          </div>

          {/* Bar Chart */}
          <div className="col-span-12 sm:col-span-11 flex items-end gap-2">
            {revenue.map(({ month, revenue: value }) => (
              <div key={month} className="flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-md bg-blue-300 transition-all duration-300"
                  style={{
                    height: `${(chartHeight / topLabel) * value}px`,
                  }}
                  title={`$${value.toLocaleString()}`}
                ></div>
                <p className="-rotate-90 text-xs text-gray-400 sm:rotate-0">
                  {month}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center pt-6">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <span className="ml-2 text-sm text-gray-500">Last 12 months</span>
        </div>
      </div>
    </div>
  );
}
