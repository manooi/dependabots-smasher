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
    <div className="flex flex-col pt-4 h-screen w-1/1 md:w-4/5 2xl:w-1/2 mx-auto">
      <SearchForm
        packageName={packageName}
        setPackageName={setPackageName}
        packageNameRef={packageNameRef}
        onSearch={search}
        onReset={onReset}
        isLoading={isLoading}
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
  );
}
