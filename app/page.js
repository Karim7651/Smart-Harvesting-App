import Carousel from "./_components/Carousel";
import Categories from "./_components/Categories";

export default function Home() {
  return (
    <div className="min-h-[80svh] flex flex-col justify-center items-center">
      <Carousel />
      <Categories />
    </div>
  );
}
