'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';

export default function SideNav() {
  const router = useRouter();

  const handleSignOut = () => {
    // Replace with actual sign out logic (e.g. NextAuth, Clerk, Firebase)
    console.log('User signed out');
    router.push('/login'); // Redirect to login or landing page
  };

  return (
    <aside
      className="flex h-full flex-col px-3 py-4 md:px-2"
      role="navigation"
      aria-label="Sidebar Navigation"
    >
      {/* Logo */}
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
        href="/"
        aria-label="Go to home page"
      >
        <div className="w-32 text-white md:w-40">
          <AcmeLogo />
        </div>
      </Link>

      {/* Nav Links & Sign Out */}
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />

        {/* Spacer */}
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>

        {/* Sign Out */}
        <button
          onClick={handleSignOut}
          className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
          aria-label="Sign out"
        >
          <PowerIcon className="w-6" />
          <span className="hidden md:block">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
