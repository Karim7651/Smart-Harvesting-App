import Link from "next/link";
export default function Page() {
  return (
    <main className="h-svh flex items-center justify-center mx-auto flex-col text-center">
      <h2 className="text-5xl font-bold text-base-content select-none ">
        404 - Requested Page Not Found
      </h2>
      <Link
        href="/"
        className="text-xl font-light text-base-content select-none mt-2 hover:text-stone-500 transition-colors duration-200"
      >
        Click here to go Home
      </Link>
    </main>
  );
}
