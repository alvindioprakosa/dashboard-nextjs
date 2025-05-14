import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

const iconMap = {
  collected: BanknotesIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
  customers: UserGroupIcon,
} as const;

type CardType = keyof typeof iconMap;

interface CardData {
  title: string;
  value: number | string;
  type: CardType;
}

interface CardWrapperProps {
  totalPaidInvoices: number;
  totalPendingInvoices: number;
  numberOfInvoices: number;
  numberOfCustomers: number;
}

export default function CardWrapper({
  totalPaidInvoices,
  totalPendingInvoices,
  numberOfInvoices,
  numberOfCustomers,
}: CardWrapperProps) {
  const cards: CardData[] = [
    { title: 'Collected', value: totalPaidInvoices ?? 0, type: 'collected' },
    { title: 'Pending', value: totalPendingInvoices ?? 0, type: 'pending' },
    { title: 'Total Invoices', value: numberOfInvoices ?? 0, type: 'invoices' },
    { title: 'Total Customers', value: numberOfCustomers ?? 0, type: 'customers' },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.type} {...card} />
      ))}
    </div>
  );
}

function Card({ title, value, type }: CardData) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-4 shadow-sm">
      <div className="flex items-center space-x-2">
        <Icon className="h-5 w-5 text-gray-700" aria-hidden="true" />
        <h3 className="text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className} mt-2 truncate rounded-xl bg-white px-4 py-6 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
