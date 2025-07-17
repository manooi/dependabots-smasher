import { VersionListProps } from "@/app/types";

export const VersionList = ({
  versionNames,
  selectedVersion,
  selectedIndex,
  setSelectedIndex,
  listRef,
  onVersionClick,
}: VersionListProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    let newIndex = selectedIndex;
    if (e.key == "ArrowDown") {
      e.preventDefault();
      newIndex = (selectedIndex + 1) % versionNames.length;
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      newIndex =
        (selectedIndex - 1 + versionNames.length) % versionNames.length;
    }
    onVersionClick(versionNames[newIndex]);
    setSelectedIndex(newIndex);

    // Focus and ensure visibility without excessive scrolling
    const items = listRef.current?.querySelectorAll("li");
    const selectedItem = items?.[newIndex];
    if (selectedItem) {
      selectedItem.focus();
      selectedItem.scrollIntoView({ block: "center", behavior: "instant" });
    }
  };

  return (
    <div className="col-span-1 border-r-2 border-gray-600 bg-gray-50 overflow-y-scroll h-full lg:h-[calc(100vh-330px)]">
      <div className="h-full flex flex-col">
        <div className="bg-gray-200 px-3 py-2 border-b-2 border-gray-600">
          <h3 className="font-bold text-gray-800 font-mono text-xs">
            {versionNames.length} versions available
          </h3>
        </div>
        <div className="flex-1 overflow-y-auto">
          {versionNames.length === 0 ? (
            <div className="p-4 text-center text-gray-500 font-mono text-sm">
              <div className="mb-2">📦</div>
              <div>No versions found</div>
              <div className="text-xs mt-1">Search for a package first</div>
            </div>
          ) : (
            <ul ref={listRef} onKeyDown={handleKeyDown} className="divide-y divide-gray-300">
              {versionNames.map((version, index) => (
                <li
                  className={`list-item-retro focus:outline-none ${
                    selectedVersion === version ? "selected" : ""
                  }`}
                  key={version}
                  onClick={() => onVersionClick(version)}
                  tabIndex={0}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm">{version}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}; 