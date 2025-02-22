"use client";

import { useEffect, useRef, useState } from "react";
import { getPackages } from "./lib/npm-util";
import Highlighter from "react-highlight-words";
import { PackageJson, Version } from "./lib/package-json";
import { filterJsonObjectByKeys } from "./lib/json-util";

export default function Home() {
  const [packageName, setPackageName] = useState<string>("");
  const [response, setResponse] = useState<PackageJson>({} as PackageJson);
  const [versionNames, setVersionNames] = useState<string[]>([]);
  const [selectedDep, setSelectedDep] = useState<any>({});
  const [selectedVersion, setSelectedVersion] = useState<string>("");
  const [depSearchText, setDepSearchText] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const packageNameRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    packageNameRef?.current?.focus();
  }, []);

  useEffect(() => {
    // trigger once on search
    if (versionNames.length > 0 && selectedVersion == "") {
      clickDep(versionNames[0]);
      const items = listRef.current?.querySelectorAll("li");
      const selectedItem = items?.[0];
      if (selectedItem) {
        selectedItem.focus();
      }
    }
  }, [versionNames]);

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
    clickDep(versionNames[newIndex]);
    setSelectedIndex(newIndex);

    // Focus and ensure visibility without excessive scrolling
    const items = listRef.current?.querySelectorAll("li");
    const selectedItem = items?.[newIndex];
    if (selectedItem) {
      selectedItem.focus();
      selectedItem.scrollIntoView({ block: "center", behavior: "instant" });
    }
  };

  const search = async (e: any) => {
    e.preventDefault();
    if (!packageName) {
      alert("😡😡😡😡😡");
      return;
    }
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
      alert("Package not found!");
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
    packageNameRef?.current?.focus();
  };

  const onClearDepSearchText = () => {
    setDepSearchText("");
    onFilterDep("");
  };

  return (
    <div className="flex flex-col pt-4 h-screen w-1/1 md:w-4/5 2xl:w-1/2 mx-auto">
      <div className="flex justify-between">
        <form>
          <div className="inline">
            <img className="inline mr-2 h-[24px]" src="/Npm-logo.svg.png"></img>
            <label className="mr-1 font-bold">package</label>
            {/* <img src="/snail.png" className=" ml-1 mr-3 inline"></img> */}
            <input
              ref={packageNameRef}
              placeholder="exact package name"
              className="border h-8 p-1 border-gray"
              type="text"
              value={packageName}
              onChange={(event) => setPackageName(event.target.value)}
            ></input>
          </div>
          {/* <div>
          <label className="ml-2 mr-1"> version </label>
          <input className="border h-8 p-1" type="text"></input>
        </div> */}
          <button
            type="submit"
            className="bg-slate-300 hover:bg-slate-400 p-1 ml-2"
            onClick={(event) => search(event)}
          >
           <img className="inline mb-1" src="/magnifier.png"></img> Search (Enter) 
          </button>
          <button
            type="button"
            className="bg-red-300 hover:bg-red-400 p-1 ml-2"
            onClick={() => onReset()}
          >
            <img className="inline mb-1 mr-1" src="/reset-button.png"></img>
            Reset (ctrl/cmd + r)
          </button>
        </form>
      </div>

      <div className="bg-slate-300 w-full mt-4">
        <div className="grid grid-cols-4 h-full">
          <div className="col-span-1 border h-10">
            <h1 className="font-bold text-center">versions</h1>
          </div>
          <div className="col-span-3 border h-10">
            <h1 className="font-bold ml-4 inline">dependencies</h1>
            <input
              value={depSearchText}
              onChange={(event) => onFilterDep(event?.target.value)}
              className="border h-7 p-1 ml-8 mt-1 border-gray"
              type="text"
              placeholder="filter"
            ></input>
            <button className="ml-2" onClick={() => onClearDepSearchText()}>
              clear
            </button>
          </div>
        </div>
      </div>

      <div className="bg-slate-300 w-full h-[calc(100%-100px)]">
        <div className="grid grid-cols-4 h-full">
          <div className="col-span-1 border text-center overflow-y-scroll">
            <ul ref={listRef} onKeyDown={(e) => handleKeyDown(e)}>
              {versionNames.map((i) => (
                <li
                  className={`cursor-pointer ${
                    selectedVersion == i ? "bg-green-400" : ""
                  } outline-none`}
                  key={i}
                  onClick={() => clickDep(i)}
                  tabIndex={0}
                >
                  {i}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-3 border overflow-y-scroll">
            <pre>
              <Highlighter
                searchWords={[depSearchText]}
                autoEscape={true}
                textToHighlight={JSON.stringify(selectedDep, null, 4)}
              />
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
