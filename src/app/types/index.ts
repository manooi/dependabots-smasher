import { RefObject } from "react";

export interface SearchFormProps {
  packageName: string;
  setPackageName: (name: string) => void;
  packageNameRef: RefObject<HTMLInputElement | null>;
  onSearch: (e: any) => void;
  onReset: () => void;
  isLoading: boolean;
}

export interface HeaderSectionProps {
  depSearchText: string;
  onFilterDep: (text: string) => void;
  onClearDepSearchText: () => void;
}

export interface VersionListProps {
  versionNames: string[];
  selectedVersion: string;
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  listRef: RefObject<HTMLUListElement | null>;
  onVersionClick: (version: string) => void;
}

export interface DependencyDisplayProps {
  selectedDep: any;
  depSearchText: string;
}

export interface ContentAreaProps {
  versionNames: string[];
  selectedVersion: string;
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  listRef: RefObject<HTMLUListElement | null>;
  onVersionClick: (version: string) => void;
  selectedDep: any;
  depSearchText: string;
}

// Re-export types from lib for convenience
export type { PackageJson, Version } from "../lib/package-json"; 