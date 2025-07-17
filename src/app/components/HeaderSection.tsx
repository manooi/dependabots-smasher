import { HeaderSectionProps } from "../types";

export const HeaderSection = ({
  depSearchText,
  onFilterDep,
  onClearDepSearchText,
}: HeaderSectionProps) => {
  return (
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
          />
          <button className="ml-2" onClick={onClearDepSearchText}>
            clear
          </button>
        </div>
      </div>
    </div>
  );
}; 