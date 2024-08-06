import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";

type TInput = {
  onChange: (filters: { search: string }) => void;
};

export default function Input({ onChange }: TInput) {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 1_000)

  useEffect(() => {
    onChange?.({ search: debouncedSearch });
  }, [debouncedSearch]);


  return <div className="input-container">
    <input
      value={search}
      onChange={e => setSearch(e.target.value)}
      type='search' className='input search' placeholder='search' />
  </div>
}