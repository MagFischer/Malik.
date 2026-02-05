import { setRequestLocale } from "next-intl/server";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { BentoGrid } from "@/components/BentoGrid";
import { BentoCard } from "@/components/BentoCard";
import { ProjectCard } from "@/components/ProjectCard";
import { BlogCard } from "@/components/BlogCard";
import { AboutCard } from "@/components/AboutCard";
import { StatsCard } from "@/components/StatsCard";
import { SkillsCard } from "@/components/SkillsCard";
import { SocialProofCard } from "@/components/SocialProofCard";
import { ContactSection } from "@/components/ContactSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ScrollReveal } from "@/components/ScrollReveal";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";
import { getAllProjects } from "@/lib/projects";
import { getAllPosts } from "@/lib/blog";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Get portfolio and blog data
  const projects = getAllProjects();
  const posts = getAllPosts(locale);

  // Get featured items
  const featuredProject = projects[0];
  const otherProjects = projects.slice(1, 3);
  const featuredPost = posts[0];
  const otherPosts = posts.slice(1, 3);

  return (
    <>
      <NoiseOverlay />
      <Header />

      <main>
        {/* Hero Section */}
        <Hero />

        {/* Services Section */}
        <ScrollReveal>
          <ServicesSection />
        </ScrollReveal>

        {/* Bento Grid Section */}
        <BentoGrid>
          {/* Row 1: Featured Project + About + Stats */}
          <ScrollReveal className="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 lg:row-span-2">
            {featuredProject && (
              <ProjectCard project={featuredProject} featured />
            )}
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="col-span-1 lg:col-span-1 row-span-1 lg:row-span-2" id="about">
            <AboutCard className="h-full" />
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="col-span-1 lg:col-span-1">
            <StatsCard className="h-full" />
          </ScrollReveal>

          {/* Row 2: Skills + Other Projects */}
          <ScrollReveal delay={0.1} className="col-span-1 lg:col-span-1">
            <SkillsCard className="h-full" />
          </ScrollReveal>

          {otherProjects.map((project, index) => (
            <ScrollReveal key={project.slug} delay={0.2 + index * 0.1} className="col-span-1" id={index === 0 ? "projects" : undefined}>
              <ProjectCard project={project} />
            </ScrollReveal>
          ))}

          {/* Row 3: Featured Blog + Other Blog Posts + Social Proof */}
          <ScrollReveal delay={0.1} className="col-span-1 md:col-span-2" id="blog">
            {featuredPost && <BlogCard post={featuredPost} featured />}
          </ScrollReveal>

          {otherPosts.map((post, index) => (
            <ScrollReveal key={post.slug} delay={0.2 + index * 0.1} className="col-span-1">
              <BlogCard post={post} />
            </ScrollReveal>
          ))}

          <ScrollReveal delay={0.3} className="col-span-1">
            <SocialProofCard className="h-full" />
          </ScrollReveal>
        </BentoGrid>

        {/* Contact Section */}
        <ScrollReveal>
          <ContactSection />
        </ScrollReveal>
      </main>

      <Footer />
    </>
  );
}
