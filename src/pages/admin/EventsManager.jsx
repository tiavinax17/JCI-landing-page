import { useForm } from 'react-hook-form';
import { useEffect,useState } from 'react';
import { eventAPI } from '../../services/api';
import { IoClose, IoAdd, IoImages } from "react-icons/io5";
import { LuExternalLink } from "react-icons/lu";
import { toast } from "sonner";
import Pagination from "../../components/ui/Pagination"


const EventsManager = () => {
  const [isPending, setIsPending] = useState(false);
  const [events, setEvents] = useState([]);
  const [isEventOpen, setIsEventOpen] = useState(false);
  const [eventId, setEventId] = useState(null);
  const [isEventDeleteOpen, setIsEventDeleteOpen] = useState(false);
  const [deleteEventId, setDeleteEventId] = useState(null);
  const [eventSearch, setEventSearch] = useState("");
  const eventForm = useForm();
  const eventImage = eventForm.watch("image");
  const [pendingAction, setPendingAction] = useState(null);
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");

  const [currentPage, setCurrentPage] = useState(1)



  //======Event (Image Service Details) Modals======
  const openAddEventModal = () => {
    setEventId(null);

    eventForm.reset({
      title: "",
      type: "",
      content: "",
      date: "",
      image: null
    });

    setIsEventOpen(true);
  };

  const openEditEventModal = (event) => {
    setEventId(event.id);

    eventForm.reset({
      title: event.title,
      type: event.type,
      content: event.content,
      date: event.date
        ? new Date(event.date).toISOString().split("T")[0]
        : "",
      image: null
    });

    setIsEventOpen(true);
  };

  const openDeleteEventModal = (id) => {
    setDeleteEventId(id);
    setIsEventDeleteOpen(true);
  };


  useEffect(() => {
    const fetchEvents = async () => {

      try {
        const response = await eventAPI.getAllByNational();
        setEvents(response.data);
        console.log("Fetched OL events:", response.data);
      } catch (error) {
        console.error("Error fetching OL events:", error);
      }
    };

  fetchEvents();
}, []);

  const handleEventSubmit = async (data) => {
    setIsEventOpen(false);
    setIsPending(true);
    setPendingAction("submit");

    try {
      const formData = new FormData();

      if (data.image?.[0]) {
        formData.append("picture", data.image[0]);
      }

      formData.append("title", data.title);
      formData.append("type", data.type);
      formData.append("content", data.content);
      formData.append("date", data.date);

      if (eventId) {
        const res = await eventAPI.update(eventId, formData);
        toast.success(res.data.message);
      } else {  
        const res = await eventAPI.createNational(formData);
        toast.success(res.data.message);
      }

      const response = await eventAPI.getAllByNational();
      setEvents(response.data);

      eventForm.reset();
      setEventId(null);
    } catch (error) {
      console.error(
        eventId
          ? "Error updating OL event:"
          : "Error creating OL event:",
        error
      );
      toast.error(error.response?.data?.message || "Une erreur est survenue");
    } finally {
      setIsPending(false);
    }
  };
  const handleDeleteEvent = async () => {
    setIsEventDeleteOpen(false);
    setPendingAction("delete");
    setIsPending(true);

    try {
      await eventAPI.delete(deleteEventId);
      toast.success("Événement supprimé avec succès !");

      const response = await eventAPI.getAllByNational();
      setEvents(response.data);

      setDeleteEventId(null);
    } catch (error) {
      console.error("Error deleting OL event:", error);
      toast.error(error.response?.data?.message || "Une erreur est survenue");
    } finally {
      setIsPending(false);
    }
  };
    
  const filteredEvents = events.filter((event) => {
    const searchValue = eventSearch.toLowerCase();

    const matchesSearch =
      event.title?.toLowerCase().includes(searchValue) ||
      event.type?.toLowerCase().includes(searchValue) ||
      event.content?.toLowerCase().includes(searchValue);

    const eventDate = new Date(event.date);

    const matchesStartDate =
      !eventStartDate ||
      eventDate >= new Date(`${eventStartDate}T00:00:00`);

    const matchesEndDate =
      !eventEndDate ||
      eventDate <= new Date(`${eventEndDate}T23:59:59`);

    return matchesSearch && matchesStartDate && matchesEndDate;
  });
  const PAGE_SIZE = 12
  const TOTAL_PAGES = filteredEvents.length % PAGE_SIZE === 0 ? Math.floor(filteredEvents.length / PAGE_SIZE) : Math.floor(filteredEvents.length / PAGE_SIZE) + 1 || 1
  const eventsPagination = filteredEvents.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
  return (
    <div className='relative p-5 flex flex-col items-start bg-gray-100 w-full min-h-screen md:pt-0 pt-20'>
      
      <div className="w-full p-5 flex flex-col gap-5">
      
        <div className="flex flex-col items-start gap-5 justify-between">

          <div>
            <h2 className="text-4xl font-bold text-jci-black">
              Événements National
            </h2>

            <p className="text-sm text-jci-black/50">
              Gérez les événements national
            </p>
          </div>

          <button
            type="button"
            onClick={openAddEventModal}
            className='px-5 py-2.5 bg-blue-100 rounded-lg text-blue-500 font-semibold text-sm  hover:bg-jci-white border border-blue-100 cursor-pointer transition-colors duration-300 flex items-center gap-2'
          >
            <IoAdd size={16} />
            Ajouter un événement
          </button>

        </div>

        {/* Recherche */}
        <div className="w-full flex flex-col md:flex-row gap-3 items-center">
          <input
            type="text"
            placeholder="Rechercher par titre, type ou contenu..."
            value={eventSearch}
            onChange={(e) => setEventSearch(e.target.value)}
            className="w-full flex-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-jci-yellow focus:border-jci-yellow"
          />
          <p className="text-sm text-jci-black/50">Du</p>
          <input
            type="date"
            value={eventStartDate}
            max={eventEndDate}
            onChange={(e) => setEventStartDate(e.target.value)}
            className="w-full  flex-1 md:w-auto px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-jci-yellow focus:border-jci-yellow"
          />
            <p className="text-sm text-jci-black/50">Au</p>
          <input
            type="date"
            value={eventEndDate}
            min={eventStartDate}
            onChange={(e) => setEventEndDate(e.target.value)}
            className="w-full flex-1 md:w-auto px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-jci-yellow focus:border-jci-yellow"
          />
          </div>
              
        {/* Cards */}
        {eventsPagination.length > 0 ? (

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-1 ">

            {eventsPagination.map((event) => {
                const date = new Date(event.date);
                const day = date.getDate();
                const month = date.toLocaleString('default', { month: 'short' });
                const year = date.getFullYear();
                return (
                <div
                  key={event.id}
                  className="w-full max-w-[278px] aspect-[278/376] mx-auto bg-jci-white border-black/5 border rounded shadow-[0_4px_10px_rgba(0,0,0,0.2)] p-2.5 lg:p-3 transition-all duration-300">
  
                  <div className="border rounded-xs border-black/5 w-full h-full flex flex-col overflow-hidden ">

                    {/* Image */}
                    <div className="relative w-full aspect-[278/222] shrink-0 overflow-hidden">
                      <img
                        src={`${import.meta.env.VITE_BACKEND_APP_API_URL_IMAGE}${event.imgUrl}`}
                        alt={event.Title}
                        className="w-full h-full object-cover"
                      />

                      {/* Date */}
                      <div className="bg-jci-blue text-white px-1.5 py-1 md:px-2 font-roboto font-bold flex flex-col justify-center items-center absolute top-0 right-2">
                        <h1 className="text-[18px] md:text-[22px]">{day}</h1>
                        <h2 className="text-[10px] md:text-[11px] -mt-2 uppercase">{month}</h2>
                          <h3 className="text-[10px] md:text-[11px]     uppercase">{year}</h3>
                      </div>

                      {/* Type */}
                      <div className="uppercase px-3 md:px-4 py-0.5 bg-jci-yellow text-[7px] md:text-[10px] text-jci-black font-extrabold font-roboto text-center absolute bottom-0.5 left-0">
                        {event.type}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 min-h-0 bg-jci-white p-1 md:p-3 font-poppins text-[#313131]">
                      <h1 className="text-[12px] md:text-[14px] font-bold text-lg font-bold text-jci-black line-clamp-2 ">
                        {event.title}
                      </h1>

                      <p className="text-[8px] md:text-[9px] font-normal text-justify  line-clamp-8">
                        {event.content}
                      </p>
                    </div>

                  </div>
                        {/* Actions */}
                  <div className="flex items-center justify-between gap-2 ">

                    

                    <button
                      type="button"
                      onClick={() => openEditEventModal(event)}
                      className='px-3 py-1.5 bg-blue-100 rounded-lg text-blue-500 font-semibold text-[12px]  hover:bg-jci-white hover:border-blue-100 border border-transparent cursor-pointer transition-colors duration-300'
                    >
                      Modifier
                    </button>

                    <button
                      type="button"
                      onClick={() => openDeleteEventModal(event.id)}
                      className='px-3 py-1.5 bg-red-100 rounded-lg text-red-500 font-semibold text-[12px]  hover:bg-jci-white hover:border-red-100 border border-transparent cursor-pointer transition-colors duration-300'
                    >
                      Supprimer
                    </button>

                    <button
                      className=' flex flex-row iterms-center gap-2 px-3 py-1.5  rounded-lg text-jci-black font-semibold text-[12px] hover:text-jci-black hover:bg-jci-white hover:border-gray-600 border border-transparent cursor-pointer transition-colors duration-300'
                      onClick={() => window.location.href = `/admin/evenements/national/${event.id}`}
                    >
                    Voir  <LuExternalLink size={16}/>
          
                    </button>

                  </div>
                </div>

              )  }
              )}

          </div>

        ) : (

          <div className="w-full py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300 flex flex-col items-center justify-center gap-3">

            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
              <IoAdd size={24} className="text-gray-400" />
            </div>

            <p className="text-sm text-jci-black/50">
              Aucun événement national
            </p>

            <button
              type="button"
              onClick={openAddEventModal}
              className="text-sm font-semibold text-jci-teal hover:underline cursor-pointer"
            >
              Ajouter un événement
            </button>

          </div>

        )}

      </div>
      <div className='flex justify-center w-full mt-5'>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={TOTAL_PAGES}
        />
      </div>
              {/* Loading indicator */}
      {isPending && (
        <div className='absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/60 backdrop-blur-sm z-10'>
          <div className='w-8 h-8 border-4 border-jci-yellow border-t-transparent rounded-full animate-spin' />
          <span className='text-sm font-medium text-jci-black/60'>
            {pendingAction === 'delete'
              ? 'Suppression en cours...'
              : 'Chargement en cours...'}
          </span>
        </div>
      )}
      {isEventOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-jci-black/30 bg-opacity-50 flex items-center justify-center z-20"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsEventOpen(false);
            }
          }}
        >
  
          <div className="relative bg-white p-6 rounded-xl shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
  
            <div className="relative flex items-center justify-center mb-6">
  
              <h2 className="text-jci-black font-bold text-lg">
                {eventId
                  ? "Modifier un événement"
                  : "Ajouter un événement"}
              </h2>
  
              <button
                type="button"
                className="absolute right-1 rounded-full p-1.5 text-jci-black/60 hover:text-jci-black hover:bg-jci-white cursor-pointer transition-colors duration-300"
                onClick={() => setIsEventOpen(false)}
              >
                <IoClose size={18} />
              </button>
  
            </div>
  
            <form
              onSubmit={eventForm.handleSubmit(handleEventSubmit)}
              className="flex flex-col gap-4"
            >
  
              {/* Image */}
              <div className="flex flex-col gap-1.5">
  
                <label
                  htmlFor="eventImage"
                  className="text-[13px] font-medium text-jci-black/80"
                >
                  Image de l'événement
                </label>
  
                <label
                  htmlFor="eventImage"
                  className={`flex flex-col items-center justify-center px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer text-sm font-poppins text-gray-800 ${
                    eventImage
                      ? "border-green-500"
                      : "hover:border-jci-yellow"
                  }`}
                >
                  <IoImages
                    size={30}
                    className="mb-2 text-gray-400"
                  />
                  {eventImage
                    ? eventImage[0].name
                    : "Choisir une image"}
                  {eventImage?.[0] && (
                    <span className="text-[11px] text-gray-400">
                      {(eventImage?.[0]?.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  )}
                </label>
  
                <input
                  id="eventImage"
                  type="file"
                  accept="image/*"
                  {...eventForm.register("image", {
                    required: eventId
                      ? false
                      : "L'image est obligatoire"
                      , validate: {
                        validType: (files) => {
                        const file = files?.[0];
  
                        if (!file) return true;
  
                        return (
                            ["image/jpeg", "image/png", "image/webp"].includes(file.type) ||
                            "Formats acceptés : JPG, PNG ou WebP."
                        );
                        },
  
                        validSize: (files) => {
                        const file = files?.[0];
  
                        if (!file) return true;
  
                        return (
                            file.size <= 5 * 1024 * 1024 ||
                            "L'image ne doit pas dépasser 5 Mo."
                        );
                        },
                    },
                  })}
                  className="hidden"
                />
  
                {eventForm.formState.errors.image && (
                  <span className="text-red-500 text-sm">
                    {eventForm.formState.errors.image.message}
                  </span>
                )}
  
              </div>
  
              {/* Titre */}
              <div className="flex flex-col gap-1.5">
  
                <label
                  htmlFor="eventTitle"
                  className="text-[13px] font-medium text-jci-black/80"
                >
                  Titre
                </label>
  
                <input
                  id="eventTitle"
                  type="text"
                  placeholder="Titre de l'événement"
                  {...eventForm.register("title", {
                    required: "Le titre est obligatoire",
                    minLength: {
                      value: 3,
                      message: "Le titre doit contenir au moins 3 caractères",
                    },
                  })}
                  className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jci-yellow focus:border-jci-yellow"
                />
  
                {eventForm.formState.errors.title && (
                  <span className="text-red-500 text-sm">
                    {eventForm.formState.errors.title.message}
                  </span>
                )}
  
              </div>
  
              {/* Type */}
              <div className="flex flex-col gap-1.5">
  
                <label
                  htmlFor="eventType"
                  className="text-[13px] font-medium text-jci-black/80"
                >
                  Type
                </label>
  
                <select
                  id="eventType"
                  {...eventForm.register("type", {
                    required: "Le type est obligatoire",
                  })}
                  className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jci-yellow focus:border-jci-yellow"
                >
                  <option value="">Sélectionner un type</option>
                  <option value="EVENT">Événement</option>
                  <option value="ACTU">Actualité</option>
                  <option value="PROJET">Projet réalisé</option>
                </select>
  
                {eventForm.formState.errors.type && (
                  <span className="text-red-500 text-sm">
                    {eventForm.formState.errors.type.message}
                  </span>
                )}
  
              </div>
  
              {/* Date */}
              <div className="flex flex-col gap-1.5">
  
                <label
                  htmlFor="eventDate"
                  className="text-[13px] font-medium text-jci-black/80"
                >
                  Date
                </label>
  
                <input
                  id="eventDate"
                  type="date"
                  {...eventForm.register("date", {
                    required: "La date est obligatoire"
                  })}
                  className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jci-yellow focus:border-jci-yellow"
                />
  
                {eventForm.formState.errors.date && (
                  <span className="text-red-500 text-sm">
                    {eventForm.formState.errors.date.message}
                  </span>
                )}
  
              </div>
  
              {/* Contenu */}
              <div className="flex flex-col gap-1.5">
  
                <label
                  htmlFor="eventContent"
                  className="text-[13px] font-medium text-jci-black/80"
                >
                  Contenu
                </label>
  
                <textarea
                  id="eventContent"
                  rows={7}
                  placeholder="Décrivez l'événement..."
                  {...eventForm.register("content", {
                    required: "Le contenu est obligatoire",
                      minLength: {
                        value: 5,
                        message: "La citation doit contenir au moins 5 caractères",
                      },
                      maxLength: {
                        value: 500,
                        message: "La citation ne doit pas dépasser 500 caractères",
                      },
                    })}
                  className="px-4 py-3 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-jci-yellow focus:border-jci-yellow"
                />
  
                {eventForm.formState.errors.content && (
                  <span className="text-red-500 text-sm">
                    {eventForm.formState.errors.content.message}
                  </span>
                )}
  
              </div>
  
              <button
                type="submit"
                disabled={isPending}
                className="mt-2 px-5 py-3 bg-jci-yellow rounded-lg text-jci-white font-semibold text-sm hover:text-jci-black hover:bg-jci-white border border-jci-yellow cursor-pointer transition-colors duration-300 disabled:opacity-50"
              >
                {isPending
                  ? eventId
                    ? "Modification en cours..."
                    : "Ajout en cours..."
                  : eventId
                    ? "Modifier"
                    : "Ajouter"}
              </button>
  
            </form>
  
          </div>
  
        </div>
      )}
      {isEventDeleteOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-jci-black/30 flex items-center justify-center z-30"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsEventDeleteOpen(false);
              setDeleteEventId(null);
            }
          }}
        >
  
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
  
            <h2 className="text-jci-black font-bold text-lg mb-3">
              Confirmer la suppression
            </h2>
  
            <p className="text-sm text-jci-black/60 mb-6">
              Êtes-vous sûr de vouloir supprimer cet événement ?
            </p>
  
            <div className="flex justify-end gap-3">
  
              <button
                type="button"
                onClick={() => {
                  setIsEventDeleteOpen(false);
                  setDeleteEventId(null);
                }}
                className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-jci-black hover:bg-gray-100 cursor-pointer"
              >
                Annuler
              </button>
  
              <button
                type="button"
                onClick={handleDeleteEvent}
                disabled={isPending}
                className="px-4 py-2 rounded-lg bg-jci-red text-jci-black text-sm font-semibold border border-jci-red cursor-pointer hover:bg-red-600 hover:text-jci-white disabled:opacity-50"
              >
                Supprimer
              </button>
  
            </div>
  
          </div>
  
        </div>
      )}
    </div>
  )
}

export default EventsManager