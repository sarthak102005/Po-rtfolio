import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="text-6xl mb-4" aria-hidden="true">📺</div>
      <h1 className="text-2xl font-bold text-[#0f0f0f] mb-2">Page not found</h1>
      <p className="text-sm text-[#606060] mb-6 max-w-xs">
        This page doesn&apos;t exist in Sarthak&apos;s portfolio.
      </p>
      <Link
        href="/"
        className="px-5 py-2.5 rounded-full bg-[#0f0f0f] text-white text-sm font-semibold hover:bg-[#333] transition-colors"
      >
        Go home
      </Link>
    </div>
  );
}
