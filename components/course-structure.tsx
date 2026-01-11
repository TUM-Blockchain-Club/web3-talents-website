import { ArrowDown, ArrowLeft, ArrowRight, Users, Presentation, BookOpen, Calendar } from "lucide-react"
import { Card } from "@/components/ui/card"

export function CourseStructure() {
  return (
    <section id="structure" className="py-24 px-4 bg-gradient-to-b from-background via-card to-background overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-bold mb-4 text-balance text-foreground">Course Structure</h1>
          <div className="h-1 w-80 bg-gradient-to-r from-purple-500 to-transparent mb-6 mx-auto" />
          <p className="text-2xl text-purple-400">From Learners to Teachers</p>
        </div>

        <div className="space-y-12">
          {/* Week 1 */}
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <Card className="bg-gray-100 text-black px-8 py-4 rounded-full border-2 border-purple-500 shadow-lg shadow-purple-500/20 whitespace-nowrap">
              <span className="font-semibold">Week 1</span>
            </Card>

            <div className="flex-1 space-y-6">
              <Card className="bg-gray-100 text-black px-8 py-4 rounded-full border-2 border-purple-400 shadow-lg flex items-center gap-3">
                <BookOpen className="w-5 h-5" />
                <span className="font-semibold">Lecture + Assignment</span>
              </Card>

              <div className="pl-8 border-l-2 border-purple-500/30">
                <p className="text-gray-300 leading-relaxed">
                  Establishment of <span className="text-white font-semibold">conceptual foundation</span> through
                  lectures by <span className="text-white font-semibold">expert-speakers</span>. You are given a{" "}
                  <span className="text-white font-semibold">practical assignment</span> to build your knowledge
                  foundation in a <span className="text-white font-semibold">subtopic</span>.
                </p>
              </div>
            </div>
          </div>

          {/* Arrow down */}
          <div className="flex justify-center md:justify-start md:pl-48">
            <ArrowDown className="w-8 h-8 text-purple-400" />
          </div>

          {/* Week 2, 4 */}
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <Card className="bg-gray-100 text-black px-8 py-4 rounded-full border-2 border-purple-500 shadow-lg shadow-purple-500/20 whitespace-nowrap">
              <span className="font-semibold">Week 2, 4, ...</span>
            </Card>

            <div className="flex-1 space-y-6">
              <Card className="bg-gray-100 text-black px-8 py-4 rounded-full border-2 border-purple-400 shadow-lg flex items-center gap-3">
                <Users className="w-5 h-5" />
                <span className="font-semibold">Processing (Specialist Groups)</span>
              </Card>

              <div className="pl-8 border-l-2 border-purple-500/30">
                <p className="text-gray-300 leading-relaxed">
                  Meet peers in smaller <span className="text-white font-semibold">subgroups</span> where everyone{" "}
                  <span className="text-white font-semibold">researches</span> and{" "}
                  <span className="text-white font-semibold">discusses</span> the same subtopic derived from the lecture.
                  The goal is for you to <span className="text-white font-semibold">become an expert</span> on that
                  specific of the topic and <span className="text-white font-semibold">prepare a presentation</span>.
                </p>
              </div>
            </div>
          </div>

          <div className="relative h-32 md:pl-48">
            <svg className="w-full h-full" viewBox="0 0 800 120" preserveAspectRatio="xMidYMid meet">
              {/* Left curved arrow - pointing DOWN */}
              <path
                d="M 150 10 Q 100 60 150 110"
                fill="none"
                stroke="rgb(192, 132, 252)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <polygon points="150,110 145,100 155,105" fill="rgb(192, 132, 252)" transform="rotate(225 150 110)" />

              {/* Right curved arrow - pointing UP */}
              <path
                d="M 650 110 Q 700 60 650 10"
                fill="none"
                stroke="rgb(192, 132, 252)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <polygon points="650,10 645,20 655,15" fill="rgb(192, 132, 252)" transform="rotate(45 650 10)" />
              
              {/* Center text */}
              <text x="400" y="65" textAnchor="middle" className="fill-purple-400 text-lg font-medium">
                Progressive Learning Cycle
              </text>
            </svg>
          </div>

          {/* Week 3, 5 */}
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <Card className="bg-gray-100 text-black px-8 py-4 rounded-full border-2 border-purple-500 shadow-lg shadow-purple-500/20 whitespace-nowrap">
              <span className="font-semibold">Week 3, 5, ...</span>
            </Card>

            <div className="flex-1 space-y-6">
              <div className="space-y-4">
                <Card className="bg-gray-100 text-black px-8 py-4 rounded-full border-2 border-purple-400 shadow-lg flex items-center gap-3">
                  <Presentation className="w-5 h-5" />
                  <span className="font-semibold">Group Teaching (Mixed Groups)</span>
                </Card>

                <Card className="bg-gray-100 text-black px-8 py-4 rounded-full border-2 border-purple-400 shadow-lg flex items-center gap-3">
                  <BookOpen className="w-5 h-5" />
                  <span className="font-semibold">Lecture + Assignment</span>
                </Card>
              </div>

              <div className="pl-8 border-l-2 border-purple-500/30 space-y-4">
                <div>
                  <span className="text-purple-400 font-bold text-xl">1.</span>
                  <p className="text-gray-300 leading-relaxed inline ml-2">
                    The specialist groups <span className="text-white font-semibold">teach</span> their{" "}
                    <span className="text-white font-semibold">subtopics</span> to the others groups. You{" "}
                    <span className="text-white font-semibold">present</span> your{" "}
                    <span className="text-white font-semibold">findings</span> to peers, and they teach you theirs -
                    piecing together the full picture through{" "}
                    <span className="text-white font-semibold">peer-to-peer teaching</span>.
                  </p>
                </div>

                <div>
                  <span className="text-purple-400 font-bold text-xl">2.</span>
                  <p className="text-gray-300 leading-relaxed inline ml-2">
                    After, you receive <span className="text-white font-semibold">new input</span> through a{" "}
                    <span className="text-white font-semibold">lecture</span> by an{" "}
                    <span className="text-white font-semibold">expert speaker</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
