"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";

type SearchInputProps = {
  search?: string;
};

export function SearchInput({ search }: SearchInputProps) {
  const router = useRouter();

  return (
    <div className="relative mt-1 rounded-md shadow-sm">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <MagnifyingGlassIcon
          className="h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      </div>
      <input
        type="text"
        name="search"
        id="search"
        className="block w-full rounded-md border-gray-300 pl-10 focus:ring-0 focus:border-gray-400 focus:outline-none text-sm"
        placeholder="Search"
        defaultValue={search}
        onChange={(event) => {
          router.push(`/?search=${event.target.value}`);
        }}
      />
    </div>
  );
}
