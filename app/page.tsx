import Image from "next/image";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Welcome to My Blog</h1>
      <p className="text-xl text-gray-600 mb-6">
        Explore thoughts, ideas, and insights about technology, programming, and more.
      </p>
      <div className="bg-gray-100 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Latest Posts</h2>
        <p className="text-gray-600">
          Blog posts will appear here once they are added to the posts directory.
        </p>
      </div>
    </div>
  );
}
