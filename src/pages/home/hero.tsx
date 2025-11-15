import Button from "@/components/button";
// import ThreeDImage from "@/components/threeDImage";
// import { useGetItemsQuery } from "@/features/item/service";

const Hero = () => {
  // const {
  //   data: { data },
  //   isLoading,
  //   error,
  // } = useGetItemsQuery({ limit: 10, offset: 0 });

  // if (isLoading) return <section>Loading...</section>;
  // if (error) {
  //   console.error(error);
  //   return <section>Failed to load items.</section>;
  // }

  // console.log(data);

  return (
    <section className="h-[calc(100vh-65px)] flex container px-10 relative">
      <div className="flex flex-col justify-center">
        <div className="py-20 space-y-2">
          <p>
            We aim to give you a comprehensive platform to discover and manage
            your style.
          </p>
          <h1 className="text-4xl font-bold uppercase w-[27ch]">
            Re-imagine the way you manage your style and wardrobe
          </h1>
          <Button className="text-white px-10 py-3 bg-black">
            Get Started
          </Button>
        </div>
      </div>
      {/* <div className="absolute top-0 bottom-0 right-0 border h-full w-[50%]">
        <ThreeDImage
          depthMap={data[0].depthMap}
          colorMap={data[0].images[0].url}
        />
      </div> */}
    </section>
  );
};

export default Hero;
