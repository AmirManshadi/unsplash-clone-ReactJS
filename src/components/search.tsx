import type { Dispatch, SetStateAction, RefObject } from "react";

interface SearchPhotoProps {
  searchHandle: (e: React.FormEvent) => void;
  inputRefrence: RefObject<HTMLInputElement | null>;
  searchQuery: string;
  clearSearchHandl: () => void;
  setQuery: Dispatch<SetStateAction<string>>;
}

function SearchPhoto({
  searchHandle,
  inputRefrence,
  searchQuery,
  clearSearchHandl,
  setQuery,
}: SearchPhotoProps) {
  return (
    <form onSubmit={searchHandle} className="flex gap-2">
      <input
        ref={inputRefrence}
        type="text"
        value={searchQuery}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="جستجوی عکس..."
        className="flex-grow p-3 rounded-lg border border-slate-200 bg-gray-50 text-black placeholder-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-200"
      />
      <button
        type="submit"
        className=" p-3 rounded-lg border border-slate-200 bg-gray-200 text-black transition-colors hover:cursor-pointer hover:shadow-md "
      >
        جستجو
      </button>
      {searchQuery && (
        <button
          type="button"
          onClick={clearSearchHandl}
          className="bg-gray-300 text-black p-3 rounded-lg hover:bg-gray-200 transition-colors"
        >
          پاک کردن
        </button>
      )}
    </form>
  );
}

export default SearchPhoto;
