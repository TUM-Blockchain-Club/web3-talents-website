export function CourseStructureFlow() {
  return (
    <div className="w-full flex justify-center mb-8" aria-hidden="false">
      <svg
        viewBox="0 0 560 520"
        width="560"
        height="520"
        className="max-w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Course structure flow chart"
      >
        {/* Background is transparent - shapes styled inline to match site theme */}
        {/* Top box: Week 1 */}
        <rect x="110" y="20" width="340" height="56" rx="16" fill="#ffffff" stroke="#7c3aed" strokeWidth="6" />
        <text x="280" y="58" textAnchor="middle" fontSize="18" fontWeight="600" fill="#111827">Lecture + Assignment</text>

        {/* Arrow down */}
        <path d="M280 80 L280 120" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
        <path d="M274 114 L280 120 L286 114" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

        {/* Middle box: Week 2 */}
        <rect x="90" y="140" width="380" height="56" rx="16" fill="#ffffff" stroke="#7c3aed" strokeWidth="6" />
        <text x="280" y="178" textAnchor="middle" fontSize="18" fontWeight="600" fill="#111827">Processing (Specialist Groups)</text>

        {/* Bidirectional arrows between middle and lower box */}
        <path d="M210 212 C200 252, 200 292, 210 332" stroke="#ffffff" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M350 332 C360 292, 360 252, 350 212" stroke="#ffffff" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M216 322 L224 331" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
        <path d="M344 322 L336 331" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />

        {/* Lower boxes: Week 3 and Lecture + Assignment */}
        <rect x="120" y="360" width="320" height="48" rx="12" fill="#ffffff" stroke="#7c3aed" strokeWidth="6" />
        <text x="280" y="392" textAnchor="middle" fontSize="16" fontWeight="600" fill="#111827">Group Teaching (Mixed Groups)</text>

        <rect x="160" y="420" width="240" height="48" rx="12" fill="#ffffff" stroke="#7c3aed" strokeWidth="6" />
        <text x="280" y="452" textAnchor="middle" fontSize="16" fontWeight="600" fill="#111827">Lecture + Assignment</text>

        {/* Left small labels for week numbers */}
        <rect x="10" y="20" width="96" height="36" rx="12" fill="#ffffff" stroke="#7c3aed" strokeWidth="4" />
        <text x="58" y="44" textAnchor="middle" fontSize="14" fill="#111827">Week 1</text>

        <rect x="10" y="140" width="140" height="36" rx="12" fill="#ffffff" stroke="#7c3aed" strokeWidth="4" />
        <text x="80" y="164" textAnchor="middle" fontSize="14" fill="#111827">Week 2, 4, ...</text>

        <rect x="10" y="360" width="140" height="36" rx="12" fill="#ffffff" stroke="#7c3aed" strokeWidth="4" />
        <text x="80" y="384" textAnchor="middle" fontSize="14" fill="#111827">Week 3, 5, ...</text>
      </svg>
    </div>
  )
}
