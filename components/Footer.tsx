export default function Footer() {
  return (
    <footer className="p-4 bg-white border-t mt-8">
      <div className="max-w-4xl mx-auto text-center text-gray-600">
        <p>© {new Date().getFullYear()} My Blog. All rights reserved.</p>
      </div>
    </footer>
  );
} 