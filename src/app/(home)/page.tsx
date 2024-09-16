import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="mt-8 text-center bg-gray-200 p-16">
        <h1 className="text-4xl font-bold mb-4">Ruray</h1>
        <p className="text-2xl">Welcome</p>
        <p className="mt-8">
          To use the tool you should{" "}
          <Link className="text-primary font-medium underline" href="/sign-in">
            Sign in
          </Link>{" "}
          into the platform
        </p>
      </div>
    </main>
  );
}
