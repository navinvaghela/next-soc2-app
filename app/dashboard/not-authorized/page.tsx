import Link from "next/link"

export default function NotAuthorized() {
  return (
    <div className="p-12">
      <h1 className="text-2xl font-bold">Not authorized</h1>
      <p className="mt-4">You do not have permission to view that page.</p>
      <Link href="/" className="mt-4 inline-block text-blue-600">Home</Link>
    </div>
  );
}
