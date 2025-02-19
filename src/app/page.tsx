"use client"

import { useState } from "react";
import { getPackages } from "./lib/npm-util";
import Highlighter from "react-highlight-words";

export default function Home() {
  const [packageName, setPackageName] = useState<string>('');
  const [versions, setVersions] = useState<any>({}); // kvp
  const [versionNames, setVersionName] = useState<string[]>([]);
  const [dep, setDep] = useState<any>({});
  const [clickedVersion, setClickedVersion] = useState<string>('');
  const [depSearchText, setDepSearchText] = useState<string>('');

  const search = async (e: any) => {
    e.preventDefault();
    const result = await getPackages(packageName);
    setVersions(result.versions);
    setVersionName(Object.keys(result.versions));
    setClickedVersion('');
    setDep({});
    setDepSearchText('');
  };

  const clickDep = (version: string) => {
    setClickedVersion(version);
    const keepProps = ["name", "version", "dependencies", "devDependencies", "peerDependencies"];
    const json = versions[version];
    const filteredJson = Object.keys(json).reduce((acc: any, key) => {
      if (keepProps.includes(key)) {
        acc[key] = json[key];
      }
      return acc;
    }, {});

    setDep(filteredJson);
  }

  const onFilterDep = (name: string) => {
    const searchProps = ["dependencies", "devDependencies", "peerDependencies"];
    let filteredVersions: string[] = [];
    for (let vName in versions) {
      const json = versions[vName];
      const filteredJson = Object.keys(versions[vName]).reduce((acc: any, key) => {
        if (searchProps.includes(key)) {
          acc[key] = json[key];
        }
        return acc;
      }, {});
      const dt = JSON.stringify(filteredJson);
      if (dt.includes(name)) {
        filteredVersions.push(vName);
      }
    }
    setDepSearchText(name);
    setVersionName(filteredVersions);
  };

  return (
    <div className="flex flex-col items-center pt-4 h-screen">

      <div className="flex">
        <form>
          <div className="inline">
            <label className="ml-2 mr-1">package</label>
            <input className="border h-8 p-1" type="text" value={packageName} onChange={(event) => setPackageName(event.target.value)}></input>
          </div>
          {/* <div>
          <label className="ml-2 mr-1"> version </label>
          <input className="border h-8 p-1" type="text"></input>
        </div> */}
          <button type="submit" className="bg-slate-300 hover:bg-slate-400 p-1 ml-2" onClick={(event) => search(event)}>Search</button>
          <button type="button" className="bg-red-300 hover:bg-red-400 p-1 ml-2" onClick={() => { setPackageName(""); setDepSearchText(''); }}>Reset</button>
        </form>
      </div>

      <div className="bg-slate-300 w-full mt-4">
        <div className="grid grid-cols-4 h-full">
          <div className="col-span-1 border h-10">
            <h1 className="font-bold text-center">versions</h1>
          </div>
          <div className="col-span-3 border h-10">
            <h1 className="font-bold ml-4 inline">dependencies</h1>
            <input onChange={(event) => onFilterDep(event?.target.value)} className="border h-7 p-1 ml-8 mt-1" type="text" placeholder="filter"></input>
          </div>
        </div>
      </div>

      <div className="bg-slate-300 w-full h-[calc(100%-100px)]">
        <div className="grid grid-cols-4 h-full">
          <div className="col-span-1 border text-center overflow-y-scroll">
            <ul>
              {versionNames.map((i) =>
                <li
                  className={`cursor-pointer ${clickedVersion == i ? 'bg-green-400' : ''}`} key={i} onClick={() => clickDep(i)}>
                  {i}
                </li>
              )}
            </ul>
          </div>
          <div className="col-span-3 border overflow-y-scroll">
            <pre>
              {/* {JSON.stringify(dep, null, 4)} */}
              <Highlighter
                searchWords={[depSearchText]}
                autoEscape={true}
                textToHighlight={JSON.stringify(dep, null, 4)}
              />
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
