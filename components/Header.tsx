import Link from 'next/link';

export default function Header() {
  return (
    <header className="p-4 bg-white shadow-md">
      <nav className="max-w-4xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          0xgov
        </Link>
        <ul className="flex space-x-6">
          <li>
            <Link href="/" className="hover:text-gray-600">
              Home
            </Link>
          </li>
          <li>
            <Link href="/writing" className="hover:text-gray-600">
              Writing
            </Link>
          </li>
          <li>
            <Link href="/important-links" className="hover:text-gray-600">
              Important Links
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
