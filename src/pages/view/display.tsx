import Content from "./content";
import Footer from "./footer";
import Header from "./header";

const Display = () => {
  return (
    <section className="h-[92vh] p-5 flex flex-col justify-between relative overflow-clip">
      <Header />
      <Content />
      <Footer />
    </section>
  );
};

export default Display;
