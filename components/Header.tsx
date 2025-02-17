import Link from 'next/link';

export default function Header() {
  return (
    <header className="p-4 bg-white shadow-md">
      <nav className="max-w-4xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          My Blog
        </Link>
        <ul className="flex space-x-6">
          <li>
            <Link href="/" className="hover:text-gray-600">
              Home
            </Link>
          </li>
          <li>
            <Link href="/blog" className="hover:text-gray-600">
              Blog
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-gray-600">
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
