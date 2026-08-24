'use client'

import heroImage1 from '@/images/hero-right-1.png'
import heroImage2 from '@/images/hero-right-2.png'
import heroImage3 from '@/images/hero-right-3.png'
import ButtonPrimary from '@/shared/Button/ButtonPrimary'
import { Search01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import { useInterval } from 'react-use'

const data = [
  {
    id: 1,
    imageUrl: heroImage1.src,
    imageWidth: heroImage1.width,
    imageHeight: heroImage1.height,
    eyebrow: 'New Season 2026',
    heading: 'Exclusive collection for everyone',
    headingHighlight: 'Exclusive',
    subHeading: 'Discover curated styles that define elegance. Premium fashion, timeless design.',
    btnText: 'Explore collection',
    btnHref: '/collections/all',
  },
  {
    id: 2,
    imageUrl: heroImage2.src,
    imageWidth: heroImage2.width,
    imageHeight: heroImage2.height,
    eyebrow: 'Trending Now',
    heading: 'Where fashion meets confidence',
    headingHighlight: 'confidence',
    subHeading: 'Elevate your wardrobe with pieces that speak to who you are.',
    btnText: 'Shop new arrivals',
    btnHref: '/collections/all',
  },
  {
    id: 3,
    imageUrl: heroImage3.src,
    imageWidth: heroImage3.width,
    imageHeight: heroImage3.height,
    eyebrow: 'Limited Edition',
    heading: 'Curated style, crafted for you',
    headingHighlight: 'Curated',
    subHeading: 'Handpicked collections that blend modern aesthetics with timeless appeal.',
    btnText: 'Discover more',
    btnHref: '/collections/all',
  },
]

interface Props {
  className?: string
}

let TIME_OUT: NodeJS.Timeout | null = null

const SectionHero2: FC<Props> = ({ className = '' }) => {
  const [indexActive, setIndexActive] = useState(0)
  const [isRunning, toggleIsRunning] = useState(true)
  const [slideKey, setSlideKey] = useState(0)

  const handlers = useSwipeable({
    onSwipedLeft: () => handleClickNext(),
    onSwipedRight: () => handleClickPrev(),
    trackMouse: true,
  })

  useInterval(
    () => handleAutoNext(),
    isRunning ? 5000 : 999999
  )

  const handleAutoNext = () => {
    setIndexActive((state) => (state >= data.length - 1 ? 0 : state + 1))
    setSlideKey((k) => k + 1)
  }

  const handleClickNext = () => {
    setIndexActive((state) => (state >= data.length - 1 ? 0 : state + 1))
    setSlideKey((k) => k + 1)
    handleAfterClick()
  }

  const handleClickPrev = () => {
    setIndexActive((state) => (state === 0 ? data.length - 1 : state - 1))
    setSlideKey((k) => k + 1)
    handleAfterClick()
  }

  const handleAfterClick = () => {
    toggleIsRunning(false)
    if (TIME_OUT) clearTimeout(TIME_OUT)
    TIME_OUT = setTimeout(() => toggleIsRunning(true), 1000)
  }

  // Highlight a specific word in the heading with brand color
  const renderHeading = (heading: string, highlight: string) => {
    const idx = heading.toLowerCase().indexOf(highlight.toLowerCase())
    if (idx === -1) return heading
    const before = heading.slice(0, idx)
    const word = heading.slice(idx, idx + highlight.length)
    const after = heading.slice(idx + highlight.length)
    return (
      <>
        {before}
        <span className="text-[#FF6B9D]">{word}</span>
        {after}
      </>
    )
  }

  const item = data[indexActive]

  return (
    <div className={clsx('relative z-[1]', className)} {...handlers}>
      {/* ============ FULL-VIEWPORT HERO ============ */}
      <section className="relative min-h-screen w-full overflow-hidden">

        {/* ---- LAYERED BACKGROUND ---- */}
        <div className="absolute inset-0 -z-20">
          {/* Base gradient */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, #FFF5F7 0%, #FFE8EE 25%, #FFD6E0 50%, #FFEEF2 75%, #FFFBFC 100%)',
            }}
          />
          {/* Soft gradient orb — top right */}
          <div
            className="hero-orb-pulse absolute -top-[10%] -right-[5%] h-[600px] w-[600px] rounded-full blur-[120px] lg:h-[800px] lg:w-[800px]"
            style={{ background: 'radial-gradient(circle, rgba(255,107,157,0.35) 0%, transparent 70%)' }}
          />
          {/* Soft gradient orb — bottom left */}
          <div
            className="hero-orb-pulse-2 absolute -bottom-[15%] -left-[10%] h-[500px] w-[500px] rounded-full blur-[100px] lg:h-[700px] lg:w-[700px]"
            style={{ background: 'radial-gradient(circle, rgba(255,163,186,0.3) 0%, transparent 70%)' }}
          />
          {/* Subtle center glow */}
          <div
            className="absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[160px] lg:h-[600px] lg:w-[600px]"
            style={{ background: 'radial-gradient(circle, rgba(255,228,235,0.5) 0%, transparent 70%)' }}
          />
        </div>

        {/* ---- DECORATIVE GEOMETRIC ELEMENTS ---- */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          {/* Floating ring — top left */}
          <div className="hero-float absolute top-[12%] left-[8%] h-20 w-20 rounded-full border-2 border-[#FF6B9D]/15 lg:h-32 lg:w-32" />
          {/* Floating ring — bottom right */}
          <div className="hero-float-reverse absolute bottom-[18%] right-[12%] h-16 w-16 rounded-full border-2 border-[#FF6B9D]/10 lg:h-24 lg:w-24" />
          {/* Small dot cluster — mid left */}
          <div className="hero-float absolute top-[45%] left-[3%] h-3 w-3 rounded-full bg-[#FF6B9D]/20 lg:h-4 lg:w-4" />
          <div className="hero-float-reverse absolute top-[48%] left-[5%] h-2 w-2 rounded-full bg-[#FF6B9D]/15" />
          {/* Thin accent line — top */}
          <div className="hero-float absolute top-[8%] right-[25%] h-px w-24 bg-gradient-to-r from-transparent via-[#FF6B9D]/20 to-transparent lg:w-40" />
          {/* Diamond shape — right mid */}
          <div className="hero-float-reverse absolute top-[35%] right-[5%] h-6 w-6 rotate-45 border border-[#FF6B9D]/12 lg:h-10 lg:w-10" />
        </div>

        {/* ---- MAIN CONTENT ---- */}
        <div className="relative flex min-h-screen flex-col">

          {/* Hero content area */}
          <div className="flex flex-1 items-center">
            <div className="container w-full">
              <div className="flex flex-col items-center gap-0 lg:flex-row lg:items-stretch lg:gap-4 xl:gap-8">

                {/* ---- LEFT: TEXT CONTENT ---- */}
                <div className="flex w-full flex-col items-start pt-28 pb-8 lg:w-[45%] lg:pt-0 lg:pb-0" key={`content-${slideKey}`}>
                  {/* Eyebrow */}
                  <div className="hero-slide-up mb-4 flex items-center gap-2.5 lg:mb-6">
                    <span className="h-px w-8 bg-[#FF6B9D]/60" />
                    <span
                      className="text-xs font-semibold tracking-[0.2em] uppercase text-[#FF6B9D]"
                    >
                      {item.eyebrow}
                    </span>
                  </div>

                  {/* Headline */}
                  <h1
                    className="hero-slide-up-delay-1 text-4xl leading-[1.1] font-bold tracking-tight text-[#1a1a2e] sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl"
                  >
                    {renderHeading(item.heading, item.headingHighlight)}
                  </h1>

                  {/* Subheading */}
                  <p
                    className="hero-slide-up-delay-2 mt-5 max-w-md text-base leading-relaxed text-[#4a4a68]/80 lg:mt-6 lg:text-lg"
                  >
                    {item.subHeading}
                  </p>

                  {/* CTA Buttons */}
                  <div className="hero-slide-up-delay-3 mt-8 flex flex-wrap items-center gap-4 lg:mt-10">
                    <ButtonPrimary href={item.btnHref || '#'} className="!bg-[#FF6B9D] !border-[#FF6B9D] hover:!bg-[#e0508a] hover:!border-[#e0508a] !text-white before:!bg-[#FF6B9D] dark:!bg-[#FF6B9D] dark:!text-white dark:before:!hidden">
                      <span className="me-2">{item.btnText}</span>
                      <HugeiconsIcon icon={Search01Icon} size={18} />
                    </ButtonPrimary>
                    <button
                      onClick={() => handleClickNext()}
                      className="group flex items-center gap-2 rounded-full border border-[#1a1a2e]/15 px-6 py-2.5 text-sm font-medium text-[#1a1a2e]/70 transition-all duration-300 hover:border-[#FF6B9D]/40 hover:text-[#FF6B9D] sm:py-3"
                    >
                      <span>Next look</span>
                      <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                      </svg>
                    </button>
                  </div>

                  {/* Slide counter */}
                  <div className="hero-slide-up-delay-4 mt-10 flex items-center gap-3 lg:mt-14">
                    <span className="text-sm font-semibold tabular-nums text-[#1a1a2e]">
                      {String(indexActive + 1).padStart(2, '0')}
                    </span>
                    <div className="flex gap-1.5">
                      {data.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setIndexActive(i)
                            setSlideKey((k) => k + 1)
                            handleAfterClick()
                          }}
                          className="relative h-0.5 w-8 overflow-hidden rounded-full bg-[#1a1a2e]/10 transition-all duration-300 hover:bg-[#1a1a2e]/20 sm:w-10"
                          aria-label={`Go to slide ${i + 1}`}
                        >
                          {indexActive === i && (
                            <span
                              key={`progress-${slideKey}`}
                              className="hero-progress-fill absolute inset-y-0 left-0 rounded-full bg-[#FF6B9D]"
                            />
                          )}
                        </button>
                      ))}
                    </div>
                    <span className="text-sm tabular-nums text-[#1a1a2e]/40">
                      {String(data.length).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* ---- RIGHT: HERO IMAGE ---- */}
                <div className="relative flex w-full items-end justify-center lg:w-[55%] lg:self-stretch lg:items-end" key={`image-${slideKey}`}>
                  {/* Soft backdrop behind image */}
                  <div
                    className="absolute inset-x-0 bottom-0 h-[90%] rounded-t-[3rem] lg:rounded-t-[4rem]"
                    style={{
                      background: 'linear-gradient(180deg, rgba(255,107,157,0.06) 0%, rgba(255,214,224,0.22) 100%)',
                    }}
                  />
                  {/* Additional subtle circle accent behind model */}
                  <div
                    className="absolute bottom-[5%] left-1/2 h-[70%] w-[70%] -translate-x-1/2 rounded-full blur-[80px]"
                    style={{ background: 'radial-gradient(circle, rgba(255,107,157,0.15) 0%, transparent 70%)' }}
                  />
                  <Image
                    sizes="(max-width: 768px) 95vw, 55vw"
                    className="hero-image-reveal relative z-10 h-auto w-full object-contain object-bottom select-none
                      max-h-[55vh] sm:max-h-[60vh] md:max-h-[65vh] lg:max-h-[calc(100vh-7rem)] lg:max-w-none"
                    src={item.imageUrl}
                    alt={item.heading}
                    width={item.imageWidth || 790}
                    height={item.imageHeight || 790}
                    priority
                  />
                </div>

              </div>
            </div>
          </div>

          {/* ---- SCROLL INDICATOR ---- */}
          <div className="hero-slide-up-delay-4 absolute bottom-8 left-1/2 z-10 hidden flex-col items-center gap-2 lg:flex">
            <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-[#1a1a2e]/40">
              Scroll
            </span>
            <div className="hero-scroll-bounce">
              <svg className="h-5 w-5 text-[#FF6B9D]/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
          </div>

        </div>

        {/* ---- BOTTOM GRADIENT FADE ---- */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-32"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.5) 50%, rgb(255,255,255) 100%)',
          }}
        />

      </section>

      {/* ---- PREV/NEXT BUTTONS (desktop) ---- */}
      <button
        type="button"
        className="absolute top-1/2 end-4 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full p-3 text-[#1a1a2e]/30 transition-all duration-300 hover:bg-[#FF6B9D]/10 hover:text-[#FF6B9D] lg:flex xl:end-8"
        onClick={handleClickNext}
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>
      <button
        type="button"
        className="absolute top-1/2 start-4 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full p-3 text-[#1a1a2e]/30 transition-all duration-300 hover:bg-[#FF6B9D]/10 hover:text-[#FF6B9D] lg:flex xl:start-8"
        onClick={handleClickPrev}
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </button>
    </div>
  )
}

export default SectionHero2
