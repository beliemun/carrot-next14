import { PhotoIcon } from "@heroicons/react/24/solid";

export default function Loading() {
  return (
    <main className="min-h-screen w-full">
      <section className="space-y-4 p-4">
        <div className="skeleton aspect-square col-center">
          <PhotoIcon className="w-24 opacity-10" />
        </div>
        <div className="flex items-center gap-2">
          <div className="skeleton size-14 rounded-full" />
          <div className="flex flex-col *:rounded-lg flex-1 gap-2">
            <div className="skeleton w-60 h-4" />
            <div className="skeleton w-36 h-4" />
          </div>
        </div>
        <div className="flex flex-col *:rounded-lg gap-2">
          <div className="skeleton w-full h-4" />
          <div className="skeleton w-3/4 h-4" />
          <div className="skeleton w-2/5 h-4" />
        </div>
      </section>
      <section className="fixed bottom-0 flex flex-row justify-between items-center max-w-sm w-full bg-base-300 p-4">
        <div className="skeleton w-1/3 h-12" />
        <div className="skeleton w-1/3 h-12" />
      </section>
    </main>
  );
}
