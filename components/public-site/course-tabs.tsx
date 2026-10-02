"use client";
import {
  createContext,
  useContext,
  useState,
  useId,
  type ReactNode,
} from "react";

const TabsContext = createContext({
  active: "desc",
  setActive: (_tab: string) => {},
  id: "",
});
export function CourseTabs({ children }: { children: ReactNode }) {
  const [active, setActive] = useState("desc");
  const id = useId();
  return (
    <TabsContext.Provider value={{ active, setActive, id }}>
      <div data-tabs="">{children}</div>
    </TabsContext.Provider>
  );
}
export function CourseTab({
  children,
  tab,
  className,
}: {
  children: ReactNode;
  tab: string;
  className: string;
}) {
  const context = useContext(TabsContext);
  const selected = context.active === tab;
  return (
    <button
      type="button"
      role="tab"
      data-tab={tab}
      id={`${context.id}-tab-${tab}`}
      aria-selected={selected}
      aria-controls={`${context.id}-panel-${tab}`}
      tabIndex={selected ? 0 : -1}
      className={`${className}${selected ? " is-active" : ""}`}
      onClick={() => context.setActive(tab)}
      onKeyDown={(event) => {
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key))
          return;
        event.preventDefault();
        const tabs = Array.from(
          event.currentTarget.parentElement!.querySelectorAll<HTMLButtonElement>(
            '[role="tab"]',
          ),
        );
        const index = tabs.indexOf(event.currentTarget);
        const next =
          event.key === "Home"
            ? 0
            : event.key === "End"
              ? tabs.length - 1
              : (index + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) %
                tabs.length;
        tabs[next].focus();
        context.setActive(tabs[next].dataset.tab!);
      }}
    >
      {children}
    </button>
  );
}
export function CoursePanel({
  children,
  tab,
}: {
  children: ReactNode;
  tab: string;
}) {
  const context = useContext(TabsContext);
  const active = context.active === tab;
  return (
    <div
      className={`web3t-course-panel${active ? " is-active" : ""}`}
      data-panel={tab}
      role="tabpanel"
      id={`${context.id}-panel-${tab}`}
      aria-labelledby={`${context.id}-tab-${tab}`}
      hidden={!active}
      tabIndex={0}
    >
      {children}
    </div>
  );
}
