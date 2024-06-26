export default function Loading() {
  return (
    <main className="min-h-screen w-full p-4">
      <h1 className="text-3xl mb-4">라이프</h1>
      <section className="space-y-4">
        {[...Array(7)].map((_, index) => (
          <div key={index} className="flex *:rounded-lg">
            <div className="flex flex-col flex-1 gap-2">
              <div className="skeleton w-60 h-5" />
              <div className="skeleton w-36 h-5" />
              <div className="flex flex-row gap-2">
                <div className="skeleton w-8 h-5" />
                <div className="skeleton w-8 h-5" />
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
