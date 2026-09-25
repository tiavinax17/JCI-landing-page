import { useParams } from "react-router";
import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../context/UserContext";
import { IoClose, IoAdd, IoImages } from "react-icons/io5";
import { LuExternalLink } from "react-icons/lu";
import { olAPI, contentAPI, memberAPI, eventAPI } from "../../services/api";
import { NavLink } from "react-router";
import { MdArrowForwardIos } from "react-icons/md";
import { toast } from "sonner";
import { FaUsers } from "react-icons/fa";
import Pagination from "../../components/ui/Pagination"


const OLDetainsManager = () => {
  const {user} = useContext(UserContext);
  let olId = null;
  let zone = null;
  if (user.role === "ADMIN_LOCAL") {
    olId = user.organisationLocalId;
  }
  else{
    olId = useParams().olId;
    zone = useParams().zone;
  }
  const [olDetails, setOlDetails] = useState(null);
  const olForm = useForm();
  const [isOlOpen, setIsOlOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  const [olContents, setOlContents] = useState([]);
  const [isContentOpen, setIsContentOpen] = useState(false);
  const [isContentEdit, setIsContentEdit] = useState(false);
  const [contentId, setContentId] = useState(null);
  const [isContentDeleteOpen, setIsContentDeleteOpen] = useState(false);
  const contentForm = useForm();

  const [members, setMembers] = useState([]);
  const [isMemberOpen, setIsMemberOpen] = useState(false);
  const [memberId, setMemberId] = useState(null);

  const [isMemberDeleteOpen, setIsMemberDeleteOpen] = useState(false);
  const [deleteMemberId, setDeleteMemberId] = useState(null);
  const [memberSearch, setMemberSearch] = useState("");
  const memberForm = useForm();
  const memberImage = memberForm.watch("image");

  const [events, setEvents] = useState([]);
  const [isEventOpen, setIsEventOpen] = useState(false);
  const [eventId, setEventId] = useState(null);
  const [isEventDeleteOpen, setIsEventDeleteOpen] = useState(false);
  const [deleteEventId, setDeleteEventId] = useState(null);
  const [eventSearch, setEventSearch] = useState("");
  const eventForm = useForm();
  const eventImage = eventForm.watch("image");
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1)
  
  const PAGE_SIZE = 9 


  
  const openEditOlModal = (ol) => {
    olForm.reset({
        name: ol.name,
        localisation: ol.localisation,
        phone: ol.phone,
        email: ol.email,
        mapImg: null,
        logoImg: null
    });

    setIsOlOpen(true);
  };

  //==================Contenu (Content)=====================
  const openAddContentModal = () => {
    setIsContentEdit(false);
      setContentId(null);

      contentForm.reset({
          content: ""
      });

      setIsContentOpen(true);
  };

  const openEditContentModal = (content) => {
      setIsContentEdit(true);
      setContentId(content.id);

      contentForm.reset({
          content: content.content
      });

      setIsContentOpen(true);
  };

  const openDeleteContentModal = (id) => {
      setContentId(id);
      setIsContentDeleteOpen(true);
  };
  //==================Membre (Member)=====================
    const openAddMemberModal = () => {
    setMemberId(null);

    memberForm.reset({
      name: "",
      title: "",
      ticket: "",
      image: null
    });

    setIsMemberOpen(true);
  };

  const openEditMemberModal = (member) => {
    setMemberId(member.id);

    memberForm.reset({
      name: member.name,
      title: member.title,
      ticket: member.ticket,
      image: null
    });

    setIsMemberOpen(true);
  };

  const openDeleteMemberModal = (id) => {
    setDeleteMemberId(id);
    setIsMemberDeleteOpen(true);
  };
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
    console.log("User context:", user);
}, [user]);

useEffect(() => {
    const fetchOlDetails = async () => {
      try {
        const response = await olAPI.getById(olId);
        setOlDetails(response.data);
        console.log("Fetched OL details:", response.data);
      } catch (error) {
        console.error("Failed to fetch OL details:", error);
      }
    };
    fetchOlDetails();
  }, [olId]);

  useEffect(() => {
      const fetchOlContents = async () => {
          if (!olId) return;

          try {
              const response = await contentAPI.getAll(olId);
              setOlContents(response.data);
              console.log("Fetched OL contents:", response.data);
          } catch (error) {
              console.error("Failed to fetch OL contents:", error);
          }
      };

      fetchOlContents();
  }, [olId]);

  useEffect(() => {
    const fetchMembers = async () => {
      if (!olId) return;

      try {
        const response = await memberAPI.getAll(olId);
        setMembers(response.data);
      } catch (error) {
        console.error("Error fetching OL members:", error);
      }
    };

    fetchMembers();
    }, [olId]);

  useEffect(() => {
    const fetchEvents = async () => {
      if (!olId) return;

      try {
        const response = await eventAPI.getAllByOl(olId);
        setEvents(response.data);
        console.log("Fetched OL events:", response.data);
      } catch (error) {
        console.error("Error fetching OL events:", error);
      }
    };

  fetchEvents();
}, [olId]);
  const handleOlSubmit = async (data) => {
        setIsOlOpen(false);
        setIsPending(true);
        setPendingAction('submit');
        try {
            const formData = new FormData();

            if (data.mapImg?.[0]) {
                formData.append("mapImg", data.mapImg[0]);
            }

            if (data.logoImg?.[0]) {
                formData.append("logoImg", data.logoImg[0]);
            }
            formData.append("name", data.name);
            formData.append("localisation", data.localisation);
            formData.append("phone", data.phone);
            formData.append("email", data.email);
            const res = await olAPI.update(olId, formData);
            toast.success(res.data.message);

            const response = await olAPI.getById(olId);
            setOlDetails(response.data);
            olForm.reset();

        } catch (error) {
            console.error(
                "Error updating OL:",
                error
            );
            toast.error(error.response?.data?.message || "Une erreur est survenue");
        } finally {
            setIsPending(false);
        }
    };

    const handleContentSubmit = async (data) => {
      setIsPending(true);
      setPendingAction('submit');

      try {
          const payload = {
              content: data.content,
              organisationLocalId: Number(olId)
          };

          if (isContentEdit) {
             const res = await contentAPI.update(contentId, {
                  content: data.content
              });
              toast.success(res.data.message);

          } else {
              const res = await contentAPI.create(payload);
              toast.success(res.data.message);
          }

          const response = await contentAPI.getAll(olId);
          setOlContents(response.data);

          contentForm.reset();
          setIsContentOpen(false);

      } catch (error) {
          console.error(
              isContentEdit
                  ? "Error updating OL content:"
                  : "Error creating OL content:",
              error
          );
          toast.error(error.response?.data?.message || "Une erreur est survenue");
      } finally {
          setIsPending(false);
      }
  };
    const handleDeleteContent = async () => {
      setIsPending(true);
      setPendingAction('delete');

      try {
          await contentAPI.deleteById(contentId);
          toast.success("OL content supprimé avec succès !");
          setOlContents((prev) =>
              prev.filter((content) => content.id !== contentId)
          );

          setContentId(null);
          setIsContentDeleteOpen(false);

      } catch (error) {
          console.error("Error deleting OL content:", error);
          toast.error(error.response?.data?.message || "Une erreur est survenue");
      } finally {
          setIsPending(false);
      }
  };

  const handleMemberSubmit = async (data) => {
    setIsMemberOpen(false);
    setIsPending(true);
    setPendingAction('submit');

    try {
      const formData = new FormData();

      if (data.image?.[0]) {
        formData.append("picture", data.image[0]);
      }

      formData.append("name", data.name);
      formData.append("title", data.title);
      formData.append("ticket", data.ticket);

      if (memberId) {
        const res = await memberAPI.update(memberId, formData);
        toast.success(res.data.message);
      } else {
        formData.append("organisationLocalId", Number(olId));

        const res = await memberAPI.create(formData);
        toast.success(res.data.message);
      }

      const response = await memberAPI.getAll(olId);
      setMembers(response.data);

      memberForm.reset();
      setMemberId(null);
    } catch (error) {
      console.error(
        memberId
          ? "Error updating OL member:"
          : "Error creating OL member:",
        error
      );
      toast.error(error.response?.data?.message || "Une erreur est survenue");
    } finally {
      setIsPending(false);
    }
  };

  const handleDeleteMember = async () => {
    setIsMemberDeleteOpen(false);
    setIsPending(true);
    setPendingAction('delete');

    try {
      await memberAPI.deleteById(deleteMemberId);
      toast.success("Membre de bureau supprimé avec succès !");
      const response = await memberAPI.getAll(olId);
      setMembers(response.data);

      setDeleteMemberId(null);
    } catch (error) {
      console.error("Error deleting OL member:", error);
      toast.error(error.response?.data?.message || "Une erreur est survenue");
    } finally {
      setIsPending(false);
    }
  };

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
        formData.append("organisationLocalId", Number(olId));

        const res = await eventAPI.create(formData);
        toast.success(res.data.message);
      }

      const response = await eventAPI.getAllByOl(olId);
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

      const response = await eventAPI.getAllByOl(olId);
      setEvents(response.data);

      setDeleteEventId(null);
    } catch (error) {
      console.error("Error deleting OL event:", error);
      toast.error(error.response?.data?.message || "Une erreur est survenue");
    } finally {
      setIsPending(false);
    }
  };

  const filteredMembers = members.filter((item) => {
    const searchValue = memberSearch.toLowerCase();

    return (
      item.name?.toLowerCase().includes(searchValue) ||
      item.title?.toLowerCase().includes(searchValue) ||
      item.ticket?.toLowerCase().includes(searchValue)
    );
  });

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
  const TOTAL_PAGES = filteredEvents.length % PAGE_SIZE === 0 ? Math.floor(filteredEvents.length / PAGE_SIZE) : Math.floor(filteredEvents.length / PAGE_SIZE) + 1 || 1
  const eventsPagination = filteredEvents.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
  return (
    <div className='relative p-5 flex flex-col items-start bg-gray-100 w-full min-h-screen'>
      
      {olDetails && (
        <>
        <div className="md:w-[90%] w-full rounded-xl p-5 bg-white flex flex-col gap-20 md:pt-0 pt-20">
          <div>          
            <h1 className="text-4xl font-bold mb-4 text-jci text-jci-black font-jakarta self-center text-start">Page de détails de l'organisation locale <br />
              <span className="text-jci-yellow">{olDetails.name}</span>
                {user && user?.role != "ADMIN_LOCAL" &&
                (
                  <div className='flex flex-row gap-2'>
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
                    to={`/admin/zones/${zone}`}
                    className=' py-2  rounded-lg text-jci-yellow font-semibold text-sm hover:underline cursor-pointer transition-colors duration-300 flex justify-center items-center'
                    >
                    Organisation locale {olDetails?.name} <MdArrowForwardIos size={16} />
                    </NavLink>
                    
                  </div>
                )}
            </h1>
            <div className="w-full rounded-2xl bg-jci-blue px-2 pt-3 pb-2">
              <h2 className="text-white text-lg font-semibold font-poppins uppercase ml-5 mt-5">Coordonnées</h2>
              <div className="mt-3 space-y-2 bg-jci-navy p-2 rounded">
                <div className="p-5 bg-jci-black text-jci-white text-[14px] font-sans flex flex-row justify-between">
                <div>
                  <p><span className="font-semibold text-jci-yellow">Nom: </span> {olDetails.name}</p>
                  <p><span className="font-semibold text-jci-yellow">Localisation: </span> {olDetails.localisation}</p>
                  <p><span className="font-semibold text-jci-yellow">Téléphone: </span> {olDetails.phone}</p>
                  <p><span className="font-semibold text-jci-yellow">Adresse email: </span> {olDetails.email}</p>
                  <button
                      type="button"
                      onClick={() => openEditOlModal(olDetails)}
                                 className="mt-2 px-3 py-2 bg-jci-yellow rounded-lg text-jci-black font-semibold text-[12px] hover:bg-jci-black border hover:text-jci-yellow border-jci-yellow cursor-pointer transition-colors duration-300"
                      title="Modifier"
                  >
                      Modifier
                  </button>
                </div>
                <div className="overflow-hidden">
                  <img 
                  loading="lazy"
                  src={`${import.meta.env.VITE_BACKEND_APP_API_URL_IMAGE}${olDetails.logoImgUrl}`} alt={`Logo ${olDetails.name}`} className="w-full h-20 object-contain" />
                </div>

                </div>
              </div>
            </div>
          </div>



            {/* HEADER */}
            <div className="hidden md:flex flex-col md:flex-row gap-5">
              <div className="flex flex-2 flex-col gap-4">
                <div className="flex flex-col items-center md:items-start md:gap-2 justify-between ">

                    <div className="w-full ">
                        <h2 className="text-lg font-bold text-jci-black">
                            Contenus de l'organisation locale
                        </h2>

                        <p className="text-sm text-jci-black/50">
                            Gérez les contenus présentés sur la page de cette organisation locale
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={openAddContentModal}
                        className='px-5 py-2.5 bg-blue-100 rounded-lg text-blue-500 font-semibold text-sm  hover:bg-jci-white border border-blue-100 cursor-pointer transition-colors duration-300 flex items-center gap-2'
                    >
                        <IoAdd size={20} />
                        Ajouter un contenu
                    </button>

                </div>


                {/* CONTENTS */}

                {olContents.length > 0 ? (
                  <div className="flex flex-col gap-4 max-h-100 overflow-y-auto overflow-x-auto ">

                    {olContents.map((content) => (

                      <div
                          key={content.id}
                          className="bg-gray-50 rounded-xl border border-gray-200 p-2 hover:shadow-sm transition-shadow duration-300"
                      >

                        <div className="flex items-start justify-between gap-5">

                          <div className="flex-1">

                              <p className="text-sm leading-7 text-jci-black whitespace-pre-line">
                                  {content.content}
                              </p>

                          </div>


                          {/* ACTIONS */}

                          <div className="flex items-center gap-2 shrink-0">

                            <button
                                type="button"
                                onClick={() => openEditContentModal(content)}
                                 className="px-3 py-2 bg-jci-blue rounded-lg text-jci-black font-semibold text-[12px] hover:bg-jci-white border border-jci-blue cursor-pointer transition-colors duration-300"
                                title="Modifier"
                            >
                                Modifier
                            </button>

                            <button
                              type="button"
                              onClick={() => openDeleteContentModal(content.id)}
                              className="px-3 py-2 bg-jci-red rounded-lg text-jci-black font-semibold text-[12px] hover:bg-jci-white hover:border-red-600 border border-transparent cursor-pointer transition-colors duration-300"
                              title="Supprimer"
                            >
                              Supprimer
                            </button>

                          </div>

                        </div>

                      </div>

                    ))}

                  </div>

                ) : (

                  <div className="w-full py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300 flex flex-col items-center justify-center gap-3">

                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                      <IoAdd
                          size={24}
                          className="text-gray-400"
                      />
                    </div>

                    <p className="text-sm text-jci-black/50">
                        Aucun contenu pour cette organisation locale
                    </p>

                    <button
                        type="button"
                        onClick={openAddContentModal}
                        className="text-sm font-semibold text-jci-teal hover:underline cursor-pointer"
                    >
                        Ajouter un contenu
                    </button>

                  </div>

                )}

              </div>
              <div className="flex-1">
                <img 
                loading="lazy"
                src={`${import.meta.env.VITE_BACKEND_APP_API_URL_IMAGE}${olDetails.mapImgUrl}`} alt={`Logo ${olDetails.name}`} className="w-full h-100 object-contain" />
              </div>
            </div>
            <div className="flex md:hidden flex-col md:flex-row gap-5">
            <div className="flex-1">
                <img 
                loading="lazy"
                src={`${import.meta.env.VITE_BACKEND_APP_API_URL_IMAGE}${olDetails.mapImgUrl}`} alt={`Logo ${olDetails.name}`} className="w-full h-50 object-contain" />
              </div>
              <div className="flex flex-2 flex-col gap-4">
                <div className="flex md:flex-row flex-col items-center justify-between gap-5">

                    <div className="w-full">
                        <h2 className="text-lg font-bold text-jci-black">
                            Contenus de l'organisation locale
                        </h2>

                        <p className="text-sm text-jci-black/50">
                            Gérez les contenus présentés sur la page de cette organisation locale
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={openAddContentModal}
                        className=' w-full px-5 py-2.5 bg-blue-100 rounded-lg text-blue-500 font-semibold text-sm  hover:bg-jci-white border border-blue-100 cursor-pointer transition-colors duration-300 flex items-center gap-2'
                    >
                        <IoAdd size={20} />
                        Ajouter un contenu
                    </button>

                </div>


                {/* CONTENTS */}

                {olContents.length > 0 ? (
                  <div className="flex flex-col gap-4 max-h-100 overflow-y-auto overflow-x-auto ">

                    {olContents.map((content) => (

                      <div
                          key={content.id}
                          className="bg-gray-50 rounded-xl border border-gray-200 p-2 hover:shadow-sm transition-shadow duration-300"
                      >

                        <div className="flex items-start justify-between gap-5">

                          <div className="flex-1">

                              <p className="text-sm leading-7 text-jci-black whitespace-pre-line">
                                  {content.content}
                              </p>

                          </div>


                          {/* ACTIONS */}

                          <div className="flex items-center gap-2 shrink-0">

                            <button
                                type="button"
                                onClick={() => openEditContentModal(content)}
                                 className="px-3 py-2 bg-jci-blue rounded-lg text-jci-black font-semibold text-[12px] hover:bg-jci-white border border-jci-blue cursor-pointer transition-colors duration-300"
                                title="Modifier"
                            >
                                Modifier
                            </button>

                            <button
                              type="button"
                              onClick={() => openDeleteContentModal(content.id)}
                              className="px-3 py-2 bg-jci-red rounded-lg text-jci-black font-semibold text-[12px] hover:bg-jci-white hover:border-red-600 border border-transparent cursor-pointer transition-colors duration-300"
                              title="Supprimer"
                            >
                              Supprimer
                            </button>

                          </div>

                        </div>

                      </div>

                    ))}

                  </div>

                ) : (

                  <div className="w-full py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300 flex flex-col items-center justify-center gap-3">

                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                      <IoAdd
                          size={24}
                          className="text-gray-400"
                      />
                    </div>

                    <p className="text-sm text-jci-black/50">
                        Aucun contenu pour cette organisation locale
                    </p>

                    <button
                        type="button"
                        onClick={openAddContentModal}
                        className="text-sm font-semibold text-jci-teal hover:underline cursor-pointer"
                    >
                        Ajouter un contenu
                    </button>

                  </div>

                )}

              </div>
              
          </div>
          <div className="w-full bg-white flex flex-col gap-5">

          <div className="flex items-center md:items-start flex-col gap-5 justify-between">
            <div>
              <h2 className="text-lg font-bold text-jci-black">
                Membres de l'organisation locale
              </h2>

              <p className="text-sm text-jci-black/50">
                Gérez les membres présentés sur la page de cette organisation locale
              </p>
              <p className="text-xs text-jci-blue">
              * L’ordre d’ajout suivra l’ordre d’apparition : première entrée, première apparue.
              </p>
            </div>

            <button
              type="button"
              onClick={openAddMemberModal}
              className='w-full md:w-fit px-5 py-2.5 bg-blue-100 rounded-lg text-blue-500 font-semibold text-sm  hover:bg-jci-white border border-blue-100 cursor-pointer transition-colors duration-300 flex items-center gap-2'
            >
              <IoAdd size={16} />
              Ajouter un membre
            </button>
          </div>

          {/* Recherche */}
          <div className="w-full">
            <input
              type="text"
              placeholder="Rechercher par nom, titre ou ticket..."
              value={memberSearch}
              onChange={(e) => setMemberSearch(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-jci-yellow focus:border-jci-yellow"
            />
          </div>

          {/* Tableau */}
          <div className="w-full max-h-100 overflow-y-auto overflow-x-auto rounded border border-gray-200 shadow-sm">
                
             {filteredMembers.length > 0 ? (
               <table className="w-full border-collapse text-sm ">

          <thead className={` ${user.role === 'SUPER_ADMIN' ? 'bg-red-900' : user.role === 'ADMIN_NATIONAL' ? 'bg-jci-black' : user.role === 'ADMIN_LOCAL' ? 'bg-green-900' : 'bg-yellow-900'} text-jci-white font-poppins font-semibold`}>
                  <tr className="text-left">

                    <th className="px-4 py-3 text-left font-semibold text-[13px] uppercase tracking-wide whitespace-nowrap">
                      ID
                    </th>

                    <th className="px-4 py-3 text-left font-semibold text-[13px] uppercase tracking-wide whitespace-nowrap">
                      Image
                    </th>

                    <th className="px-4 py-3 text-left font-semibold text-[13px] uppercase tracking-wide whitespace-nowrap">
                      Nom
                    </th>

                    <th className="px-4 py-3 text-left font-semibold text-[13px] uppercase tracking-wide whitespace-nowrap">
                      Titre
                    </th>

                    <th className="px-4 py-3 text-left font-semibold text-[13px] uppercase tracking-wide whitespace-nowrap">
                      Ticket
                    </th>

                    <th className="px-4 py-3 text-left font-semibold text-[13px] uppercase tracking-wide whitespace-nowrap">
                      Actions
                    </th>

                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">

                  {filteredMembers.map((item, index) => (

                    <tr
                      key={item.id}
                      className={`text-left transition-colors duration-200 hover:bg-jci-yellow/10 ${
                        index % 2 === 0
                          ? "bg-gray-50"
                          : "bg-jci-white"
                      }`}
                    >

                      <td className="px-4 py-3 text-left text-jci-black/60 font-mono text-[13px] whitespace-nowrap">
                        {item.id}
                      </td>

                      <td className="px-4 py-3 text-left text-jci-black font-medium">

                        <div className="w-15 h-15 rounded-full overflow-hidden">

                          <img
                            loading="lazy"
                            src={`${import.meta.env.VITE_BACKEND_APP_API_URL_IMAGE}${item.imgUrl}`}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />

                        </div>

                      </td>

                      <td className="px-4 py-3 text-left whitespace-nowrap">

                        <span className="px-4 py-3 text-left text-jci-black font-bold tracking-widest">
                          {item.name}
                        </span>

                      </td>

                      <td className="px-4 py-3 text-left text-jci-black tracking-widest">
                        {item.title || (
                          <span className="text-jci-black italic">
                            Pas de titre
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-3 text-left text-jci-black tracking-widest">
                        {item.ticket || (
                          <span className="text-jci-black italic">
                            Pas de ticket
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-3">

                        <div className="flex items-center justify-start gap-2">

                          <button
                            type="button"
                            className="px-3 py-1.5 bg-jci-blue rounded-lg text-jci-black font-semibold text-[12px] hover:text-jci-black hover:bg-jci-white border-jci-blue border cursor-pointer transition-colors duration-300"
                            onClick={() => openEditMemberModal(item)}
                          >
                            Modifier
                          </button>

                          <button
                            type="button"
                            className="px-3 py-1.5 bg-jci-red rounded-lg text-jci-black font-semibold text-[12px] hover:text-jci-black hover:bg-jci-white hover:border-red-600 border border-transparent cursor-pointer transition-colors duration-300"
                            onClick={() => openDeleteMemberModal(item.id)}
                          >
                            Supprimer
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

                </table>)
                :
                <div className="w-full py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300 flex flex-col items-center justify-center gap-3">

                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                    <FaUsers 
                        size={24}
                        className="text-gray-400"
                    />
                  </div>

                  <p className="text-sm text-jci-black/50">
                      Aucun membre de bureau pour cette organisation locale
                  </p>

                  <button
                      type="button"
                      onClick={openAddMemberModal}
                      className="text-sm font-semibold text-jci-teal hover:underline cursor-pointer"
                  >
                      Ajouter un membre de bureau
                  </button>

                  </div>
              }

            </div>
          </div>
          <div className="w-full p-5 flex flex-col gap-5">

            <div className="flex items-center flex-col md:items-start justify-between gap-5">

              <div>
                <h2 className="text-lg font-bold text-jci-black">
                  Événements de l'organisation locale
                </h2>

                <p className="text-sm text-jci-black/50">
                  Gérez les événements de cette organisation locale
                </p>
              </div>

              <button
                type="button"
                onClick={openAddEventModal}
                className=' w-full md:w-fit px-5 py-2.5 bg-blue-100 rounded-lg text-blue-500 font-semibold text-sm  hover:bg-jci-white border border-blue-100 cursor-pointer transition-colors duration-300 flex items-center gap-2'
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
            {filteredEvents.length > 0 ? (

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

                {filteredEvents.map((event) => {
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
                            loading="lazy"
                          />

                          {/* Date */}
                          <div className="bg-jci-blue text-white px-1.5 py-1 md:px-2 font-roboto font-bold flex flex-col justify-center items-center absolute top-0 right-2">
                            <h1 className="text-[18px] md:text-[22px]">{day}</h1>
                            <h2 className="text-[10px] md:text-[11px] -mt-2 uppercase">{month}</h2>
                             <h3 className="text-[10px] md:text-[11px]     uppercase">{year}</h3>
                          </div>

                          {/* Type */}
                          <div className="px-3 md:px-4 py-0.5 bg-jci-yellow text-[7px] md:text-[8px] text-jci-black font-extrabold font-roboto text-center absolute bottom-0.5 left-0">
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
                          onClick={() => window.location.href = user.role === "ADMIN_LOCAL" ? `/admin/local/mon-organisation-locale/${olId}/evenements/${event.id}` : `/admin/zones/${zone}/organisations-locale/${olId}/evenements/${event.id}`}
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
                  Aucun événement pour cette organisation locale
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
            <div className='flex justify-center w-full mt-5'>
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={TOTAL_PAGES}
              />
            </div>

          </div>

        </div>

        </>
        )}
      {isOlOpen && (  
          <div
              className="fixed top-0 left-0 w-full h-full bg-jci-black/30 flex items-center justify-center z-20"
              onClick={(e) => {
                  if (e.target === e.currentTarget) {
                      setIsOlOpen(false);
                  }
              }}
          >
              <div className="relative bg-white p-6 rounded-xl shadow-lg w-full max-w-md">

                  <div className="relative flex items-center justify-center mb-6">

                      <h2 className="text-jci-black font-bold text-lg">
                          Modifier l'organisation locale
                      </h2>

                      <button
                          type="button"
                          onClick={() => setIsOlOpen(false)}
                          className="absolute right-1 rounded-full p-1.5 text-jci-black/60 hover:text-jci-black hover:bg-gray-100 cursor-pointer transition-colors duration-300"
                      >
                          <IoClose size={18} />
                      </button>

                  </div>


                  <form
                    onSubmit={olForm.handleSubmit(handleOlSubmit)}
                    className="flex flex-col gap-4"
                >

                    {/* LOGO */}
                    <div className="flex flex-row gap-1.5">

                    

                    <div className="flex flex-1 flex-col gap-1.5">

                        <label className="text-[13px] font-medium text-jci-black/80">
                            Logo
                        </label>

                        <label
                            htmlFor="logoImg"
                            className={`flex flex-col items-center text-center justify-center text-[11px] px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer text-sm font-poppins text-gray-800 ${
                                        olForm.watch("logoImg")?.[0]
                                        ? 'border-green-500 hover:border-green-500'
                                        : 'hover:border-jci-yellow'
                                    }`}                                    >
                            <IoImages
                                size={30}
                                className="mb-2 text-gray-400"
                            />
                            {olForm.watch("logoImg")?.[0]?.name ||
                                "Choisir le logo pour l'organisation locale"}
                            {olForm.watch("logoImg")?.[0] && (
                                <span className="text-[11px] text-gray-400">
                                    {(olForm.watch("logoImg")?.[0]?.size / 1024 / 1024).toFixed(2)} MB
                                </span>
                            )}
                        </label>

                        <input
                            id="logoImg"
                            type="file"
                            accept="image/*"
                            {...olForm.register("logoImg", {
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

                        {olForm.formState.errors.logoImg && (
                            <span className="text-red-500 text-sm">
                                {olForm.formState.errors.logoImg.message}
                            </span>
                        )}

                    </div>


                    {/* IMAGE CARTE */}

                    <div className="flex flex-1 flex-col gap-1.5">

                        <label className="text-[13px] font-medium text-jci-black/80">
                            Image de localisation
                        </label>

                        <label
                            htmlFor="mapImg"
                            className={`flex flex-col items-center text-center justify-center text-[11px] px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer text-sm font-poppins text-gray-800 ${
                                                olForm.watch("mapImg")?.[0]
                                                ? 'border-green-500 hover:border-green-500'
                                                : 'hover:border-jci-yellow'
                                            }`}                                    >
                            <IoImages
                                size={30}
                                className="mb-2 text-gray-400"
                            />
                            {olForm.watch("mapImg")?.[0]?.name ||
                                "Choisir une image de localisation "}
                                {olForm.watch("mapImg")?.[0] && (
                                <span className="text-[11px] text-gray-400">
                                    {(olForm.watch("mapImg")?.[0]?.size / 1024 / 1024).toFixed(2)} MB
                                </span>
                            )}
                        </label>

                        <input
                            id="mapImg"
                            type="file"
                            accept="image/*"
                            {...olForm.register("mapImg", {
                                required: false
                                    ,
                                    validate: {
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

                        {olForm.formState.errors.mapImg && (
                            <span className="text-red-500 text-sm">
                                {olForm.formState.errors.mapImg.message}
                            </span>
                        )}

                    </div>
                      </div>


                    {/* NOM */}

                    <input
                        type="text"
                        placeholder="Nom de l'OL"
                        {...olForm.register("name", {
                            required: "Le nom est obligatoire",
                            minLength: {
                            value: 2,
                            message: "Le nom doit contenir au moins 2 caractères",
                            },
                            maxLength: {
                            value: 100,
                            message: "Le nom ne doit pas dépasser 100 caractères",
                            },
                            pattern: {
                            value: /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/,
                            message: "Le nom contient des caractères invalides",
                            }
                        })}
                        className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jci-yellow"
                    />

                    {olForm.formState.errors.name && (
                        <span className="text-red-500 text-sm">
                            {olForm.formState.errors.name.message}
                        </span>
                    )}


                    {/* LOCALISATION */}

                    <input
                        type="text"
                        placeholder="Localisation"
                        {...olForm.register("localisation", {
                            required: "La localisation est obligatoire",
                                minLength: {
                            value: 2,
                            message: "La localisation doit contenir au moins 2 caractères",
                            },
                            maxLength: {
                            value: 100,
                            message: "La localisation ne doit pas dépasser 100 caractères",
                            },
                            pattern: {
                            value: /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/,
                            message: "La localisation contient des caractères invalides",
                            }
                        })}
                        className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jci-yellow"
                    />
                    {olForm.formState.errors.localisation && (
                        <span className="text-red-500 text-sm">
                            {olForm.formState.errors.localisation.message}
                        </span>
                    )}


                    {/* TELEPHONE */}

                    <input
                        type="text"
                        placeholder="0340000000 ou +261340000000"
                        {...olForm.register("phone", {
                            required: "Le numéro de téléphone est obligatoire",
                            pattern: {
                                value: /^\+?[0-9\s()-]{8,20}$/,
                                message: "Veuillez fournir un numéro de téléphone valide e.g: 0340000000 ou +261340000000",
                            },
                            minLength: {
                                value: 10,
                                message: "Le numéro de téléphone doit contenir au moins 10 caractères",
                            },
                            maxLength: {
                                value: 13,
                                message: "Le numéro de téléphone ne doit pas dépasser 13 caractères",
                            },
                        })}
                        className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jci-yellow"
                    />
                    {olForm.formState.errors.phone && (
                        <span className="text-red-500 text-sm">
                            {olForm.formState.errors.phone.message}
                        </span>
                    )}

                    {/* EMAIL */}

                    <input
                        type="email"
                        placeholder="Email"
                        {...olForm.register("email", {
                            required: "L'email est obligatoire",
                            pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Adresse email invalide",
                            },
                            maxLength: {
                            value: 254,
                            message: "L'email est trop long",
                            }
                        })}
                        className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jci-yellow"
                    />
                    {olForm.formState.errors.email && (
                        <span className="text-red-500 text-sm">
                            {olForm.formState.errors.email.message}
                        </span>
                    )}


                    <button
                        type="submit"
                        disabled={isPending}
                        className="mt-2 px-5 py-3 bg-jci-yellow rounded-lg text-jci-white font-semibold text-sm hover:text-jci-black hover:bg-jci-white border border-jci-yellow cursor-pointer transition-colors duration-300 disabled:opacity-50"
                    >
                        {isPending
                          ? "Modification en cours..."
                          : "Modifier"}
                    </button>

                </form>

              </div>

          </div>
       )}
      {isContentOpen && (
        <div
            className="fixed top-0 left-0 w-full h-full bg-jci-black/30 flex items-center justify-center z-20"
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    setIsContentOpen(false);
                }
            }}
        >

            <div className="relative bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">

                {/* HEADER */}

                <div className="relative flex items-center justify-center mb-6">

                    <h2 className="text-jci-black font-bold text-lg">
                        {isContentEdit
                            ? "Modifier le contenu"
                            : "Ajouter un contenu"}
                    </h2>

                    <button
                        type="button"
                        onClick={() => setIsContentOpen(false)}
                        className="absolute right-1 rounded-full p-1.5 text-jci-black/60 hover:text-jci-black hover:bg-gray-100 cursor-pointer transition-colors duration-300"
                    >
                        <IoClose size={18} />
                    </button>

                </div>


                {/* FORM */}

                <form
                    onSubmit={contentForm.handleSubmit(handleContentSubmit)}
                    className="flex flex-col gap-4"
                >

                    <div className="flex flex-col gap-1.5">

                        <label
                            htmlFor="content"
                            className="text-[13px] font-medium text-jci-black/80"
                        >
                            Contenu
                        </label>

                        <textarea
                            id="content"
                            placeholder="Écrivez le contenu de l'organisation locale..."
                            rows={8}
                            {...contentForm.register("content", {
                                required: "Le contenu est obligatoire",
                                validate: (value) =>
                                value.trim().length >= 5 || "Le contenu est trop court",
                                 minLength: {
                                  value: 5,
                                  message: "Le contenu doit contenir au moins 5 caractères",
                                },
                                maxLength: {
                                  value: 500,
                                  message: "Le contenu ne doit pas dépasser 500 caractères",
                                },
                              })}
                            className="px-4 py-3 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-jci-yellow focus:border-jci-yellow"
                        />

                        {contentForm.formState.errors.content && (
                            <span className="text-red-500 text-sm">
                                {contentForm.formState.errors.content.message}
                            </span>
                        )}

                    </div>


                    <button
                        type="submit"
                        disabled={isPending}
                        className="mt-2 px-5 py-3 bg-jci-yellow rounded-lg text-jci-white font-semibold text-sm hover:text-jci-black hover:bg-jci-white border border-jci-yellow cursor-pointer transition-colors duration-300 disabled:opacity-50"
                    >
                        {isPending
                            ? (isContentEdit
                                ? "Modification en cours..."
                                : "Ajout en cours...")
                            : (isContentEdit
                                ? "Modifier"
                                : "Ajouter")}
                    </button>

                </form>

            </div>

        </div>
        )}
    {isContentDeleteOpen && (
        <div
            className="fixed top-0 left-0 w-full h-full bg-jci-black/30 flex items-center justify-center z-30"
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    setIsContentDeleteOpen(false);
                }
            }}
        >

            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">

                <h2 className="text-jci-black font-bold text-lg mb-3">
                    Confirmer la suppression
                </h2>

                <p className="text-sm text-jci-black/60 mb-6">
                    Êtes-vous sûr de vouloir supprimer ce contenu ?
                </p>

                <div className="flex justify-end gap-3">

                    <button
                        type="button"
                        onClick={() => setIsContentDeleteOpen(false)}
                        className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-jci-black hover:bg-gray-100 cursor-pointer"
                    >
                        Annuler
                    </button>

                    <button
                        type="button"
                        onClick={handleDeleteContent}
                        disabled={isPending}
                        className="px-4 py-2 rounded-lg bg-jci-red text-jci-black text-sm font-semibold border border-jci-red hover:bg-red-600 hover:text-jci-white cursor-pointer disabled:opacity-50"
                    >
                        Supprimer
                    </button>

                </div>

            </div>

        </div>
      )}
    {isMemberOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-jci-black/30 bg-opacity-50 flex items-center justify-center z-20"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsMemberOpen(false);
            }
          }}
        >

          <div className="relative bg-white p-6 rounded-xl shadow-lg w-full max-w-md">

            <div className="relative flex items-center justify-center mb-6">

              <h2 className="text-jci-black font-bold text-lg">
                {memberId
                  ? "Modifier les informations d'un membre de bureau"
                  : "Ajouter un membre de bureau"}
              </h2>

              <button
                type="button"
                className="absolute right-1 rounded-full p-1.5 text-jci-black/60 hover:text-jci-black hover:bg-jci-white cursor-pointer transition-colors duration-300"
                onClick={() => setIsMemberOpen(false)}
              >
                <IoClose size={18} />
              </button>

            </div>

            <form
              onSubmit={memberForm.handleSubmit(handleMemberSubmit)}
              className="flex flex-col gap-4"
            >

              {/* Image */}
              <div className="flex flex-col gap-1.5">

                <label
                  className="text-[13px] font-medium text-jci-black/80"
                  htmlFor="memberImage"
                >
                  Photo de profile
                </label>

                <label
                  htmlFor="memberImage"
                  className={`flex flex-col items-center justify-center px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer text-sm font-poppins text-gray-800 ${
                    memberImage
                      ? "border-green-500 hover:border-green-500"
                      : "hover:border-jci-yellow"
                  }`}
                >
                  <IoImages
                    size={30}
                    className="mb-2 text-gray-400"
                  />
                  {memberImage
                    ? memberImage[0].name
                    : "Choisir une image"}
                    {memberImage?.[0] && (
                        <span className="text-[11px] text-gray-400">
                            {(memberImage?.[0]?.size / 1024 / 1024).toFixed(2)} MB
                        </span>
                    )}
                </label>

                <input
                  id="memberImage"
                  type="file"
                  accept="image/*"
                  {...memberForm.register("image", {
                    required: memberId
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

                {memberForm.formState.errors.image && (
                  <span className="text-red-500 text-sm">
                    {memberForm.formState.errors.image.message}
                  </span>
                )}

              </div>

              {/* Nom */}
              <div className="flex flex-col gap-1.5">

                <label
                  className="text-[13px] font-medium text-jci-black/80"
                  htmlFor="memberName"
                >
                  Nom
                </label>

                <input
                  id="memberName"
                  type="text"
                  placeholder="Nom"
                  {...memberForm.register("name", {
                    required: "Le nom est obligatoire",
                     minLength: {
                    value: 2,
                    message: "Le nom doit contenir au moins 2 caractères",
                  },
                  maxLength: {
                    value: 100,
                    message: "Le nom ne doit pas dépasser 100 caractères",
                  },
                  pattern: {
                    value: /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/,
                    message: "Le nom contient des caractères invalides",
                  } })}
                  className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jci-yellow focus:border-jci-yellow transition-colors duration-200"
                />

                {memberForm.formState.errors.name && (
                  <span className="text-red-500 text-sm">
                    {memberForm.formState.errors.name.message}
                  </span>
                )}

              </div>

              {/* Titre */}
              <div className="flex flex-col gap-1.5">

                <label
                  className="text-[13px] font-medium text-jci-black/80"
                  htmlFor="memberTitle"
                >
                  Titre
                </label>

                <input
                  id="memberTitle"
                  type="text"
                  placeholder="Titre"
                  {...memberForm.register("title", {
                    required: "Le titre est obligatoire",
                    validate: (value) =>
                    value.trim().length >= 3 || "Le titre est trop court 3 caractères minimum"
                  })}
                  className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jci-yellow focus:border-jci-yellow transition-colors duration-200"
                />

                {memberForm.formState.errors.title && (
                  <span className="text-red-500 text-sm">
                    {memberForm.formState.errors.title.message}
                  </span>
                )}

              </div>

              {/* Ticket */}
              <div className="flex flex-col gap-1.5">

                <label
                  className="text-[13px] font-medium text-jci-black/80"
                  htmlFor="ticket"
                >
                  Ticket
                </label>

                <input
                  id="ticket"
                  type="text"
                  placeholder="Ticket"
                  {...memberForm.register("ticket", {
                    required: "Le ticket est obligatoire" ,
                    validate: (value) =>
                    value.trim().length >= 3 || "Le ticket est trop court 3 caractères minimum"
                  })}
                  className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jci-yellow focus:border-jci-yellow transition-colors duration-200"
                />

                {memberForm.formState.errors.ticket && (
                  <span className="text-red-500 text-sm">
                    {memberForm.formState.errors.ticket.message}
                  </span>
                )}

              </div>

              <button
                type="submit"
                disabled={isPending}
                className="mt-2 px-5 py-3 bg-jci-yellow rounded-lg text-jci-white font-semibold text-sm hover:text-jci-black hover:bg-jci-white border border-jci-yellow cursor-pointer transition-colors duration-300 disabled:opacity-50"
              >
                {isPending
                  ? memberId
                    ? "Modification en cours..."
                    : "Ajout en cours..."
                  : memberId
                    ? "Modifier"
                    : "Ajouter"}
              </button>

            </form>

          </div>

        </div>
      )}
      {isMemberDeleteOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-jci-black/30 flex items-center justify-center z-30"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsMemberDeleteOpen(false);
              setDeleteMemberId(null);
            }
          }}
        >

          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">

            <h2 className="text-jci-black font-bold text-lg mb-3">
              Confirmer la suppression
            </h2>

            <p className="text-sm text-jci-black/60 mb-6">
              Êtes-vous sûr de vouloir supprimer ce membre de
              l'organisation locale ?
            </p>

            <div className="flex justify-end gap-3">

              <button
                type="button"
                onClick={() => {
                  setIsMemberDeleteOpen(false);
                  setDeleteMemberId(null);
                }}
                className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-jci-black hover:bg-gray-100 cursor-pointer"
              >
                Annuler
              </button>

              <button
                type="button"
                onClick={handleDeleteMember}
                disabled={isPending}
                className="px-4 py-2 rounded-lg bg-jci-red text-jci-black text-sm font-semibold border border-jci-red cursor-pointer hover:bg-red-600 hover:text-jci-white disabled:opacity-50"
              >
                Supprimer
              </button>

            </div>

          </div>

        </div>
      )}
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
                      value: 1000,
                      message: "La citation ne doit pas dépasser 1000 caractères",
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

export default OLDetainsManager