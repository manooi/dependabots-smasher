import { DependencyDisplayProps } from "@/app/types";
import Highlighter from "react-highlight-words";


export const DependencyDisplay = ({
  selectedDep,
  depSearchText,
}: DependencyDisplayProps) => {
  return (
    <div className="col-span-3 border overflow-y-scroll">
      <pre>
        <Highlighter
          searchWords={[depSearchText]}
          autoEscape={true}
          textToHighlight={JSON.stringify(selectedDep, null, 4)}
        />
      </pre>
    </div>
  );
}; 