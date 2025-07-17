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
    <div className="col-span-1 border text-center overflow-y-scroll">
      <ul ref={listRef} onKeyDown={handleKeyDown}>
        {versionNames.map((version) => (
          <li
            className={`cursor-pointer ${
              selectedVersion == version ? "bg-green-400" : ""
            } outline-none`}
            key={version}
            onClick={() => onVersionClick(version)}
            tabIndex={0}
          >
            {version}
          </li>
        ))}
      </ul>
    </div>
  );
}; 