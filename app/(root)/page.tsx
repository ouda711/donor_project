import CategoryFilter from '@/components/shared/CategoryFilter';
import Collection from '@/components/shared/Collection'
import Search from '@/components/shared/Search';
import { Button } from '@/components/ui/button'
import { getAllEvents } from '@/lib/actions/event.actions';
import { SearchParamProps } from '@/types';
import Image from 'next/image'
import Link from 'next/link'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { Card, CardContent } from "@/components/ui/card"

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || '';
  const category = (searchParams?.category as string) || '';

  const events = await getAllEvents({
    query: searchText,
    category,
    page,
    limit: 6
  })

  const donors = [
    {
      name: 'USAID',
      image: '/assets/donor-logos/usaid.svg'
    },
    {
      name: 'UNICEF',
      image: '/assets/donor-logos/unicef.svg'
    },
    {
      name: 'GIZ',
      image: '/assets/donor-logos/giz.gif'
    },
    {
      name: 'ESTDEV',
      image: '/assets/donor-logos/EstDev.png'
    },
    {
      name: 'UNDP',
      image: '/assets/donor-logos/undp.png'
    },
    {
      name: 'EU Commission',
      image: '/assets/donor-logos/eu.png'
    },
  ]

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">Host, Connect, Track: Your Projects, Our Platform!</h1>
            <p className="p-regular-20 md:p-regular-24">Get to post projects and display them for visibility.</p>
            <Button size="lg" asChild className="button w-full sm:w-fit">
              <Link href="#events">
                Explore Now
              </Link>
            </Button>
          </div>

          <Image 
            src="/assets/images/banner-rep.jpg"
            alt="hero"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
          />
        </div>
      </section> 

      <section id='donors' className='wrapper my-8 md:gap-12 w-full'>
        <h2 className='h2-bold'>Donors</h2>

        <Carousel 
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {donors.map((item, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/6">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                    <Image
                      src={item.image}
                      width={500}
                      height={500}
                      alt="Picture of the author"
                    />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      <section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Featured Projects</h2>

        <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search />
          <CategoryFilter />
        </div>

        <Collection 
          data={events?.data}
          emptyTitle="No Projects Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={6}
          page={page}
          totalPages={events?.totalPages}
        />
      </section>
    </>
  )
}
