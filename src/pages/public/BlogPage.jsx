import { useState, useEffect } from 'react'
import H1 from "../../components/ui/H1"
import EventCard from "../../components/ui/EventCard"
import Pagination from "../../components/ui/Pagination"
import { eventAPI } from "../../services/api"

const BlogPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [eventList, setEventList] = useState([])

  const [dateFilter, setDateFilter] = useState("tous")
  const [typeFilter, setTypeFilter] = useState("tous")

  const PAGE_SIZE = 12

  // Aujourd'hui à 00:00
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Filtres
  const filteredEvents = eventList.filter((event) => {
    const eventDate = new Date(event.date)

    const matchesDate =
      dateFilter === "tous" ||
      (dateFilter === "a-venir" && eventDate >= today)

    const matchesType =
      typeFilter === "tous" ||
      event.type?.toUpperCase() === typeFilter

    return matchesDate && matchesType
  })

  const TOTAL_PAGES =
    Math.ceil(filteredEvents.length / PAGE_SIZE) || 1

  const events = filteredEvents.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  )

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await eventAPI.getAll()
        setEventList(res.data)
      } catch (error) {
        console.error("Failed to fetch events:", error)
      }
    }

    fetchEvents()
  }, [])

  // Revenir à la première page lorsqu'un filtre change
  useEffect(() => {
    setCurrentPage(1)
  }, [dateFilter, typeFilter])

  return (
    <div className='flex flex-col w-full min-h-screen bg-jci-black'>

      {/* Actualités & évènements */}
      <section className='relative bg-jci-blue px-6 md:px-8 lg:px-1 py-10 lg:py-0 flex flex-col items-center md:gap-10 lg:pl-100'>

        {/* Fond blanc */}
        <div className='flex flex-col items-start justify-between py-15 px-6 lg:pl-7 lg:pr-0 gap-4 lg:gap-1 text-left lg:text-center bg-jci-white w-full h-auto lg:h-[200vh] md:-mr-2'>

          <div className="flex flex-col items-start">

            <div className='flex flex-row items-center -mb-1'>
              <p className='text-jci-blue text-[8px] font-bold font-noto'>
                ACTUALITÉS & ÉVÉNEMENTS
              </p>

              <div className='ml-2 h-[0.5px] w-10 bg-jci-yellow'></div>
            </div>

            <H1 TextSize="text-2xl">
              RESTEZ CONNECTÉ
            </H1>

            <p className='text-[12px] mt-0 font-poppins font-medium text-jci-black/80'>
              Découvrez toutes les actualités autour de la JCI et les évènements à venir.
            </p>
          {/* FILTRES */}
          <div className='flex flex-row gap-3 w-full items-start mt-3 '>

            {/* Filtre date */}
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className='border border-jci-black/20 px-4 py-2 text-[11px] font-poppins font-medium bg-jci-white outline-none'
            >
              <option value="tous">
                Toutes les dates
              </option>

              <option value="a-venir">
                À venir
              </option>
            </select>

            {/* Filtre type */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className='border border-jci-black/20 px-4 py-2 text-[11px] font-poppins font-medium bg-jci-white outline-none'
            >
              <option value="tous">
                Tous les types
              </option>

              <option value="ACTU">
                Actualité
              </option>

              <option value="EVENT">
                Événement
              </option>

              <option value="PROJET">
                Projet réalisé
              </option>
            </select>

          </div>

          </div>


          {/* Pagination */}
          <div className='flex justify-center w-full'>
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={TOTAL_PAGES}
            />
          </div>

        </div>

        {/* Contenu principal */}
        <div className='relative lg:absolute lg:top-35 lg:left-70 flex flex-col md:pb-0 pb-10 lg:flex-row w-full lg:w-auto lg:px-0 md:mt-10 md:bg-transparent bg-jci-white'>

          <div
            name="text"
            className='hidden lg:block relative h-[400px] w-[60px] -ml-10 mr-5'
          >
            <p className='absolute top-130 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap text-[90px] font-bold text-jci-black/10 font-noto select-none'>
              Actualités & événements
            </p>

            <p className='absolute top-1/2 left-15 -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap text-[25px] font-bold text-jci-white font-noto'>
              Actualités & événements
            </p>
          </div>

          {/* DESKTOP */}
          <div className='hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-6 w-fit self-center lg:w-full max-w-6xl grid-cols-1'>

            {events.map((event) => {
              const date = new Date(event.date)

              const day = date.getDate()
              const month = date.toLocaleString('default', {
                month: 'short'
              })
              const year = date.getFullYear()

              return (
                <EventCard
                  key={event.id}
                  Img={`${import.meta.env.VITE_BACKEND_APP_API_URL_IMAGE}${event.imgUrl}`}
                  Title={event.title}
                  Content={event.content}
                  Day={day}
                  Month={month}
                  Type={event.type}
                  Year={year}
                  Id={event.id}
                />
              )
            })}

          </div>

          {/* MOBILE */}
          <div className='sm:hidden flex flex-row overflow-x-scroll snap-x snap-mandatory self-center lg:w-full max-w-6xl w-[90%]'>

            {events.map((event) => {
              const date = new Date(event.date)

              const day = date.getDate()
              const month = date.toLocaleString('default', {
                month: 'short'
              })
              const year = date.getFullYear()

              return (
                <div
                  key={event.id}
                  className='snap-center shrink-0 w-full flex justify-center'
                >
                  <EventCard
                    Img={`${import.meta.env.VITE_BACKEND_APP_API_URL_IMAGE}${event.imgUrl}`}
                    Title={event.title}
                    Content={event.content}
                    Day={day}
                    Month={month}
                    Type={event.type}
                    Year={year}
                    Id={event.id}
                  />
                </div>
              )
            })}

          </div>

        </div>

      </section>
    </div>
  )
}

export default BlogPage