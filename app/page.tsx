import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Mission } from "@/components/mission"
import { ParticipantTypes } from "@/components/participant-types"
import { Expectations } from "@/components/expectations"
import { CourseStructure } from "@/components/course-structure"
import { Curriculum } from "@/components/curriculum"
import { Speakers } from "@/components/speakers" // <--- Import this
import { FAQ } from "@/components/faq"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
      <main className="min-h-screen bg-background">
        <Header />
        <Hero />
        <Mission />
        <ParticipantTypes />
        <Expectations />
        <CourseStructure />
        <Curriculum />

        {/* Speakers placed between Curriculum and FAQ */}
        <Speakers />

        <FAQ />
        <Footer />
      </main>
  )
}