import { ContentAreaProps } from "@/app/types";
import { DependencyDisplay } from "./DependencyDisplay";
import { VersionList } from "./VersionList";

export const ContentArea = ({
  versionNames,
  selectedVersion,
  selectedIndex,
  setSelectedIndex,
  listRef,
  onVersionClick,
  selectedDep,
  depSearchText,
}: ContentAreaProps) => {
  return (
    <div className="panel-retro h-[600px] min-h-[600px]">
      <div className="grid grid-cols-4 h-full">
        <VersionList
          versionNames={versionNames}
          selectedVersion={selectedVersion}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          listRef={listRef}
          onVersionClick={onVersionClick}
        />
        <DependencyDisplay
          selectedDep={selectedDep}
          depSearchText={depSearchText}
        />
      </div>
    </div>
  );
}; 