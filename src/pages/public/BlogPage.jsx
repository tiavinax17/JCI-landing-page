import { useState } from 'react'
import H1 from "../../components/ui/H1"
import LabelTrait from "../../components/ui/LabelTrait"
import EventCard from "../../components/ui/EventCard"
import Pagination from "../../components/ui/Pagination"
import ImgTest from "../../images/testImg.jpg"

// Données de démonstration en attendant le branchement à l'API actualités
const allEvents = Array.from({ length: 12 }, (_, i) => ({
  Img: ImgTest,
  Day: String((i % 28) + 1).padStart(2, "0"),
  Month: ["JANV", "FEV", "MAR", "AVR"][i % 4],
  Type: i % 3 === 0 ? "ACTUS" : "EVENT",
  Title: `Actualité JCI Madagascar #${i + 1}`,
  Content: "Découvrez toutes les actualités autour de la JCI et les événements à venir.",
}))

const PAGE_SIZE = 4
const TOTAL_PAGES = Math.ceil(allEvents.length / PAGE_SIZE) || 1

const BlogPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const events = allEvents.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  return (
    <div className='min-h-screen font-poppins flex flex-col items-center pt-28 pb-10 px-6 lg:px-32'>
      <div className='flex flex-col gap-4 items-center text-center max-w-3xl mt-8'>
        <LabelTrait>restez connecté</LabelTrait>
        <H1>actualités & événements</H1>
        <p className='text-[14px] font-normal text-jci-black/80'>
          Découvrez toutes les actualités autour de la JCI et les événements à venir.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14'>
        {events.map((event, index) => (
          <EventCard key={index} {...event} />
        ))}
      </div>

      <div className='mt-12'>
        <Pagination CurrentPage={currentPage} TotalPages={TOTAL_PAGES} onPageChange={setCurrentPage} />
      </div>
    </div>
  )
}

export default BlogPage
