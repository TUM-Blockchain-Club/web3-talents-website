import { UnavailableAction } from "./unavailable-action";
import { ClubEventCard, DiversityCard } from "./cards";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { AccordionItem } from "./accordion";

export function CommunityHero() {
  return (
    <section className="web3t-cm-hero">
      <div className="web3t-rail">
        <h1 className="web3t-cm-hero__title">Get to know our Community</h1>
        <div className="web3t-cm-hero__grid">
          <div className="web3t-cm-hero__text">
            <h2 className="web3t-cm-hero__heading">
              Join Our Vibrant Web3 Community
            </h2>
            <p className="web3t-cm-hero__body">
              Web3Talents is a community where students learn, connect, and grow
              together. Members share ideas, support each other, and explore the
              world of Web3. Together with groups like the TUM Blockchain Club,
              we make blockchain learning fun and accessible.
            </p>
            <div className="web3t-cm-hero__by">
              <p>Built by students, driven by vision.</p>
              <img
                src="/assets/tum-logo.png"
                alt="TUM Blockchain Club"
                className="web3t-cm-hero__tum"
              />
            </div>
          </div>
          <div className="web3t-cm-hero__photo web3t-community-photo-placeholder">
            Community photos coming soon
          </div>
        </div>
      </div>
    </section>
  );
}

export function CommunityDiversity() {
  return (
    <section
      className="web3t-cm-diversity"
      aria-labelledby="web3t-cm-div-title"
    >
      <div className="web3t-rail">
        <div className="web3t-cm-diversity__head">
          <h2 id="web3t-cm-div-title" className="web3t-h2">
            Diversity is Key
          </h2>
          <p className="web3t-cm-diversity__sub">
            We believe that everyone has a place in Web3, and the best growth
            happens when we learn from our collective differences.
          </p>
        </div>
        <div className="web3t-cm-diversity__grid">
          <DiversityCard icon="/assets/icon-school.svg" title={<>Students</>}>
            Eager to specialize in blockchain and Web3 technologies
          </DiversityCard>
          <DiversityCard
            icon="/assets/icon-briefcase.svg"
            title={<>Industry Professionals</>}
          >
            Eager to specialize in blockchain and Web3 technologies
          </DiversityCard>
          <DiversityCard
            icon="/assets/icon-bulb.svg"
            title={<>Interested Minds</>}
          >
            Eager to specialize in blockchain and Web3 technologies
          </DiversityCard>
        </div>
      </div>
    </section>
  );
}

export function UpcomingEvents() {
  return (
    <section className="web3t-cm-events" aria-labelledby="web3t-cm-ev-title">
      <div className="web3t-rail">
        <h2 id="web3t-cm-ev-title" className="web3t-h2 web3t-cm-events__title">
          Upcoming community events
        </h2>
        <div className="web3t-cm-event">
          <span className="web3t-cm-event__upcoming">TO BE ANNOUNCED</span>
          <div className="web3t-cm-event__thumb" aria-hidden="true"></div>
          <div className="web3t-cm-event__main">
            <span className="web3t-cm-event__date">
              Event details coming soon
            </span>
            <div className="web3t-cm-event__mid">
              <div className="web3t-cm-event__info">
                <h3 className="web3t-cm-event__name">Event to be announced</h3>
                <p className="web3t-cm-event__loc">
                  <img
                    src="/assets/events-pin.svg"
                    alt=""
                    className="web3t-cm-event__pin"
                  />
                  Date and location to be confirmed
                </p>
              </div>
              <div className="web3t-cm-event__cta">
                <UnavailableAction className="web3t-btn web3t-btn--primary">
                  Sign Up
                </UnavailableAction>
                <UnavailableAction className="web3t-btn web3t-btn--outline">
                  Details coming soon
                </UnavailableAction>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ClubEvents() {
  return (
    <section className="web3t-cm-puzzlesec" aria-labelledby="web3t-cm-pz-title">
      <div className="web3t-rail">
        <h2
          id="web3t-cm-pz-title"
          className="web3t-h2 web3t-cm-puzzlesec__title"
        >
          Community event updates
        </h2>
        <div className="web3t-cm-puzzle">
          <ClubEventCard variant="lt" title={<>Event announcements</>}>
            Confirmed community events will be announced here.
          </ClubEventCard>
          <ClubEventCard variant="rt" title={<>Session details</>}>
            Topics, hosts, and formats will be listed once confirmed.
          </ClubEventCard>
          <ClubEventCard variant="lb" title={<>Locations</>}>
            Event locations or online joining details will be shared when
            available.
          </ClubEventCard>
          <ClubEventCard variant="rb" title={<>Participation</>}>
            Registration and eligibility details will accompany each confirmed
            event.
          </ClubEventCard>
        </div>
      </div>
    </section>
  );
}

export function CommunityFaq() {
  return (
    <section
      id="faq"
      className="web3t-cm-faqsec"
      aria-labelledby="web3t-cm-faq-title"
    >
      <div className="web3t-rail">
        <h2 id="web3t-cm-faq-title" className="web3t-cm-faqsec__title">
          Any Questions?
        </h2>
        <div className="web3t-cm-faqs">
          <AccordionItem
            itemId="community-accordion-1"
            as="div"
            className="web3t-cm-faq"
            headClassName="web3t-cm-faq__head"
            bodyClassName="web3t-cm-faq__body"
            color="#5c32f8"
            heading={
              <>
                <span className="web3t-cm-faq__q">Is the program free?</span>
                <span className="web3t-cm-faq__chev" aria-hidden="true"></span>
              </>
            }
          >
            <p>
              Fees, if any, will be stated in the confirmed course information.
            </p>
          </AccordionItem>
          <AccordionItem
            itemId="community-accordion-2"
            as="div"
            className="web3t-cm-faq"
            headClassName="web3t-cm-faq__head"
            bodyClassName="web3t-cm-faq__body"
            color="#4629fb"
            heading={
              <>
                <span className="web3t-cm-faq__q">
                  How can we apply to the courses?
                </span>
                <span className="web3t-cm-faq__chev" aria-hidden="true"></span>
              </>
            }
          >
            <p>
              Application instructions are not available yet. They will be
              published with the confirmed course details.
            </p>
          </AccordionItem>
          <AccordionItem
            itemId="community-accordion-3"
            as="div"
            className="web3t-cm-faq"
            headClassName="web3t-cm-faq__head"
            bodyClassName="web3t-cm-faq__body"
            color="#2b1eff"
            heading={
              <>
                <span className="web3t-cm-faq__q">
                  How time consuming is each course program?
                </span>
                <span className="web3t-cm-faq__chev" aria-hidden="true"></span>
              </>
            }
          >
            <p>
              Duration, session times, and expected workload are to be
              confirmed.
            </p>
          </AccordionItem>
          <AccordionItem
            itemId="community-accordion-4"
            as="div"
            className="web3t-cm-faq"
            headClassName="web3t-cm-faq__head"
            bodyClassName="web3t-cm-faq__body"
            color="#2666ff"
            heading={
              <>
                <span className="web3t-cm-faq__q">
                  Can I still join the events even if I&#039;m not a member?
                </span>
                <span className="web3t-cm-faq__chev" aria-hidden="true"></span>
              </>
            }
          >
            <p>
              Participation requirements will be included with each confirmed
              event.
            </p>
          </AccordionItem>
        </div>
      </div>
    </section>
  );
}

export function CommunityPage() {
  return (
    <div className="web3t web3t-communitypg" id="top">
      <SiteHeader current="community" />

      <CommunityHero />

      <CommunityDiversity />

      <UpcomingEvents />

      <ClubEvents />

      <CommunityFaq />

      <SiteFooter page="community" />
    </div>
  );
}
