import { useState } from 'react'
import H1 from "../../components/ui/H1"
import LabelTrait from "../../components/ui/LabelTrait"
import EventCard from "../../components/ui/EventCard"
import Pagination from "../../components/ui/Pagination"
import ImgTest from "../../images/testImg.jpg"
import ButtonVoid from '../../components/ui/ButtonVoid'
import { LogIn } from 'lucide-react'

// Données de démonstration en attendant le branchement à l'API actualités
const allEvents = Array.from({ length: 241 }, (_, i) => ({
  Img: ImgTest,
  Day: String((i % 28) + 1).padStart(2, "0"),
  Month: ["JANV", "FEV", "MAR", "AVR"][i % 4],
  Type: i % 3 === 0 ? "ACTUS" : "EVENT",
  Title: `Actualité JCI Madagascar #${i + 1}`,
  Content: "Découvrez toutes les actualités autour de la JCI et les événements à venir.",
}))

const PAGE_SIZE = 12
const TOTAL_PAGES = allEvents.length % PAGE_SIZE === 0 ? Math.floor(allEvents.length / PAGE_SIZE) : Math.floor(allEvents.length / PAGE_SIZE) + 1 || 1

const BlogPage = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const events = allEvents.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  return (
    <div className='flex flex-col w-full min-h-screen bg-jci-black'>
      
      {/* Actualités & évènements */}
      <section className='relative bg-jci-blue px-6 md:px-8 lg:px-1 py-10 lg:py-0 flex flex-col items-center gap-10 lg:pl-100  '>
        {/*Fonds blanc */}
        <div className='flex flex-col items-start justify-between py-15 px-6 lg:pl-7 lg:pr-0 gap-4 lg:gap-1 text-left lg:text-center bg-jci-white  w-full h-auto lg:h-[205vh] -mr-2'>          
          <div className="flex flex-col items-start">
            <div className='flex flex-row items-center -mb-1'>
              <p className='text-jci-blue text-[8px] font-bold font-noto'>ACTUALITÉS & ÉVÉNEMENTS</p>
              <div className='ml-2 h-[0.5px] w-10  bg-jci-yellow'> </div>
            </div>
            <H1 TextSize="text-2xl">RESTEZ CONNECTÉ</H1>
            <p className='text-[12px] mt-0 font-poppins font-medium  text-jci-black/80'>Découvrez toutes les actualités autour de la JCI et les évènements à venir.</p>
          </div>
          <div className='flex justify-center w-full '>
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={TOTAL_PAGES}
            />
          </div>
        </div>
        {/* Fin du fonds blanc */}
        {/* Contenu principal des actualités & événements */}
        <div className='relative lg:absolute lg:top-35 lg:left-70 flex flex-col lg:flex-row w-full lg:w-auto lg:px-0  '>
          <div name="text" className='hidden lg:block relative h-[400px] w-[60px] -ml-10 mr-5'>
            <p className='absolute top-130 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap text-[90px] font-bold text-jci-black/10 font-noto select-none'>
              Actualités & événements
            </p>
            <p className='absolute top-1/2 left-15 -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap text-[25px] font-bold text-jci-white font-noto'>
              Actualités & événements
            </p>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-6 w-fit self-center lg:w-full max-w-6xl'>
            {events.map((event) => (
              <EventCard key={event.Title} Img={ImgTest} {...event} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default BlogPage
