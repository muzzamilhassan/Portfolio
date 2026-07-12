import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Work from "@/components/Work";
import About from "@/components/About";
import Services from "@/components/Services";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Preloader />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Marquee
          items={[
            "JavaScript",
            "React",
            "Next.js",
            "TypeScript",
            "Node.js",
            "Express",
            "NestJS",
            "PostgreSQL",
            "MongoDB",
            "Drizzle ORM",
            "Mongoose",
            "TypeORM",
            "Tailwind CSS",
            "Docker",
          ]}
        />
        <Work />
        <About />
        <Services />
        <Marquee
          accent
          items={[
            "Open to opportunities",
            "Remote friendly",
            "Onsite friendly",
            "Hybrid friendly",
          ]} />
        <Contact />
      </main>
    </>
  );
}
