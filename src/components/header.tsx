import SearchPhoto from "./search";
import type { Dispatch, SetStateAction, RefObject } from "react";

interface SearchPhotoProps {
  searchHandle: (e: React.FormEvent) => void;
  inputRefrence: RefObject<HTMLInputElement | null>;
  searchQuery: string;
  clearSearchHandl: () => void;
  setQuery: Dispatch<SetStateAction<string>>;
}

function Header({
  searchHandle,
  inputRefrence,
  searchQuery,
  clearSearchHandl,
  setQuery,
}: SearchPhotoProps) {
  return (
    <header className="w-3/5 top-0 z-10 bg-white p-4 mb-6">
      <h1 className="text-4xl font-semibold">Unsplash</h1>
      <p className="desc text-xl my-5">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum,
        magnam.
      </p>

      <SearchPhoto
        searchHandle={searchHandle}
        inputRefrence={inputRefrence}
        searchQuery={searchQuery}
        clearSearchHandl={clearSearchHandl}
        setQuery={setQuery}
      />
    </header>
  );
}

export default Header;
