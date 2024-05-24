import { Card } from "./Card";
export const Portfolio = () => {
  return (
    <section id="portfolio" className="py-10">
      <div className="flex justify-center flex-col items-center gap-8 mx-8">
        <h1 className="text-2xl font-sans uppercase hover:underline leading-4">
          Portfolio
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 w-full gap-6">
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </section>
  );
};
