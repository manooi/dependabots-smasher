import { SearchFormProps } from "../types";

export const SearchForm = ({
  packageName,
  setPackageName,
  packageNameRef,
  onSearch,
  onReset,
  isLoading,
}: SearchFormProps) => {
  return (
    <div className="flex justify-between">
      <form>
        <div className="inline">
          <img className="inline mr-2 h-[24px]" src="/Npm-logo.svg.png" alt="NPM Logo" />
          <label className="mr-1 font-bold">package</label>
          <input
            ref={packageNameRef}
            placeholder="exact package name"
            className="border h-8 p-1 border-gray"
            type="text"
            value={packageName}
            onChange={(event) => setPackageName(event.target.value)}
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          className={`p-1 ml-2 ${isLoading
              ? 'bg-slate-300 cursor-not-allowed'
              : 'bg-slate-300 hover:bg-slate-400'
            }`}
          onClick={onSearch}
          disabled={isLoading}
        >
          <img className="inline h-4 w-4 mr-1" src="/magnifier.png" alt="Search" />
          {isLoading ? <span>Searching...</span> : <span>Search (Enter)</span>}
        </button>
        <button
          type="button"
          className="bg-red-300 hover:bg-red-400 p-1 ml-2"
          onClick={onReset}
          disabled={isLoading}
        >
          <img className="inline mb-1 mr-1" src="/reset-button.png" alt="Reset" />
          Reset (ctrl/cmd + r)
        </button>
      </form>
    </div>
  );
}; 