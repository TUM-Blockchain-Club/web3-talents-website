"use client";
import {
  createContext,
  useContext,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

const AccordionContext = createContext<{
  open: string[];
  toggle: (id: string) => void;
  toggleAll: () => void;
  allOpen: boolean;
} | null>(null);
export function AccordionGroup({
  children,
  itemIds,
}: {
  children: ReactNode;
  itemIds: string[];
}) {
  const [open, setOpen] = useState<string[]>([]);
  const allOpen = itemIds.every((id) => open.includes(id));
  return (
    <AccordionContext.Provider
      value={{
        open,
        allOpen,
        toggle: (id) =>
          setOpen((current) =>
            current.includes(id)
              ? current.filter((key) => key !== id)
              : [...current, id],
          ),
        toggleAll: () => setOpen(allOpen ? [] : itemIds),
      }}
    >
      {children}
    </AccordionContext.Provider>
  );
}
export function AccordionItem({
  itemId,
  as: Tag,
  className,
  headClassName,
  bodyClassName,
  color,
  heading,
  children,
}: {
  itemId: string;
  as: "div" | "li";
  className: string;
  headClassName: string;
  bodyClassName: string;
  color?: string;
  heading: ReactNode;
  children: ReactNode;
}) {
  const group = useContext(AccordionContext);
  const [localOpen, setLocalOpen] = useState(false);
  const open = group ? group.open.includes(itemId) : localOpen;
  return (
    <Tag
      className={`${className}${open ? " is-open" : ""}`}
      data-accordion-item=""
      style={color ? ({ "--faqcolor": color } as CSSProperties) : undefined}
    >
      <button
        type="button"
        className={headClassName}
        aria-expanded={open}
        aria-controls={itemId}
        onClick={() =>
          group ? group.toggle(itemId) : setLocalOpen((value) => !value)
        }
      >
        {heading}
      </button>
      <div className={bodyClassName} id={itemId} aria-hidden={!open}>
        {children}
      </div>
    </Tag>
  );
}
export function ExpandAll() {
  const group = useContext(AccordionContext);
  return (
    <button
      type="button"
      className="web3t-course-about__expandbtn"
      onClick={group?.toggleAll}
    >
      {group?.allOpen ? "Collapse All" : "Expand All"}
    </button>
  );
}
