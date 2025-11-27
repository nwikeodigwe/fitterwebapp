import clsx from "clsx";

interface Props {
    show: boolean
}

const Skeleton: React.FC<Props> = ({show}) => {
  return (
    <div className={clsx("flex flex-col gap-2 animate-pulse", !show && "hidden")}>
      <div className="flex items-start gap-2">
        <div className="size-10 bg-black/10"></div>
        <div className="flex flex-col gap-2 w-full">
          <div className="h-2 w-10 bg-black/10"></div>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="h-2 w-56 bg-black/10"></div>
              <div className="h-2 w-56 bg-black/10"></div>
              <div className="h-2 w-56 bg-black/10"></div>
              <div className="h-2 w-10 bg-black/10"></div>
            </div>
            <div className="space-y-1">
              <div className="h-10 w-7 bg-black/10"></div>
              <div className="h-10 w-7 bg-black/10"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-start gap-2 ml-11">
        <div className="size-7 bg-black/10"></div>
        <div className="flex flex-col gap-2 w-full">
          <div className="h-2 w-10 bg-black/10"></div>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="h-2 w-4 bg-black/10"></div>
              <div className="h-2 w-48 bg-black/10"></div>
              <div className="h-2 w-48 bg-black/10"></div>
              <div className="h-2 w-10 bg-black/10"></div>
            </div>
            <div className="space-y-1">
              <div className="h-10 w-7 bg-black/10"></div>
              <div className="h-10 w-7 bg-black/10"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-start gap-2">
        <div className="size-10 bg-black/10"></div>
        <div className="flex flex-col gap-2 w-full">
          <div className="h-2 w-10 bg-black/10"></div>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="h-2 w-56 bg-black/10"></div>
              <div className="h-2 w-56 bg-black/10"></div>
              <div className="h-2 w-56 bg-black/10"></div>
              <div className="h-2 w-10 bg-black/10"></div>
            </div>
            <div className="space-y-1">
              <div className="h-10 w-7 bg-black/10"></div>
              <div className="h-10 w-7 bg-black/10"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-start gap-2 ml-11">
        <div className="size-7 bg-black/10"></div>
        <div className="flex flex-col gap-2 w-full">
          <div className="h-2 w-10 bg-black/10"></div>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="h-2 w-4 bg-black/10"></div>
              <div className="h-2 w-48 bg-black/10"></div>
              <div className="h-2 w-48 bg-black/10"></div>
              <div className="h-2 w-10 bg-black/10"></div>
            </div>
            <div className="space-y-1">
              <div className="h-10 w-7 bg-black/10"></div>
              <div className="h-10 w-7 bg-black/10"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
