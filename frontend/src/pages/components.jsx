import { Navbar } from "../localcomponents/Navbar";
import Sidebar from "../localcomponents/Sidebar";
import ComponentGrid from "../localcomponents/ComponentGrid";


<section className="flex-1 p-8">
  <ComponentGrid />
</section>

const Components = () => {
  return (
    <>
    
      <Navbar />

      

   <main className="min-h-screen bg-[#0D1117] pt-24">
  <div className="flex w-full">
    <Sidebar />

  <section className="flex-1 p-8">
  <ComponentGrid />
</section>
  </div>
</main>
    </>
  );
};

export default Components;