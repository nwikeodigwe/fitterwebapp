import Header from "./header";
import Footer from "./footer";
import Content from "./content";

const Index = () => {
  return (
    <section className="h-[92vh] p-5 flex flex-col justify-between relative overflow-clip">
      <Header />
      <Content />
      <Footer />
    </section>
  );
};

export default Index;
