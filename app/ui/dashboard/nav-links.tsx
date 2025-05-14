import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';

type LinkItem = {
  name: string;
  href: string;
  icon: React.ElementType;
};

const links: LinkItem[] = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  { name: 'Invoices', href: '/dashboard/invoices', icon: DocumentDuplicateIcon },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
];

export default function NavLinks() {
  return (
    <>
      {links.map(({ name, href, icon: Icon }) => (
        <a
          key={name}
          href={href}
          className="flex h-12 grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:px-3"
        >
          <Icon className="w-6" />
          <span className="hidden md:block">{name}</span>
        </a>
      ))}
    </>
  );
}
