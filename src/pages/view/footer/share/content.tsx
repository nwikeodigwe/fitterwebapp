import {
  PiFacebookLogoThin,
  PiInstagramLogoThin,
  PiLinkThin,
  PiSnapchatLogoThin,
  PiTelegramLogoThin,
  PiWhatsappLogoThin,
} from "react-icons/pi";

const Content = () => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center space-x-1 overflow-x-scroll no-scrollbar py-2 px-2 border-b">
        <span className="size-15 flex-shrink-0 rounded-full bg-black/10"></span>
        <span className="size-15 flex-shrink-0 rounded-full bg-black/10"></span>
        <span className="size-15 flex-shrink-0 rounded-full bg-black/10"></span>
        <span className="size-15 flex-shrink-0 rounded-full bg-black/10"></span>
        <span className="size-15 flex-shrink-0 rounded-full bg-black/10"></span>
        <span className="size-15 flex-shrink-0 rounded-full bg-black/10"></span>
        <span className="size-15 flex-shrink-0 rounded-full bg-black/10"></span>
      </div>
      <div className="py-2 flex border-b pb-1 pt-5 px-2">
        <div className="flex flex-col items-center group">
          <button className="p-2 rounded-full bg-black text-white">
            <PiLinkThin size={30} />
          </button>
          <p className="invisible group-hover:visible duration-150 transition">
            Copy link
          </p>
        </div>
      </div>
      <div className="items-center overflow-x-scroll no-scrollbar space-x-1 py-2 flex border-b pb-1 pt-5 px-2">
        <div className="flex flex-shrink-0 flex-col items-center group">
          <button className="p-2 rounded-full bg-[#25D366] text-white group">
            <PiWhatsappLogoThin size={30} />
          </button>
          <p className="invisible group-hover:visible duration-150 transition">
            Whatsapp
          </p>
        </div>
        <div className="flex flex-shrink-0 flex-col items-center group">
          <button className="p-2 rounded-full bg-[#1877F2] text-white">
            <PiFacebookLogoThin size={30} />
          </button>
          <p className="invisible group-hover:visible duration-150 transition">
            Facebook
          </p>
        </div>
        <div className="flex flex-shrink-0 flex-col items-center group">
          <button className="p-2 rounded-full bg-[#0088CC] text-white">
            <PiTelegramLogoThin size={30} />
          </button>
          <p className="invisible group-hover:visible duration-150 transition">
            Telegram
          </p>
        </div>
        <div className="flex flex-shrink-0 flex-col items-center group">
          <button className="p-2 rounded-full bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#FCAF45] text-white">
            <PiInstagramLogoThin size={30} />
          </button>
          <p className="invisible group-hover:visible duration-150 transition">
            Instagram
          </p>
        </div>
        <div className="flex flex-shrink-0 flex-col items-center group">
          <button className="p-2 rounded-full bg-[#FFFC00]">
            <PiSnapchatLogoThin size={30} />
          </button>
          <p className="invisible group-hover:visible duration-150 transition">
            Snapchat
          </p>
        </div>
      </div>
    </div>
  );
};

export default Content;
