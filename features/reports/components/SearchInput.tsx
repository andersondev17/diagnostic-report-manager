'use client';

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchInput = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('name') || '');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {// Debounce to avoid repeated calls while typing
      const params = new URLSearchParams(searchParams.toString());

      searchQuery ? params.set("name", searchQuery) : params.delete("name");

      const newUrl = params.toString() ? `?${params.toString()}` : pathname;
      router.push(newUrl, { scroll: false });
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  return (
    <div className="relative border border-black rounded-lg items-center flex gap-2 px-2 py-1 h-fit">
      <Image src="/icons/search.svg" alt="search" width={15} height={15} />
      <label htmlFor="search-input" className="sr-only">
        Search reports by name
      </label>
      <input
        id="search-input"
        type="search"
        placeholder="Search Reports..."
        className="outline-none"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        aria-label="Search reports by name"
        aria-describedby="search-description"
        role="searchbox"
      />
      <span id="search-description" className="sr-only">
        Filter reports by typing in the search box
      </span>
    </div>
  );
};

export default SearchInput;