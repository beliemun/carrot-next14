import { CloseModalButton } from "@/components/common";
import { PhotoIcon } from "@heroicons/react/24/solid";

export default function ModalLoading() {
  return (
    <div className="fixed top-0 left-0 right-0 mx-auto max-w-sm w-full min-h-screen col-center bg-neutral-800/90 p-8">
      <div className="relative w-full bg-black rounded-2xl">
        <section className="space-y-4 px-4 pt-4">
          <div className="skeleton aspect-square col-center">
            <PhotoIcon className="w-24 opacity-10" />
          </div>
          <div className="flex items-center gap-2">
            <div className="skeleton size-14 rounded-full" />
            <div className="flex flex-col *:rounded-lg flex-1 gap-2">
              <div className="skeleton w-48 h-4" />
              <div className="skeleton w-28 h-4" />
            </div>
          </div>
          <div className="flex flex-col *:rounded-lg gap-2">
            <div className="skeleton w-32 h-4" />
            <div className="skeleton w-24 h-4" />
          </div>
          <div className="absolute -top-7 -right-3">
            <CloseModalButton />
          </div>
        </section>
        <div className="divider divide-slate-400" />
        <section className="flex flex-row justify-between items-center max-w-sm w-full px-4 pb-4">
          <div className="skeleton flex-1 h-10" />
        </section>
      </div>
    </div>
  );
}
