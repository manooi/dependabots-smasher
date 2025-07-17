import { DependencyDisplayProps } from "@/app/types";
import Highlighter from "react-highlight-words";

export const DependencyDisplay = ({
  selectedDep,
  depSearchText,
}: DependencyDisplayProps) => {
  return (
    <div className="col-span-3 bg-gray-50 overflow-y-scroll  h-full lg:h-[calc(100vh-330px)]">
      <div className="h-full flex flex-col">
        <div className="bg-gray-200 px-3 py-2 border-b-2 border-gray-600">
          <h3 className="font-bold text-gray-800 font-mono text-xs">
            {selectedDep ? "📋 DEPENDENCY DATA" : "📋 NO DATA"}
          </h3>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {selectedDep ? (
            <div className="bg-white border-2 border-gray-300 rounded p-4 font-mono text-sm">
              <pre className="whitespace-pre-wrap break-words">
                <Highlighter
                  searchWords={depSearchText ? [depSearchText] : []}
                  autoEscape={true}
                  textToHighlight={JSON.stringify(selectedDep, null, 2)}
                  highlightStyle={{
                    backgroundColor: '#ffeb3b',
                    color: '#000',
                    fontWeight: 'bold'
                  }}
                />
              </pre>
            </div>
          ) : (
            <div className="text-center text-gray-500 font-mono text-sm">
              <div className="mb-4">📄</div>
              <div>No dependency data to display</div>
              <div className="text-xs mt-2">
                Select a version from the left panel to view its dependencies
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 