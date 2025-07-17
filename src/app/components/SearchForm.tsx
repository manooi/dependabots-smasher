import { SearchFormProps } from "../types";

export const SearchForm = ({
  packageName,
  setPackageName,
  packageNameRef,
  onSearch,
  onReset,
  isLoading,
}: SearchFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(e);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <img 
            className="h-6" 
            src="/Npm-logo.svg.png" 
            alt="NPM Logo" 
          />
          <label className="font-bold text-gray-700 font-mono text-sm">
            package:
          </label>
        </div>
        
        <input
          ref={packageNameRef}
          placeholder="exact package name"
          className="input-retro min-w-[200px]"
          type="text"
          value={packageName}
          onChange={(event) => setPackageName(event.target.value)}
          disabled={isLoading}
        />
        
        <div className="flex gap-2">
          <button
            type="submit"
            className={`btn-retro flex items-center gap-1 ${
              isLoading
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-blue-200 hover:border-blue-600'
            }`}
            onClick={onSearch}
            disabled={isLoading}
          >
            <img 
              className="h-4 w-4" 
              src="/magnifier.png" 
              alt="Search" 
            />
            <span className="font-mono">
              {isLoading ? (
                <span className="loading-cursor">Searching...</span>
              ) : (
                'Search (Enter)'
              )}
            </span>
          </button>
          
          <button
            type="button"
            className="btn-retro flex items-center gap-1 bg-red-200 hover:bg-red-300 hover:border-red-600"
            onClick={onReset}
            disabled={isLoading}
          >
            <img 
              className="h-4 w-4" 
              src="/reset-button.png" 
              alt="Reset" 
            />
            <span className="font-mono">Reset (Ctrl+R)</span>
          </button>
        </div>
      </form>
      
      {/* Status indicator with consistent height */}
      <div className="content-stable">
        {isLoading && (
          <div className="flex items-center gap-2 text-sm text-gray-600 font-mono loading-transition">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span>Fetching package data...</span>
          </div>
        )}
      </div>
    </div>
  );
}; 