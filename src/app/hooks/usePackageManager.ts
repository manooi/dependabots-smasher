import { useState, useRef, useEffect } from "react";
import { getPackages } from "../lib/npm-util";
import { PackageJson, Version } from "../lib/package-json";
import { filterJsonObjectByKeys } from "../lib/json-util";

export const usePackageManager = () => {
  const [packageName, setPackageName] = useState<string>("");
  const [response, setResponse] = useState<PackageJson>({} as PackageJson);
  const [versionNames, setVersionNames] = useState<string[]>([]);
  const [selectedDep, setSelectedDep] = useState<any>({});
  const [selectedVersion, setSelectedVersion] = useState<string>("");
  const [depSearchText, setDepSearchText] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const packageNameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    packageNameRef?.current?.focus();
  }, []);

  useEffect(() => {
    // trigger once on search
    if (versionNames.length > 0 && selectedVersion == "") {
      clickDep(versionNames[0]);
    }
  }, [versionNames]);

  const search = async (e: any) => {
    e.preventDefault();
    if (!packageName) {
      setError("Please enter a package name");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      const result = await getPackages(packageName);
      const versions = Object.keys(result?.versions);
      setResponse(result);
      setVersionNames(versions);
      setSelectedVersion("");
      setSelectedDep({});
      setDepSearchText("");
    } catch (error) {
      console.log(error);
      setError(`Package "${packageName}" not found`);
    } finally {
      setIsLoading(false);
    }
  };

  const clickDep = (version: string) => {
    setSelectedVersion(version);
    const keepProps: Array<keyof Version> = [
      "name",
      "version",
      "dependencies",
      "devDependencies",
      "peerDependencies",
    ];

    const json: Version = response?.versions[version];
    let filteredJson = filterJsonObjectByKeys<Version>(json, keepProps);
    filteredJson = {
      name: filteredJson["name"],
      version: filteredJson["version"],
      description: response["description"],
      time: response["time"][version],
      ...filteredJson,
    };
    setSelectedDep(filteredJson);
    setSelectedIndex(versionNames.findIndex((i) => i == version));
  };

  const onFilterDep = (name: string) => {
    const keepProps = ["dependencies", "devDependencies", "peerDependencies"];
    const filteredVersions: string[] = [];
    for (let vName in response.versions) {
      const json = response.versions[vName];
      const filteredJson = filterJsonObjectByKeys(json, keepProps);
      const dt = JSON.stringify(filteredJson);
      if (dt.includes(name)) {
        filteredVersions.push(vName);
      }
    }
    setDepSearchText(name);
    setVersionNames(filteredVersions);
  };

  const onReset = () => {
    setPackageName("");
    setDepSearchText("");
    setSelectedDep({});
    setVersionNames([]);
    setError("");
    packageNameRef?.current?.focus();
  };

  const onClearDepSearchText = () => {
    setDepSearchText("");
    onFilterDep("");
  };

  return {
    packageName,
    setPackageName,
    response,
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
  };
}; 