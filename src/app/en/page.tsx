import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ContactActions } from "@/components/en/ContactActions";
import { DonationForm } from "@/components/en/DonationForm";
import { DonationLink } from "@/components/en/DonationLink";
import { Faq } from "@/components/en/Faq";
import { Gallery } from "@/components/en/Gallery";
import { Header } from "@/components/en/Header";
import { MobileDonationBar } from "@/components/en/MobileDonationBar";
import { needIcons, type NeedIconName } from "@/components/NeedIcons";
import { SectionContainer } from "@/components/SectionContainer";
import { TransparencySection } from "@/components/en/TransparencySection";
import { VideoCard } from "@/components/en/VideoCard";
import { campaignAssets, type ApprovedImageAsset } from "@/config/assets-en";
import {
  campaign,
  isConfigured,
} from "@/config/campaign-en";
import { existingAsset, existingAssets } from "@/lib/public-assets";
import { siteUrl } from "@/config/site";

const needs: Array<{
  icon: NeedIconName;
  title: string;
  text: string[];
}> = [
  {
    icon: "protection",
    title: "Personal equipment",
    text: ["Helmets, tactical uniforms, and personal equipment individually fitted for operational activity."],
  },
  {
    icon: "resilience",
    title: "Company resilience and cohesion",
    text: [
      "Platoon and company gatherings give us space to pause, process a difficult period, strengthen the bond between soldiers, and recharge for the next mission. Cohesion is what holds our company together and one of the sources of our strength.",
    ],
  },
  {
    icon: "homeFront",
    title: "Support for the company home front",
    text: [
      "Our families, children, and careers are the foundation that makes reserve service possible. Your support helps our families and children and assists reservists facing career hardship because of extended duty.",
    ],
  },
];

export const metadata: Metadata = {
  title: "Support Za'am Company | Equipment and Resilience for Reservists",
  description:
    "Za'am Company of Battalion 7421, Brigade 4, is raising support for personal equipment, company resilience, and the families behind its reservists.",
  alternates: {
    canonical: "/en",
    languages: { "he-IL": "/", "en-US": "/en" },
  },
  openGraph: {
    title: "Za'am Company Needs You With Us",
    description:
      "Help equip our soldiers, strengthen company resilience, and support the families behind the unit.",
    locale: "en_US",
    url: "/en",
  },
};

function JsonLd({ videoPoster }: { videoPoster: ApprovedImageAsset | null }) {
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Organization",
      "@id": "#organization",
      name: "Za'am Company - Battalion 7421, Brigade 4",
    },
    {
      "@type": "WebPage",
      "@id": "#webpage",
      url: `${siteUrl}/en`,
      name: "Support Za'am Company",
      inLanguage: "en",
      about: { "@id": "#organization" },
      description:
        "A fundraising campaign for personal equipment, company resilience and cohesion, and support for Za'am Company's home front.",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${siteUrl}/en`,
        },
      ],
    },
  ];

  if (videoPoster) {
    graph.push({
      "@type": "VideoObject",
      name: "Meet Za'am Company",
      description: "The official story of the soldiers of Za'am Company.",
      thumbnailUrl: [`${siteUrl}${videoPoster.src}`],
      contentUrl: `${siteUrl}${campaign.videoFile}`,
    });
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": graph,
        }).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export default function Home() {
  const logo = existingAsset(campaignAssets.unitEmblem);
  const videoPoster = existingAsset(campaignAssets.videoPoster);
  const heroImages = existingAssets(campaignAssets.heroImages);
  const storyImage = existingAsset(campaignAssets.storyImage);
  const galleryImages = existingAssets(campaignAssets.galleryImages);
  const nonprofitConfigured =
    isConfigured(campaign.nonprofitName) &&
    isConfigured(campaign.nonprofitNumber);

  return (
    <div className="english-site" lang="en" dir="ltr">
      <JsonLd videoPoster={videoPoster} />
      <Header logo={logo} />
      <main id="main-content" tabIndex={-1}>
        <section className="hero section-dark" id="top" aria-labelledby="hero-title">
          <div className="hero-texture" aria-hidden="true" />
          <SectionContainer className={`hero-grid ${heroImages.length ? "has-photo-strip" : ""}`}>
            <div className="hero-copy">
              <p className="eyebrow">ZA&apos;AM COMPANY | BATTALION 7421 | BRIGADE 4</p>
              <h1 id="hero-title" className="hero-title">
                Za&apos;am Company needs you on the front line
              </h1>
              <div className="hero-lead">
                <p>
                  After a long period of combat and operational missions in Gaza, Lebanon, and Syria, we are asking for your help to equip the company, strengthen its resilience, support our families and children, and stand behind the soldiers throughout extended deployments.
                </p>
              </div>
              <div className="hero-actions">
                <DonationLink className="button button-large">
                  I want to support the soldiers
                </DonationLink>
                <a className="text-link" href="#our-story">
                  Read our story <span aria-hidden="true">→</span>
                </a>
              </div>

              <div className="hero-trust">
                <p className="secure-trust-line">
                  Payment is completed securely through IsraelGives.
                </p>
                <p className="trust-line">
                  Every donation, large or small, helps protect those who protect us.
                </p>
              </div>
            </div>

            <div className="hero-media" id="hero-video">
              <VideoCard poster={videoPoster} />
            </div>

            {heroImages.length ? (
              <div className="hero-photo-strip" aria-label="Approved photos from company operations">
                {heroImages.map((image) => (
                  <div className="strip-image" key={image.src}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 640px) 33vw, 390px"
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </SectionContainer>
        </section>

        <section className="section video-section" id="video" aria-labelledby="video-title">
          <SectionContainer>
            <div className="video-section-intro">
              <p className="eyebrow eyebrow-dark">FACES. VOICES. ONE STORY.</p>
              <h2 id="video-title">Meet Za&apos;am Company</h2>
              <p className="section-intro">
                Hear the soldiers&apos; story, the road we have traveled since the war began,
                and why we need you with us now.
              </p>
            </div>
          </SectionContainer>
          <SectionContainer className="video-feature">
            <VideoCard poster={videoPoster} />
            <div className="video-caption">
              <p>
                We do what is needed on the front line. Your support helps us do it
                more safely and effectively.
              </p>
              <DonationLink className="button">Stand with us</DonationLink>
            </div>
          </SectionContainer>
        </section>

        <section className="section story-section" id="our-story" aria-labelledby="story-title">
          <SectionContainer className={`story-grid ${storyImage ? "has-story-image" : ""}`}>
            <div className="story-heading">
              <p className="eyebrow eyebrow-dark">OUR STORY</p>
              <h2 id="story-title" className="story-title">We have been there since the morning of October 8</h2>
              <p className="story-intro">
                Since the morning of October 8, 2023, the reservists of Za&apos;am Company
                have left their homes, jobs, and families to report to the front line.
              </p>
            </div>
            {storyImage ? (
              <figure className="story-image">
                <Image
                  src={storyImage.src}
                  alt={storyImage.alt}
                  width={storyImage.width}
                  height={storyImage.height}
                  sizes="(max-width: 359px) calc(100vw - 32px), (max-width: 767px) calc(100vw - 40px), (max-width: 1023px) calc(100vw - 48px), (max-width: 1280px) 42vw, 510px"
                  loading="lazy"
                  style={{ objectPosition: storyImage.objectPosition }}
                />
              </figure>
            ) : null}
            <div className="story-copy prose">
              <p>
                From Rimal and Shuja&apos;iyya, through the intense battles in Khan Yunis,
                to missions on the Syrian and Lebanese fronts, we have answered every call
                to defend the State of Israel and its citizens.
              </p>
              <p>
                Our company brings together people from across the country and every part
                of Israeli society. In daily life we work, study, run businesses, and raise
                families. When the moment comes, we become one fighting team again.
              </p>
              <p>
                The prolonged fighting has taken a heavy toll. Despite the hardship and pain,
                we continue to report for duty and carry out every mission entrusted to us.
              </p>
            </div>
            <blockquote className="story-quote">
              <p className="story-quote-text">
                <span>Our company reflects the fabric of Israeli life -</span>
                <span>different people who became one family and one fighting force.</span>
              </p>
            </blockquote>
          </SectionContainer>
        </section>

        <section className="section needs-section" id="needs" aria-labelledby="needs-title">
          <SectionContainer>
            <div className="section-heading centered narrow">
              <p className="eyebrow eyebrow-dark" id="needs-title">WHY ARE WE FUNDRAISING?</p>
              <p className="section-intro">
                To continue carrying out our missions as safely and effectively as possible,
                we are asking for your help in three critical areas.
              </p>
            </div>
            <div className="needs-grid">
              {needs.map((need) => (
                <NeedCard key={need.title} {...need} />
              ))}
            </div>
          </SectionContainer>
        </section>

        <TransparencySection />

        {galleryImages.length ? (
          <section className="section gallery-section" aria-labelledby="gallery-title">
            <SectionContainer>
              <div className="gallery-intro">
                <p className="eyebrow eyebrow-dark gallery-label">OUR COMPANY</p>
                <h2 id="gallery-title" className="gallery-title">The people behind the uniforms</h2>
                <p className="gallery-description">
                  Real moments from service, from the field, and from the long road we have traveled together.
                </p>
              </div>
              <Gallery images={galleryImages} />
            </SectionContainer>
          </section>
        ) : null}

        <section className="section urgency section-dark" aria-labelledby="urgency-title">
          <SectionContainer className="urgency-inner">
            <div className="urgency-heading">
              <p className="eyebrow">THE MISSION CONTINUES</p>
              <h2 id="urgency-title">The war may have left the headlines. For us, it is not over.</h2>
            </div>
            <div className="urgency-content prose">
              <p>
                We continue to be called to missions, to leave our families, and to report
                for duty time and again.
              </p>
              <p>
                To complete our missions, protect one another, and return home safely,
                we need partners.
              </p>
              <p>
                Your donation is more than financial support. It sends every soldier a clear
                message: you are not alone.
              </p>
              <DonationLink className="button">I stand with you</DonationLink>
            </div>
          </SectionContainer>
        </section>

        <section className="section donation-section" id="donation" aria-labelledby="donation-title">
          <SectionContainer className="donation-inner">
            <p className="eyebrow eyebrow-dark">EVERY AMOUNT MAKES YOU A PARTNER</p>
            <h2 id="donation-title">Stand with and strengthen Za&apos;am Company</h2>
            <p className="section-intro donation-supporting-text">
              A certified tactical uniform set costs ₪1,500. Given the nature of our combat
              and the incidents the company has faced, we will not compromise on our soldiers&apos;
              lives. We purchase certified, life-protecting uniforms designed for long weeks
              of operational activity.
            </p>
            <p className="donation-grid-intro">Choose the donation level that works for you.</p>
            <DonationForm />
            {nonprofitConfigured ? (
              <p className="nonprofit-details">
                {campaign.nonprofitName} · Organization no. <bdi>{campaign.nonprofitNumber}</bdi>
                {campaign.taxDeductible ? " · Donations are tax-deductible in Israel under Section 46" : ""}
              </p>
            ) : null}
          </SectionContainer>
        </section>

        <section className="section closing-section" aria-labelledby="closing-title">
          <SectionContainer className="closing-inner">
            {storyImage ? (
              <figure className="closing-image">
                <Image
                  src={storyImage.src}
                  alt={storyImage.alt}
                  width={storyImage.width}
                  height={storyImage.height}
                  sizes="(max-width: 767px) calc(100vw - 40px), 620px"
                  loading="lazy"
                />
              </figure>
            ) : null}
            <h2 id="closing-title">We are doing our part on the front line. Now we need you with us.</h2>
            <div className="prose">
              <p>
                Every donation, large or small, helps us protect our soldiers, preserve our
                cohesion, and give the company the support it needs.
              </p>
              <p>Your partnership multiplies our strength.</p>
              <p>Together, we can continue to complete our missions and return home safely.</p>
              <p className="signature">
                With deep gratitude and hope for quieter days,
                <br />
                <strong>The soldiers of Za&apos;am Company</strong>
              </p>
            </div>
            <div className="closing-actions">
              <DonationLink className="button button-large">Donate to Za&apos;am Company</DonationLink>
              <p className="trust-small">Payment is completed securely through IsraelGives.</p>
            </div>
          </SectionContainer>
        </section>

        <section className="section faq-section" id="faq" aria-labelledby="faq-title">
          <SectionContainer className="faq-grid">
            <div>
              <p className="eyebrow eyebrow-dark">GOOD TO KNOW</p>
              <h2 id="faq-title">Frequently asked questions</h2>
            </div>
            <Faq />
          </SectionContainer>
        </section>
      </main>

      <footer className="site-footer">
        <SectionContainer className="footer-grid">
          <div className="footer-unit">
            <strong className="footer-brand">Za&apos;am Company</strong>
            <p>Battalion 7421 · Brigade 4</p>
            <p>This site was created to strengthen the soldiers of Za&apos;am Company.</p>
            <ContactActions className="footer-contact-actions" />
          </div>

          <nav className="footer-nav" aria-label="Site navigation">
            <h3>Explore</h3>
            <div className="footer-links">
              <Link href="#our-story">Our story</Link>
              <Link href="#needs">Where your donation goes</Link>
              <Link href="#faq">Frequently asked questions</Link>
              <Link href="#top">Back to top</Link>
            </div>
          </nav>

          <div className="footer-action-group">
            <DonationLink className="button footer-donation-button">Donate now</DonationLink>
            <nav className="footer-nav footer-legal" aria-label="Legal links">
              <h3>Legal</h3>
              <div className="footer-links">
                <Link href="/privacy">Privacy policy</Link>
                <Link href="/accessibility">Accessibility statement</Link>
                <Link href="/terms">Terms of use</Link>
              </div>
            </nav>
          </div>
        </SectionContainer>
        <SectionContainer className="copyright">
          © {new Date().getFullYear()} Za&apos;am Company. All rights reserved.
        </SectionContainer>
      </footer>
      <MobileDonationBar />
    </div>
  );
}

function NeedCard({ icon, title, text }: (typeof needs)[number]) {
  const Icon = needIcons[icon];

  return (
    <article className="need-card">
      <span className="need-card-icon" aria-hidden="true">
        <Icon />
      </span>
      <h3 className="need-card-title">{title}</h3>
      <div className="need-card-copy need-card-body">
        {text.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
