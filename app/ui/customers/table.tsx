import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import { FormattedCustomersTable } from '@/app/lib/definitions';

function MobileCustomerCard({ customer }: { customer: FormattedCustomersTable }) {
  return (
    <div key={customer.id} className="mb-2 w-full rounded-md bg-white p-4">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3 mb-2">
          <Image
            src={customer.image_url}
            alt={`${customer.name}'s profile picture`}
            className="rounded-full"
            width={28}
            height={28}
            loading="lazy"
          />
          <p>{customer.name}</p>
        </div>
        <p className="text-sm text-gray-500">{customer.email}</p>
      </div>
      <div className="flex w-full justify-between border-b py-5 text-sm">
        <div>
          <p className="text-xs text-gray-500">Pending</p>
          <p className="font-medium">{customer.total_pending}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Paid</p>
          <p className="font-medium">{customer.total_paid}</p>
        </div>
      </div>
      <div className="pt-4 text-sm text-gray-700">
        {customer.total_invoices} invoices
      </div>
    </div>
  );
}

function CustomerTableRow({ customer }: { customer: FormattedCustomersTable }) {
  return (
    <tr key={customer.id} className="group">
      <td
        className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black sm:pl-6"
        scope="row"
      >
        <div className="flex items-center gap-3">
          <Image
            src={customer.image_url}
            alt={`${customer.name}'s profile picture`}
            className="rounded-full"
            width={28}
            height={28}
            loading="lazy"
          />
          <p>{customer.name}</p>
        </div>
      </td>
      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
        {customer.email}
      </td>
      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
        {customer.total_invoices}
      </td>
      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
        {customer.total_pending}
      </td>
      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
        {customer.total_paid}
      </td>
    </tr>
  );
}

export default function CustomersTable({
  customers,
}: {
  customers: FormattedCustomersTable[];
}) {
  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
        Customers
      </h1>
      <Search placeholder="Search customers..." />

      {customers.length === 0 ? (
        <p className="mt-6 text-sm text-gray-500">No customers found.</p>
      ) : (
        <div className="mt-6 flow-root">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
                {/* Mobile */}
                <div className="md:hidden">
                  {customers.map((customer) => (
                    <MobileCustomerCard key={customer.id} customer={customer} />
                  ))}
                </div>

                {/* Desktop */}
                <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                  <thead className="bg-gray-50 text-left text-sm font-medium">
                    <tr>
                      <th className="px-4 py-5 sm:pl-6">Name</th>
                      <th className="px-3 py-5">Email</th>
                      <th className="px-3 py-5">Total Invoices</th>
                      <th className="px-3 py-5">Total Pending</th>
                      <th className="px-4 py-5">Total Paid</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-gray-900">
                    {customers.map((customer) => (
                      <CustomerTableRow key={customer.id} customer={customer} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
