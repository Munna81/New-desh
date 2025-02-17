import { ChangeEvent } from "react";

interface SearchBarProps {
  searchTerm: string;
  onSearch: (value: string) => void;
  placeholder?: string;
}

const SearchBar = ({ searchTerm, onSearch, placeholder }: SearchBarProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      {searchTerm && (
        <button
          onClick={() => onSearch("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchBar;
