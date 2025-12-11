import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Partners } from "@/components/partners"
import { Mission } from "@/components/mission"
import { ParticipantTypes } from "@/components/participant-types"
import { Expectations } from "@/components/expectations"
import { CourseStructure } from "@/components/course-structure"
import { Curriculum } from "@/components/curriculum"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Partners />
      <Mission />
      <ParticipantTypes />
      <Expectations />
      <CourseStructure />
      <Curriculum />
      <Footer />
    </main>
  )
}
