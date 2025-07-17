"use client";

import { useRef, useEffect } from "react";
import { usePackageManager } from "./hooks/usePackageManager";
import { SearchForm } from "./components/SearchForm";
import { HeaderSection } from "./components/HeaderSection";
import { ContentArea } from "./components/ContentArea/ContentArea";

export default function Home() {
  const {
    packageName,
    setPackageName,
    versionNames,
    selectedDep,
    selectedVersion,
    depSearchText,
    selectedIndex,
    setSelectedIndex,
    packageNameRef,
    search,
    clickDep,
    onFilterDep,
    onReset,
    onClearDepSearchText,
    isLoading,
    error,
  } = usePackageManager();

  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    // Focus first item when versions are loaded
    if (versionNames.length > 0 && selectedVersion == "") {
      const items = listRef.current?.querySelectorAll("li");
      const selectedItem = items?.[0];
      if (selectedItem) {
        selectedItem.focus();
      }
    }
  }, [versionNames, selectedVersion]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* <div className="text-center mb-6">
          <div className="inline-block panel-retro px-6 py-3 mb-4">
            <h1 className="text-3xl font-bold text-gray-800 font-mono">
              🐛 DEPENDABOTS SMASHER 🐛
            </h1>
            <p className="text-sm text-gray-600 mt-1 font-mono">
              Analyze package dependencies across versions
            </p>
          </div>
        </div> */}


        {/* Main Content Container */}
        <div className="panel-retro p-6 mt-5 space-y-6">
          <SearchForm
            packageName={packageName}
            setPackageName={setPackageName}
            packageNameRef={packageNameRef}
            onSearch={search}
            onReset={onReset}
            isLoading={isLoading}
            error={error}
          />

          <HeaderSection
            depSearchText={depSearchText}
            onFilterDep={onFilterDep}
            onClearDepSearchText={onClearDepSearchText}
          />

          <ContentArea
            versionNames={versionNames}
            selectedVersion={selectedVersion}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            listRef={listRef}
            onVersionClick={clickDep}
            selectedDep={selectedDep}
            depSearchText={depSearchText}
          />
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500 font-mono">
          <p>Use ↑↓ arrows to navigate • Enter to select • Ctrl/Cmd+R to reset</p>
        </div>
      </div>
    </div>
  );
}
