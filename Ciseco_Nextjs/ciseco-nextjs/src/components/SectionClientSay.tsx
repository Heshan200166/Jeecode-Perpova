'use client'

import Heading from '@/components/Heading/Heading'
import { useCarouselArrowButtons } from '@/hooks/use-carousel-arrow-buttons'
import { useCarouselDotButton } from '@/hooks/use-carousel-dot-buttons'
import userImage1 from '@/images/users/1.png'
import userImage2 from '@/images/users/2.png'
import userImage3 from '@/images/users/3.png'
import userImage4 from '@/images/users/4.png'
import userImage5 from '@/images/users/5.png'
import userImage6 from '@/images/users/6.png'
import userImage7 from '@/images/users/7.png'
import qlImage from '@/images/users/ql.png'
import qrImage from '@/images/users/qr.png'
import { StarIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import type { EmblaOptionsType } from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { FC } from 'react'

export const DEMO_DATA = [
  {
    id: 1,
    clientName: 'Tiana Abie',
    content: 'Absolutely love the quality! The fabric feels premium and the fit is perfect. Already ordered two more pieces.',
  },
  {
    id: 2,
    clientName: 'Lennie Swiffan',
    content: 'Shipping was incredibly fast and the packaging was beautiful. The jacket exceeded my expectations — worth every penny.',
  },
  {
    id: 3,
    clientName: 'Berta Emili',
    content: 'Finally found an online store with accurate sizing. The customer service team was super helpful when I had questions.',
  },
]

export interface SectionClientSayProps {
  className?: string
  emblaOptions?: EmblaOptionsType
  heading?: string
  subHeading?: string
}

const SectionClientSay: FC<SectionClientSayProps> = ({
  className,
  emblaOptions = {
    slidesToScroll: 1,
    loop: true,
  },
  heading = 'Good news from far away 🥇',
  subHeading = "Let's see what people think of Jee code",
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions, [Autoplay({ playOnInit: true, delay: 2000 })])
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = useCarouselArrowButtons(emblaApi)
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useCarouselDotButton(emblaApi)

  return (
    <div className={clsx('relative flow-root overflow-hidden', className)}>
      <Heading
        description={subHeading}
        isCenter
        prevBtnDisabled={prevBtnDisabled}
        nextBtnDisabled={nextBtnDisabled}
        onClickPrev={onPrevButtonClick}
        onClickNext={onNextButtonClick}
      >
        {heading}
      </Heading>
      <div className="relative mx-auto max-w-2xl md:mb-16">
        {/* BACKGROUND USER IMAGES */}
        <div className="hidden md:block">
          <Image sizes="100px" width={60} height={60} className="absolute top-9 -left-20" src={userImage2} alt="" />
          <Image
            sizes="100px"
            width={60}
            height={60}
            className="absolute right-full bottom-[100px] mr-40"
            src={userImage3}
            alt=""
          />
          <Image
            sizes="100px"
            width={60}
            height={60}
            className="absolute top-full left-[140px]"
            src={userImage4}
            alt=""
          />
          <Image
            sizes="100px"
            width={60}
            height={60}
            className="absolute right-[140px] -bottom-10"
            src={userImage5}
            alt=""
          />
          <Image
            sizes="100px"
            width={60}
            height={60}
            className="absolute bottom-[80px] left-full ml-32"
            src={userImage6}
            alt=""
          />
          <Image sizes="100px" width={60} height={60} className="absolute top-10 -right-10" src={userImage7} alt="" />
        </div>

        {/* MAIN USER IMAGE */}
        <Image className="mx-auto" src={userImage1} width={125} height={120} alt="" />

        {/* SLIDER */}
        <div className="relative mt-12 lg:mt-16">
          <Image
            className="absolute top-1 right-full -mr-16 opacity-50 md:opacity-100 lg:mr-3"
            src={qlImage}
            width={50}
            height={44}
            alt=""
          />
          <Image
            className="absolute top-1 left-full -ml-16 opacity-50 md:opacity-100 lg:ml-3"
            src={qrImage}
            width={50}
            height={44}
            alt=""
          />
          <div className={'embla'} ref={emblaRef}>
            <ul className="embla__container">
              {DEMO_DATA.map((item) => (
                <li key={item.id} className="flex embla__slide basis-full flex-col items-center text-center">
                  <span className="block text-2xl">{item.content}</span>
                  <span className="mt-8 block text-2xl font-semibold">{item.clientName}</span>
                  <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.403 12.652a3 3 0 010-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                    Verified Buyer
                  </span>
                  <div className="mt-3.5 flex items-center space-x-0.5 text-yellow-500">
                    <StarIcon className="h-6 w-6" />
                    <StarIcon className="h-6 w-6" />
                    <StarIcon className="h-6 w-6" />
                    <StarIcon className="h-6 w-6" />
                    <StarIcon className="h-6 w-6" />
                  </div>
                </li>
              ))}
            </ul>

            <div className="embla__dots flex items-center justify-center pt-10">
              {scrollSnaps.map((_, index) => (
                <button
                  type="button"
                  key={index}
                  onClick={() => onDotButtonClick(index)}
                  className={clsx(
                    index === selectedIndex ? 'bg-neutral-700' : 'bg-neutral-300',
                    'mx-1 size-2 rounded-full focus:outline-none'
                  )}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SectionClientSay
