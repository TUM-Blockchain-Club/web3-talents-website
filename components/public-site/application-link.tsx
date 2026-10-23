import { courseFacts } from "./course-content";

export function ApplicationLink({ className }: { className?: string }) {
  return (
    <a className={className} href={courseFacts.applicationUrl} data-apply>
      Apply now
    </a>
  );
}
