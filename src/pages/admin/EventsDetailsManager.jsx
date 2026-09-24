import React, { useEffect } from 'react'
import { useParams } from 'react-router';
import { useState } from 'react';
import { eventAPI, eventFileAPI, eventImageAPI } from '../../services/api';
import { useForm } from 'react-hook-form';
import { IoClose, IoAdd, IoDocumentText ,IoImages } from "react-icons/io5";
import { FaRegTrashCan } from "react-icons/fa6";
import { NavLink } from 'react-router';
import { MdArrowForwardIos } from "react-icons/md";
import { toast } from "sonner";

const EventsDetailsManager = () => {
    const {olId, zone, eventId} = useParams();   
    const [eventDetails, setEventDetails] = useState(null);

    const date = eventDetails ? new Date(eventDetails.date) : null;
    const day = date ? date.getDate() : '';
    const month = date ? date.toLocaleString('default', { month: 'short' }) : '';
    const year = date ? date.getFullYear() : '';
    const eventForm = useForm();
    const eventImage = eventForm.watch("image");
    const [isEventOpen, setIsEventOpen] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [pendingAction, setPendingAction] = useState('');
    /**EVENT STATE */
    const [eventFiles, setEventFiles] = useState([]);
    const [isFileOpen, setIsFileOpen] = useState(false);
    const [isFileDeleteOpen, setIsFileDeleteOpen] = useState(false);
    const [deleteFileId, setDeleteFileId] = useState(null);
    const fileForm = useForm();
    const eventFile = fileForm.watch("file");
    /** EVENT IMAGES STATE */
    const [eventImages, setEventImages] = useState([]);
    const [isImageOpen, setIsImageOpen] = useState(false);
    const [isImageDeleteOpen, setIsImageDeleteOpen] = useState(false);
    const [deleteImageId, setDeleteImageId] = useState(null);
    const imageForm = useForm();
    const eventImageDetails = imageForm.watch("image");    
    

    useEffect(() => {
        // Fetch event details by eventId here
        const fetchEventDetails = async () => {
            try {
                const response = await eventAPI.getById(eventId);
                setEventDetails(response.data);
            } catch (error) {
                console.error("Error fetching event details:", error);
            }
        };
        fetchEventDetails();
    }, [eventId]);

    /** FETCH EVENT FILES */
    useEffect(() => {
    const fetchEventFiles = async () => {
        if (!eventId) return;

            try {
            const response = await eventFileAPI.getById(eventId);
            setEventFiles(response.data);
            } catch (error) {
            console.error("Error fetching event files:", error);
            }
        };
        const fetchEventImages = async () => {
        try {
            const response = await eventImageAPI.getAllById(eventId);
            setEventImages(response.data);
        } catch (error) {
            console.error(error);
        }
        };

        fetchEventFiles();
        fetchEventImages(); 
        }, [eventId]);
        /**Fetch event images */
        

    const openEditEventModal = (event) => {
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

    const openAddFileModal = () => {
    fileForm.reset({
        file: null
    });

    setIsFileOpen(true);
    };
    const openAddImageModal = () => {
        imageForm.reset({
            image: null
        });

        setIsImageOpen(true);
    };

    const openDeleteFileModal = (id) => {
    setDeleteFileId(id);
    setIsFileDeleteOpen(true);
    };

  const handleEventSubmit = async (data) => {
    setIsEventOpen(false);
    setPendingAction('submit');
    setIsPending(true);

    try {
      const formData = new FormData();

      if (data.image?.[0]) {
        formData.append("picture", data.image[0]);
      }

      formData.append("title", data.title);
      formData.append("type", data.type);
      formData.append("content", data.content);
      formData.append("date", data.date);
      if(zone || olId){
        formData.append("organisationLocalId", olId);
      }
      const res = await eventAPI.update(eventId, formData);
      toast.success(res.data.message);
      const response = await eventAPI.getById(eventId);
      setEventDetails(response.data);
      eventForm.reset();
 
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

  /** Handle event form submission */
  const handleFileSubmit = async (data) => {
    setIsFileOpen(false);
    setIsPending(true);
    setPendingAction("submit");

    try {
        const formData = new FormData();

        if (data.file?.[0]) {
        formData.append("file", data.file[0]);
        }

        formData.append("eventId", Number(eventId));

        const res = await eventFileAPI.create(formData);
        toast.success(res.data.message);

        const response = await eventFileAPI.getById(eventId);
        setEventFiles(response.data);

        fileForm.reset();
    } catch (error) {
        console.error("Error adding event file:", error);
        toast.error(error.response?.data?.message || "Une erreur est survenue");
    } finally {
        setIsPending(false);
    }
    };

 const handleDeleteFile = async () => {
    setIsFileDeleteOpen(false);
    setIsPending(true);
    setPendingAction("delete");

    try {
        await eventFileAPI.delete(deleteFileId);
        toast.success("Fichier de l'événement supprimé avec succès !");
        setEventFiles((prev) =>
        prev.filter((file) => file.id !== deleteFileId)
        );

        setDeleteFileId(null);
    } catch (error) {
        console.error("Error deleting event file:", error);
        toast.error(error.response?.data?.message || "Une erreur est survenue");
    } finally {
        setIsPending(false);
    }
    };
    /* Handle event image form submission */
    const handleImageSubmit = async (data) => {
        setIsImageOpen(false);
        setIsPending(true);
        setPendingAction("submit");

        try {
            const formData = new FormData();

            if (data.image?.[0]) {
                formData.append("picture", data.image[0]);
            }

            formData.append("eventId", Number(eventId));

            const res = await eventImageAPI.create(formData);
            toast.success(res.data.message);

            const response = await eventImageAPI.getAllById(eventId);
            setEventImages(response.data);

            imageForm.reset();
        } catch (error) {
            console.error("Error adding event image:", error);
            toast.error(error.response?.data?.message || "Une erreur est survenue");
        } finally {
            setIsPending(false);
        }
    };
    const handleDeleteImage = async () => {
        try {
            setIsPending(true);
            setPendingAction("delete");

            await eventImageAPI.deleteById(deleteImageId);
            toast.success("Image de l'événement supprimée avec succès !");

            setIsImageDeleteOpen(false);
            setDeleteImageId(null);

            const response = await eventImageAPI.getAllById(eventId);
            setEventImages(response.data);
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Une erreur est survenue");
        } finally {
            setIsPending(false);
            setPendingAction("");
        }
    };

  return (
    <div className='relative p-5 md:p-10 flex flex-col items-start bg-gray-100 w-full min-h-screen md:pt-0 pt-20'>
    {eventDetails && (
        <div className="md:w-[90%] w-full rounded-xl p-5 bg-white flex flex-col gap-20">         
        <div className='flex flex-col gap-3 bg-jci-white rounded'>
            <h1 className='text-4xl font-bold text-jci-black font-poppins'>Gestion de l'evenement {eventDetails?.title}</h1>
                {zone && (
                <div className='flex flex-wrap gap-2'>
                     <NavLink
                    to="/admin/zones"
                    className=' py-2  rounded-lg text-jci-black/50 font-semibold text-sm hover:underline hover:text-jci-yellow  cursor-pointer transition-colors duration-200 flex justify-center items-center'
                    >
                    Toutes les zones <MdArrowForwardIos size={16} />
                    </NavLink>
                    <NavLink
                    to={`/admin/zones/${zone}`}
                    className=' py-2  rounded-lg text-jci-black/50 gap-1 font-semibold text-sm hover:underline hover:text-jci-yellow cursor-pointer transition-colors duration-200 flex justify-center items-center'
                    >
                    Zone <span className="uppercase"> {zone} </span> <MdArrowForwardIos size={16} />
                    </NavLink>
                    <NavLink
                    to={`/admin/zones/${zone}/organisations-locale/${olId}`}
                    className=' py-2  rounded-lg text-jci-black/50 font-semibold text-sm hover:underline cursor-pointer transition-colors duration-300 flex justify-center items-center'
                    >
                    Organisation locale  <MdArrowForwardIos size={16} />
                    </NavLink>
                    <NavLink
                    
                    className=' py-2  rounded-lg text-jci-yellow font-semibold text-sm hover:underline cursor-pointer transition-colors duration-300 flex justify-center items-center'
                    >
                    Evenement {eventDetails?.title}  <MdArrowForwardIos size={16} />
                    </NavLink>

                </div>)}
                {(!zone && ! olId) && (
                    <div className='flex flex-row gap-2'>
                        <NavLink
                        to={`/admin/evenements/national`}
                        className=' py-2  rounded-lg text-jci-black/50 font-semibold text-sm hover:underline cursor-pointer transition-colors duration-300 flex justify-center items-center'
                        >
                        Tous les evenements national  <MdArrowForwardIos size={16} />
                        </NavLink>
                        <NavLink
                        
                        className=' py-2  rounded-lg text-jci-yellow font-semibold text-sm hover:underline cursor-pointer transition-colors duration-300 flex justify-center items-center'
                        >
                        Evenement {eventDetails?.title}  <MdArrowForwardIos size={16} />
                        </NavLink>
                    </div>
                )}
                {(!zone &&  olId) && (
                    <div className='flex flex-row gap-2'>
                        <NavLink
                        to={`/admin/local/mon-organisation-locale`}
                        className=' py-2  rounded-lg text-jci-black/50 font-semibold text-sm hover:underline cursor-pointer transition-colors duration-300 flex justify-center items-center'
                        >
                        Mon organisation locale <MdArrowForwardIos size={16} />
                        </NavLink>
                        <NavLink
                        
                        className=' py-2  rounded-lg text-jci-yellow font-semibold text-sm hover:underline cursor-pointer transition-colors duration-300 flex justify-center items-center'
                        >
                        Evenement {eventDetails?.title}  <MdArrowForwardIos size={16} />
                        </NavLink>
                    </div>
                )}

            <div
                    className="group flex flex-col gap-2 items-start w-full h-[56vh] p-5 bg-cover bg-center uppercase "
                    style={{
                        backgroundImage: `linear-gradient(to left, rgba(0, 0, 0, 0),rgba(0, 0, 0, 0),rgba(0, 0, 0, 0), #111111), url(${`${import.meta.env.VITE_BACKEND_APP_API_URL_IMAGE}${eventDetails?.imgUrl}`})`
                    }}
                >
                <p className='  p-1 bg-jci-yellow w-fit text-jci-black font-bold text-[15px] '>{eventDetails.type}</p>
                <p className=' bg-jci-blue text-white px-1.5 py-1 md:px-2 font-roboto font-bold flex flex-row justify-center items-center gap-1'>
                    <span className='text-[20px] font-bold'>{day}</span> {month} {year}
                </p>
                <h2 className=' text-2xl  font-poppins font-semibold text-white '>{eventDetails.title} </h2>
            </div>
            <div>
                <h1 className='text-jci-black font-bold font-poppins text-[20px]'>Description de l'evenement</h1>
                <p className='text-jci-black text-[14px] font-poppins'>{eventDetails.content}</p>
            </div>
            <div>
                <button
                    type="button"
                    className='px-5 py-2.5 bg-blue-100 rounded-lg text-blue-500 font-semibold text-sm  hover:bg-jci-white border border-blue-100 cursor-pointer transition-colors duration-300 flex items-center gap-2'
                    title="Modifier"
                    onClick={() => openEditEventModal(eventDetails)}
                  >
                      Modifier
                </button>
            </div>
        </div>   
        <div className="flex flex-col gap-5">

        <div className="flex items-center md:flex-row flex-col gap-5 justify-between">

            <div>
            <h1 className="text-jci-black font-bold font-poppins text-[20px]">
                Fichier de l'événement
            </h1>

            <p className="text-jci-black/50 text-[13px] font-poppins">
                Ajoutez un document associé à cet événement
            </p>
            </div>

            {eventFiles.length == 0 && (
              <button
            type="button"
            onClick={openAddFileModal}
            className='w-full md:justify-none justify-center md:w-fit px-5 py-2.5 bg-blue-100 rounded-lg text-blue-500 font-semibold text-sm  hover:bg-jci-white border border-blue-100 cursor-pointer transition-colors duration-300 flex items-center gap-2'
            >
            <IoAdd size={16} />
            Ajouter un fichier
            </button>
            )}
        </div>

        {eventFiles.length > 0 ? (

            <div className="flex flex-col gap-3">

            {eventFiles.map((file) => (

                <div
                key={file.id}
                className="flex items-center justify-between gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-sm transition-shadow duration-300"
                >

                <div className="flex items-center gap-3 min-w-0">

                    <div className="w-10 h-10 rounded-lg bg-jci-blue flex items-center justify-center shrink-0">
                    <IoDocumentText
                        size={20}
                        className="text-jci-white"
                    />
                    </div>

                    <div className="min-w-0">

                    <p className="text-sm font-semibold text-jci-black truncate">
                        {file.fileUrl.split("/").pop()}
                    </p>

                    {/* <p className="text-[11px] text-jci-black/40">
                        Ajouté le{" "}
                        {new Date(file.createdAt).toLocaleDateString("fr-FR")}
                    </p> */}

                    </div>

                </div>

                <div className="flex items-center gap-2 shrink-0">

                    <a
                    href={`${import.meta.env.VITE_BACKEND_APP_API_URL_IMAGE}${file.fileUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-jci-blue rounded-lg text-jci-black font-semibold text-[12px] hover:bg-jci-white border border-jci-blue cursor-pointer transition-colors duration-300"
                    >
                    Voir
                    </a>

                    <button
                    type="button"
                    onClick={() => openDeleteFileModal(file.id)}
                    className="p-2 rounded-lg bg-jci-red text-jci-black hover:bg-red-600 hover:text-jci-white cursor-pointer transition-colors duration-300"
                    title="Supprimer"
                    >
                    <FaRegTrashCan size={14} />
                    </button>

                </div>

                </div>

            ))}

            </div>

        ) : (

            <div className="w-full py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300 flex flex-col items-center justify-center gap-3">

            <div className="w-12 h-12 flex items-center justify-center">
                <IoDocumentText
                size={24}
                className="text-gray-400"
                />
            </div>

            <p className="text-sm text-jci-black/50">
                Aucun fichier pour cet événement
            </p>

            <button
                type="button"
                onClick={openAddFileModal}
                className="text-sm font-semibold text-jci-teal hover:underline cursor-pointer"
            >
                Ajouter un fichier
            </button>

            </div>

        )}

        </div>
        <div className="mt-8">

            <div className="flex items-center flex-col md:flex-row justify-between mb-4 gap-5">
                <div>
                    <h1 className="text-jci-black font-bold font-poppins text-[20px]">
                        Images de l'événement
                    </h1>

                    <p className="text-jci-black/50 text-[13px] font-poppins">
                        Ajoutez les images associées à cet événement
                    </p>

                </div>

                {eventImages.length < 5 && (
                <button
                type="button"
                onClick={openAddImageModal}
                className=' w-full md:w-fit justify-center md:justify-none px-5 py-2.5 bg-blue-100 rounded-lg text-blue-500 font-semibold text-sm  hover:bg-jci-white border border-blue-100 cursor-pointer transition-colors duration-300 flex items-center gap-2'
                >
                <IoAdd />
                Ajouter une image
                </button>
                )}
            </div>

            {eventImages && eventImages.length === 0 ? (
                <div className="w-full py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300 flex flex-col items-center justify-center gap-3">

                    <div className="w-12 h-12  flex items-center justify-center">
                        <IoImages
                        size={24}
                        className="text-gray-400"
                        />
                    </div>

                    <p className="text-sm text-jci-black/50">
                        Aucune image pour cet événement
                    </p>

                    <button
                        type="button"
                        onClick={openAddImageModal}
                        className="text-sm font-semibold text-jci-teal hover:underline cursor-pointer"
                    >
                        Ajouter une image
                    </button>

                    </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {eventImages && eventImages.map((image) => (
                    <div
                    key={image.id}
                    className="relative group rounded overflow-hidden border border-black/10"
                    >
                    <img
                        src={`${import.meta.env.VITE_BACKEND_APP_API_URL_IMAGE}${image.imgUrl}`}
                        alt="Image événement"
                        className="w-full h-40 object-cover"
                    />

                    <button
                        type="button"
                        onClick={() => {
                        setDeleteImageId(image.id);
                        setIsImageDeleteOpen(true);
                        }}
                        className=" absolute top-2 right-2 p-2 bg-red-200 text-red-500 rounded opacity-0 group-hover:opacity-100 transition cursor-pointer"
                    >
                        <FaRegTrashCan />
                    </button>
                    </div>
                ))}
                </div>
            )}

            </div>
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
                    Modifier un événement
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
                  required: false
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

              <input
                id="eventType"
                type="text"
                placeholder="Type d'événement"
                {...eventForm.register("type", {
                  required: "Le type est obligatoire",
                  minLength: {
                    value: 3,
                    message: "Le type doit contenir au moins 3 caractères"
                  }
                })}
                className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jci-yellow focus:border-jci-yellow"
              />

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
                  ? "Modification en cours..."
                    :"Modifier"
                }
            </button>

          </form>
    
            </div>
    
          </div>
        )}
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
    {isFileOpen && (
        <div
            className="fixed top-0 left-0 w-full h-full bg-jci-black/30 bg-opacity-50 flex items-center justify-center z-30"
            onClick={(e) => {
            if (e.target === e.currentTarget) {
                setIsFileOpen(false);
            }
            }}
        >

            <div className="relative bg-white p-6 rounded-xl shadow-lg w-full max-w-md">

            <div className="relative flex items-center justify-center mb-6">

                <h2 className="text-jci-black font-bold text-lg">
                Ajouter un fichier
                </h2>

                <button
                type="button"
                className="absolute right-1 rounded-full p-1.5 text-jci-black/60 hover:text-jci-black hover:bg-jci-white cursor-pointer transition-colors duration-300"
                onClick={() => setIsFileOpen(false)}
                >
                <IoClose size={18} />
                </button>

            </div>

            <form
                onSubmit={fileForm.handleSubmit(handleFileSubmit)}
                className="flex flex-col gap-4"
            >

                <div className="flex flex-col gap-1.5">

                <label
                    htmlFor="eventFile"
                    className="text-[13px] font-medium text-jci-black/80"
                >
                    Fichier
                </label>

                <label
                    htmlFor="eventFile"
                    className={`flex flex-col items-center justify-center px-4 py-10 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer text-sm font-poppins text-gray-800 ${
                    eventFile
                        ? "border-green-500"
                        : "hover:border-jci-yellow"
                    }`}
                >

                    <IoDocumentText
                    size={30}
                    className="mb-2 text-gray-400"
                    />

                    <span>
                    {eventFile
                        ? eventFile[0].name
                        : "Choisir un fichier"}
                    </span>

                    {eventFile && (
                    <span className="text-[11px] text-gray-400 mt-1">
                        {(eventFile[0].size / 1024 / 1024).toFixed(2)} MB
                    </span>
                    )}

                </label>

                <input
                    id="eventFile"
                    type="file"
                    {...fileForm.register("file", {
                        required: "Le fichier PDF est obligatoire",
                        validate: {
                            validType: (files) => {
                            const file = files?.[0];

                            if (!file) return true;

                            return (
                                file.type === "application/pdf" ||
                                "Seuls les fichiers PDF sont acceptés."
                            );
                            },

                            validSize: (files) => {
                            const file = files?.[0];

                            if (!file) return true;

                            return (
                                file.size <= 5 * 1024 * 1024 ||
                                "Le fichier ne doit pas dépasser 5 Mo."
                            );
                            },
                        },
                    })}
                    className="hidden"
                />

                {fileForm.formState.errors.file && (
                    <span className="text-red-500 text-sm">
                    {fileForm.formState.errors.file.message}
                    </span>
                )}

                </div>

                <button
                type="submit"
                disabled={isPending}
                className="mt-2 px-5 py-3 bg-jci-yellow rounded-lg text-jci-white font-semibold text-sm hover:text-jci-black hover:bg-jci-white border border-jci-yellow cursor-pointer transition-colors duration-300 disabled:opacity-50"
                >
                {isPending
                    ? "Ajout en cours..."
                    : "Ajouter"}
                </button>

            </form>

            </div>

        </div>
    )}
    {isFileDeleteOpen && (
    <div
        className="fixed top-0 left-0 w-full h-full bg-jci-black/30 flex items-center justify-center z-40"
        onClick={(e) => {
        if (e.target === e.currentTarget) {
            setIsFileDeleteOpen(false);
            setDeleteFileId(null);
        }
        }}
    >

        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">

        <h2 className="text-jci-black font-bold text-lg mb-3">
            Confirmer la suppression
        </h2>

        <p className="text-sm text-jci-black/60 mb-6">
            Êtes-vous sûr de vouloir supprimer ce fichier ?
        </p>

        <div className="flex justify-end gap-3">

            <button
            type="button"
            onClick={() => {
                setIsFileDeleteOpen(false);
                setDeleteFileId(null);
            }}
            className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-jci-black hover:bg-gray-100 cursor-pointer"
            >
            Annuler
            </button>

            <button
            type="button"
            onClick={handleDeleteFile}
            disabled={isPending}
            className="px-4 py-2 rounded-lg bg-jci-red text-jci-black text-sm font-semibold border border-jci-red cursor-pointer hover:bg-red-600 hover:text-jci-white disabled:opacity-50"
            >
            Supprimer
            </button>

        </div>

        </div>

    </div>
    )}
{isImageOpen && (
        <div
            className="fixed top-0 left-0 w-full h-full bg-jci-black/30 bg-opacity-50 flex items-center justify-center z-20"
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    setIsImageOpen(false);
                }
            }}
        >

            <div className="relative bg-white p-6 rounded-xl shadow-lg w-full max-w-md">

                <div className="relative flex items-center justify-center mb-6">

                    <h2 className="text-jci-black font-bold text-lg">
                        Ajouter une image
                    </h2>

                    <button
                        type="button"
                        className="absolute right-1 rounded-full p-1.5 text-jci-black/60 hover:text-jci-black hover:bg-jci-white cursor-pointer transition-colors duration-300"
                        onClick={() => setIsImageOpen(false)}
                    >
                        <IoClose size={18} />
                    </button>

                </div>

                <form
                    onSubmit={imageForm.handleSubmit(handleImageSubmit)}
                    className="flex flex-col gap-4"
                >

                    {/* Image */}
                    <div className="flex flex-col gap-1.5">

                        <label
                            htmlFor="eventAdditionalImage"
                            className="text-[13px] font-medium text-jci-black/80"
                        >
                            Image
                        </label>

                        <label
                            htmlFor="eventAdditionalImage"
                            className={`flex flex-col items-center justify-center px-4 py-10 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer text-sm font-poppins text-gray-800 ${
                                eventImageDetails
                                    ? "border-green-500 overflow-hidden"
                                    : "hover:border-jci-yellow"
                            }`}
                        >

                            <IoImages
                                size={30}
                                className="mb-2 text-gray-400"
                            />

                            <span className='n'>
                                {eventImageDetails
                                    ? eventImageDetails[0].name
                                    : "Choisir une image"}
                            </span>

                            {eventImageDetails && (
                                <span className="text-[11px] text-gray-400 mt-1">
                                    {(eventImageDetails[0].size / 1024 / 1024).toFixed(2)} MB
                                </span>
                            )}

                        </label>

                        <input
                            id="eventAdditionalImage"
                            type="file"
                            accept="image/*"
                            {...imageForm.register("image", {
                                required: "L'image est obligatoire"
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

                        {imageForm.formState.errors.image && (
                            <span className="text-red-500 text-sm">
                                {imageForm.formState.errors.image.message}
                            </span>
                        )}

                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="mt-2 px-5 py-3 bg-jci-yellow rounded-lg text-jci-white font-semibold text-sm hover:text-jci-black hover:bg-jci-white border border-jci-yellow cursor-pointer transition-colors duration-300 disabled:opacity-50"
                    >
                        {isPending
                            ? "Ajout en cours..."
                            : "Ajouter"}
                    </button>

                </form>

            </div>

        </div>
    )}
    {isImageDeleteOpen && (
        <div
        className="fixed top-0 left-0 w-full h-full bg-jci-black/30 flex items-center justify-center z-40"
        onClick={(e) => {
        if (e.target === e.currentTarget) {
            setIsImageDeleteOpen(false);
            setDeleteImageId(null);
        }
        }}
    >

        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">

        <h2 className="text-jci-black font-bold text-lg mb-3">
            Confirmer la suppression
        </h2>

        <p className="text-sm text-jci-black/60 mb-6">
            Êtes-vous sûr de vouloir supprimer cette image ?
        </p>

        <div className="flex justify-end gap-3">

            <button
            type="button"
            onClick={() => {
                setIsImageDeleteOpen(false);
                setDeleteImageId(null);
            }}
            className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-jci-black hover:bg-gray-100 cursor-pointer"
            >
            Annuler
            </button>

            <button
            type="button"
            onClick={handleDeleteImage}
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

export default EventsDetailsManager