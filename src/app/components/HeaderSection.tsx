import { HeaderSectionProps } from "../types";

export const HeaderSection = ({
  depSearchText,
  onFilterDep,
  onClearDepSearchText,
}: HeaderSectionProps) => {
  return (
    <div className="panel-retro">
      <div className="grid grid-cols-4 h-12">
        <div className="col-span-1 border-r-2 border-gray-600 bg-gray-200 flex items-center justify-center">
          <h2 className="font-bold text-gray-800 font-mono text-sm">
            📦 VERSIONS
          </h2>
        </div>
        <div className="col-span-3 bg-gray-200 flex items-center gap-4 px-4">
          <h2 className="font-bold text-gray-800 font-mono text-sm">
            🔗 DEPENDENCIES
          </h2>
          <div className="flex items-center gap-2 flex-1">
            <input
              value={depSearchText}
              onChange={(event) => onFilterDep(event?.target.value)}
              className="input-retro flex-1 max-w-xs"
              type="text"
              placeholder="filter dependencies..."
              suppressHydrationWarning
            />
            {depSearchText && (
              <button 
                className="btn-retro text-xs px-2 py-1 bg-yellow-200 hover:bg-yellow-300"
                onClick={onClearDepSearchText}
                suppressHydrationWarning
              >
                ✕ Clear
              </button>
            )}
          </div>
          {depSearchText && (
            <span className="text-xs text-gray-600 font-mono">
              {depSearchText.length} chars
            </span>
          )}
        </div>
      </div>
    </div>
  );
}; 