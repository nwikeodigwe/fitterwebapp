const Skeleton = () => {
  return (
    <section className="h-[92vh] p-5 flex flex-col justify-between relative overflow-clip animate-pulse gap-5">
      <div className="flex items-center justify-end">
        <div className="bg-black/5 w-16 h-16 rounded-full"></div>
      </div>
      <div className="h-full flex items-center justify-between gap-5">
        <div className="bg-black/5 w-40 h-10"></div>
        <div className="size-[400px] bg-black/5"></div>
        <div className="bg-black/5 w-40 h-10"></div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <div className="bg-black/5 w-56 h-4"></div>
          <div className="bg-black/5 w-56 h-10"></div>
          <div className="flex items-center gap-2">
            <div className="bg-black/5 w-10 h-4"></div>
            <div className="bg-black/5 w-10 h-4"></div>
            <div className="bg-black/5 w-10 h-4"></div>
          </div>
        </div>
        <div className="bg-black/5 w-10 h-10 rounded-full"></div>
      </div>
    </section>
  );
};

export default Skeleton;
