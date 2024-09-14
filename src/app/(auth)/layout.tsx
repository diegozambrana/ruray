export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col items-center mt-16">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        {children}
      </div>
    </main>
  );
}
