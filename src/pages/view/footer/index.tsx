import { Link } from "react-router";
import Info from "./info";
import Comment from "./comment";
import {
  PiArrowFatDownThin,
  PiArrowFatUpThin,
  PiShareFatThin,
} from "react-icons/pi";

const Index = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="w-[250px] space-y-2">
        <h1>Lemaire Boxy Blouson Coat 'Graphite Blue'</h1>
        <div className="flex items-center justify-between bg-gray-300/5">
          <div className="flex items-center border-t border-l">
            <button className="p-2 border-r border-b flex items-center gap-1">
              <PiArrowFatDownThin size={20} />
              <span className="opacity-50 text-[10px]">1.2k</span>
            </button>
            <button className="p-2 border-r border-b flex items-center gap-1">
              <PiArrowFatUpThin size={20} />
              <span className="opacity-50 text-[10px]">1.4k</span>
            </button>
            <Comment />
          </div>
          <button className="p-2 border">
            <PiShareFatThin size={20} />
          </button>
        </div>
        <div className="flex items-center gap-2 text-[10px] underline">
          <Link to="#">Sneakers</Link>
          <Link to="#">Apparrel</Link>
          <Link to="#">Jordan</Link>
        </div>
      </div>
      <Info />
    </div>
  );
};

export default Index;
