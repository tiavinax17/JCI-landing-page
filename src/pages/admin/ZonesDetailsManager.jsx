import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import { IoAdd, IoClose } from "react-icons/io5";
import { zonesAPI, olAPI } from "../../services/api";
import LabelTraitSimple from "../../components/ui/LabelTraitSimple";
import { FaPen, FaRegTrashCan } from "react-icons/fa6";
import { LuExternalLink } from "react-icons/lu";
const ZonesDetailsManager = () => {
    const [zoneDetails, setZoneDetails] = useState(null);
    const [zonePsd, setZonePsd] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [pendingAction, setPendingAction] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [zoneOls, setZoneOls] = useState([]);
    const [isOlOpen, setIsOlOpen] = useState(false);
    const [isOlEdit, setIsOlEdit] = useState(false);
    const [olId, setOlId] = useState(null);
    const [isOlDeleteOpen, setIsOlDeleteOpen] = useState(false);
    const [searchOl, setSearchOl] = useState("");
    const { zone } = useParams();
    const psdForm = useForm();
    const olForm = useForm();


     const openAddModal = () => {
        setIsEdit(false);
        psdForm.reset({
            name: "",
            quote: "",
            contact: "",
            image: null
        });

        setIsOpen(true);
    };
    const openEditModal = (president) => {
        setIsEdit(true);

        psdForm.reset({
            name: president.name,
            quote: president.quote,
            contact: president.contact,
            image: null
        });

        setIsOpen(true);
    };
    const openDeleteModal = () => {
        setIsDeleteOpen(true);
    };

    const openAddOlModal = () => {
        setIsOlEdit(false);
        setOlId(null);

        olForm.reset({
            name: "",
            localisation: "",
            phone: "",
            email: "",
            mapImg: null,
            logoImg: null
        });

        setIsOlOpen(true);
    };

    const openEditOlModal = (ol) => {
        setIsOlEdit(true);
        setOlId(ol.id);

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

    const openDeleteOlModal = (id) => {
        setOlId(id);
        setIsOlDeleteOpen(true);
    };
//================================Zone President Management Handling action ==============================
    const handleSubmit = async (data) => {
        setPendingAction(isEdit ? 'edit' : 'create');
        setIsPending(true);

        try {
            const formData = new FormData();

            if (data.image?.[0]) {
                formData.append("picture", data.image[0]);
            }

            formData.append("name", data.name);
            formData.append("quote", data.quote);
            formData.append("contact", data.contact);
            formData.append("zoneId", zoneDetails.id);

            // Vérifie si nous sommes en mode édition ou création
            if (isEdit) {
                await zonesAPI.updatePsd(zonePsd.id, formData);
            } else {
                await zonesAPI.createPsd(formData);
            }

            const response = await zonesAPI.getPsdByZoneId(zoneDetails.id);
            setZonePsd(response.data);

            setIsOpen(false);
            psdForm.reset();

        } catch (error) {
            console.error(
                isEdit
                    ? "Error updating zone president:"
                    : "Error creating zone president:",
                error
            );
        } finally {
            setIsPending(false);
            setPendingAction(null);
        }
    };
    const handleDelete = async () => {
        setPendingAction('delete');
        setIsPending(true);

        try {
            await zonesAPI.deletePsd(zonePsd.id);

            setZonePsd(null);
            setIsDeleteOpen(false);

        } catch (error) {
            console.error("Error deleting zone president:", error);
        } finally {
            setIsPending(false);
            setPendingAction(null);
        }
    };

    //================================OL Management Handling action ==============================
    const handleOlSubmit = async (data) => {
        setIsOlOpen(false);
        setPendingAction(isOlEdit ? 'editOl' : 'createOl');
        setIsPending(true);

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
            formData.append("zoneId", zoneDetails.id);

            if (isOlEdit) {
                await olAPI.update(olId, formData);
            } else {
                await olAPI.create(formData);
            }

            const response = await olAPI.getAll(zoneDetails.id);
            setZoneOls(response.data);

            olForm.reset();

        } catch (error) {
            console.error(
                isOlEdit
                    ? "Error updating OL:"
                    : "Error creating OL:",
                error
            );
        } finally {
            setIsPending(false);
            setPendingAction(null);
        }
    };

    const handleDeleteOl = async () => {
        setIsOlDeleteOpen(false);
        setPendingAction('deleteOl');
        setIsPending(true);

        try {
            await olAPI.deleteById(olId);

            setZoneOls((prev) =>
                prev.filter((ol) => ol.id !== olId)
            );

            setOlId(null);

        } catch (error) {
            console.error("Error deleting OL:", error);
        } finally {
            setIsPending(false);
            setPendingAction(null);
        }
    };

    useEffect(() => {
        const fetchZoneDetails = async () => {
            try {
                const response = await zonesAPI.getByZoneName(zone.toUpperCase());
                const data = response.data;
                setZoneDetails(data);
                console.log("Fetched zone details:", data);
            } catch (error) {
                console.error("Error fetching zone details:", error);
            }
        };

        fetchZoneDetails();
    }, [zone]);

    useEffect(() => {
        const fetchZonePsd = async () => {
            if (!zoneDetails?.id) return;

            try {
                const response = await zonesAPI.getPsdByZoneId(zoneDetails.id);
                setZonePsd(response.data);
                console.log("Fetched zone PSD:", response.data);
            } catch (error) {
                console.error("Error fetching zone PSD:", error);
            }
        };

        fetchZonePsd();
    }, [zoneDetails]);

    useEffect(() => {
    const fetchZoneOls = async () => {
        if (!zoneDetails?.id) return;

        try {
            const response = await olAPI.getAll(zoneDetails.id);
            setZoneOls(response.data);
            console.log("Fetched zone OLs:", response.data);
        } catch (error) {
            console.error("Error fetching zone OLs:", error);
        }
    };

    fetchZoneOls();
}, [zoneDetails]);

    const filteredOls = zoneOls.filter((ol) =>
        ol.name.toLowerCase().includes(searchOl.toLowerCase())
    );
   

    return (
        <div className='relative p-10 flex flex-col items-start gap-5 bg-gray-100 w-full'>
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
            {/** Zone Details Section */}
            <div className="w-[90%]">

                <div
                    className="group flex flex-col gap-4 items-start w-full h-[40vh] p-5 bg-cover bg-center rounded-t-xl"
                    style={{
                        backgroundImage: `linear-gradient(to left, rgba(0, 0, 0, 0),rgba(0, 0, 0, 0), #0e0b21), url(${`${import.meta.env.VITE_BACKEND_APP_API_URL_IMAGE}${zoneDetails?.imgUrl}`})`
                    }}
                >
                    <LabelTraitSimple
                        Label="présentation"
                        H1Text={zoneDetails?.name}
                        H1Color="text-jci-white"
                        LabelColor="text-jci-teal"
                    />
                </div>


                <div className='relative pl-15 items-end gap-3 flex flex-row'>

                    <div className=' absolute border-4 bg-white border-jci-white rounded-2xl -top-15'>

                        {zonePsd ? (
                            <div className="relative">
                                <img
                                    src={`${import.meta.env.VITE_BACKEND_APP_API_URL_IMAGE}${zonePsd?.imgUrl}`}
                                    alt="President Zone"
                                    className="aspect-[50/50] w-30 rounded-xl object-cover"
                                    loading="lazy"
                                />
                               <div className="absolute bottom-1 right-1 flex items-center gap-1">
                                    <button
                                        type="button"
                                        onClick={() => openEditModal(zonePsd)}
                                        className="text-jci-teal bg-white p-2 rounded-full hover:bg-jci-teal hover:text-jci-white cursor-pointer hover:scale-105 transition-transform duration-200"
                                        title="Modifier"
                                    >
                                        <FaPen />
                                    </button>

                                    <button
                                        type="button"
                                        onClick={openDeleteModal}
                                        className="text-red-500 bg-white p-2 rounded-full hover:bg-red-500 hover:text-white cursor-pointer hover:scale-105 transition-transform duration-200"
                                        title="Supprimer"
                                    >
                                        <FaRegTrashCan />
                                    </button>

                                </div>                            
                            </div>

                        ) : (

                            <button
                                type="button"
                                onClick={openAddModal}
                                className="aspect-[50/50]  w-30 rounded-xl bg-gray-100 border-2 border-dashed border-gray-400 hover:border-green-500 flex items-center justify-center cursor-pointer hover:bg-jci-green/10 transition-colors duration-200"
                            >
                                <IoAdd
                                    size={32}
                                    className="hover:text-green-500 text-gray-400"
                                />
                            </button>

                        )}

                    </div>


                    <div className='flex flex-col gap-1 items-start ml-38'>

                        <h1 className='text-[16px] font-poppins font-normal text-jci-black mt-2'>
                            {zonePsd
                                ? zonePsd?.name
                                : "Pas encore de président"}
                        </h1>

                        <p className='text-jci-black/50 text-[12px]'>
                            {zonePsd
                                ? zonePsd?.quote
                                : "Pas encore de président"}
                        </p>
                        <p className='text-jci-black/50 text-[12px]'>
                            {zonePsd
                                ? <><span className="font-medium text-jci-black">Contact: </span>{zonePsd?.contact}</>
                                : "Pas encore de président"}
                        </p>

                    </div>

                </div>


                {/* MODAL SUPPRESSION PRÉSIDENT */}

                {isDeleteOpen && (
                    <div
                        className="fixed top-0 left-0 w-full h-full bg-jci-black/30 flex items-center justify-center z-30"
                        onClick={(e) => {
                            if (e.target === e.currentTarget) {
                                setIsDeleteOpen(false);
                            }
                        }}
                    >

                        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">

                            <h2 className="text-jci-black font-bold text-lg mb-3">
                                Confirmer la suppression
                            </h2>

                            <p className="text-sm text-jci-black/60 mb-6">
                                Êtes-vous sûr de vouloir supprimer ce président ?
                            </p>

                            <div className="flex justify-end gap-3">

                                <button
                                    type="button"
                                    onClick={() => setIsDeleteOpen(false)}
                                    className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-jci-black hover:bg-gray-100 cursor-pointer"
                                >
                                    Annuler
                                </button>

                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    disabled={isPending}
                                    className="px-4 py-2 rounded-lg bg-jci-red text-jci-black text-sm font-semibold border border-jci-red hover:bg-red-600 hover:text-jci-white cursor-pointer disabled:opacity-50"
                                >
                                    Supprimer
                                </button>

                            </div>

                        </div>

                    </div>
                )}
                {/* MODAL AJOUT PRÉSIDENT */}

                {isOpen && (
                    <div
                        className="fixed top-0 left-0 w-full h-full bg-jci-black/30 flex items-center justify-center z-20"
                        onClick={(e) => {
                            if (e.target === e.currentTarget) {
                                setIsOpen(false);
                            }
                        }}
                    >

                        <div className="relative bg-white p-6 rounded-xl shadow-lg w-full max-w-md">

                            <div className="relative flex items-center justify-center mb-6">

                                <h2 className="text-jci-black font-bold text-lg">
                                    {isEdit ? "Modifier le président" : "Ajouter un président"}
                                </h2>

                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="absolute right-1 rounded-full p-1.5 text-jci-black/60 hover:text-jci-black hover:bg-gray-100 cursor-pointer transition-colors duration-300"
                                >
                                    <IoClose size={18} />
                                </button>

                            </div>
                            <form
                                onSubmit={psdForm.handleSubmit(handleSubmit)}
                                className="flex flex-col gap-4"
                            >

                                {/* IMAGE */}

                                <div className="flex flex-col gap-1.5">

                                    <label
                                        htmlFor="image"
                                        className="text-[13px] font-medium text-jci-black/80"
                                    >
                                        Photo du président
                                    </label>

                                    <label
                                        htmlFor="image"
                                        className={`flex items-center justify-center px-4 py-8 border-2 border-dashed rounded-lg cursor-pointer text-sm ${
                                            psdForm.watch("image")
                                                ? "border-green-500"
                                                : "border-gray-300 hover:border-jci-yellow"
                                        }`}
                                    >
                                        {psdForm.watch("image")?.[0]?.name ||
                                            "Choisir une image"}
                                    </label>

                                    <input
                                        id="image"
                                        type="file"
                                        accept="image/*"
                                        {...psdForm.register("image", {
                                            required: isEdit ? false : "L'image est obligatoire"
                                        })}
                                        className="hidden"
                                    />

                                    {psdForm.formState.errors.image && (
                                        <span className="text-red-500 text-sm">
                                            {psdForm.formState.errors.image.message}
                                        </span>
                                    )}

                                </div>


                                {/* NOM */}

                                <div className="flex flex-col gap-1.5">

                                    <label
                                        htmlFor="name"
                                        className="text-[13px] font-medium text-jci-black/80"
                                    >
                                        Nom
                                    </label>

                                    <input
                                        id="name"
                                        type="text"
                                        placeholder="Nom du président"
                                        {...psdForm.register("name", {
                                            required: "Le nom est obligatoire"
                                        })}
                                        className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jci-yellow focus:border-jci-yellow"
                                    />

                                    {psdForm.formState.errors.name && (
                                        <span className="text-red-500 text-sm">
                                            {psdForm.formState.errors.name.message}
                                        </span>
                                    )}

                                </div>


                                {/* QUOTE */}

                                <div className="flex flex-col gap-1.5">

                                    <label
                                        htmlFor="quote"
                                        className="text-[13px] font-medium text-jci-black/80"
                                    >
                                        Mots de présentation
                                    </label>

                                    <textarea
                                        id="quote"
                                        placeholder="Mots de présentation du président"
                                        {...psdForm.register("quote")}
                                        className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-jci-yellow focus:border-jci-yellow"
                                    />

                                </div>


                                {/* CONTACT */}

                                <div className="flex flex-col gap-1.5">

                                    <label
                                        htmlFor="contact"
                                        className="text-[13px] font-medium text-jci-black/80"
                                    >
                                        Contact
                                    </label>

                                    <input
                                        id="contact"
                                        type="text"
                                        placeholder="Contact"
                                        {...psdForm.register("contact")}
                                        className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jci-yellow focus:border-jci-yellow"
                                    />

                                </div>


                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className="mt-2 px-5 py-3 bg-jci-yellow rounded-lg text-jci-white font-semibold text-sm hover:text-jci-black hover:bg-jci-white border border-jci-yellow cursor-pointer transition-colors duration-300 disabled:opacity-50"
                                >
                                    {isPending 
                                        ? (isEdit ? "Modification en cours..." : "Ajout en cours...")
                                        : (isEdit ? "Modifier" : "Ajouter")
                                    }
                                </button>

                            </form>

                        </div>

                    </div>
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
                                    {isOlEdit
                                        ? "Modifier l'organisation locale"
                                        : "Ajouter une organisation locale"}
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

                                <div className="flex flex-col gap-1.5">

                                    <label className="text-[13px] font-medium text-jci-black/80">
                                        Logo
                                    </label>

                                    <label
                                        htmlFor="logoImg"
                                        className="flex items-center justify-center px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer text-sm hover:border-jci-yellow"
                                    >
                                        {olForm.watch("logoImg")?.[0]?.name ||
                                            "Choisir le logo"}
                                    </label>

                                    <input
                                        id="logoImg"
                                        type="file"
                                        accept="image/*"
                                        {...olForm.register("logoImg", {
                                            required: isOlEdit
                                                ? false
                                                : "Le logo est obligatoire"
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

                                <div className="flex flex-col gap-1.5">

                                    <label className="text-[13px] font-medium text-jci-black/80">
                                        Image de localisation
                                    </label>

                                    <label
                                        htmlFor="mapImg"
                                        className="flex items-center justify-center px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer text-sm hover:border-jci-yellow"
                                    >
                                        {olForm.watch("mapImg")?.[0]?.name ||
                                            "Choisir une image"}
                                    </label>

                                    <input
                                        id="mapImg"
                                        type="file"
                                        accept="image/*"
                                        {...olForm.register("mapImg", {
                                            required: isOlEdit
                                                ? false
                                                : "L'image de localisation est obligatoire"
                                        })}
                                        className="hidden"
                                    />

                                    {olForm.formState.errors.mapImg && (
                                        <span className="text-red-500 text-sm">
                                            {olForm.formState.errors.mapImg.message}
                                        </span>
                                    )}

                                </div>


                                {/* NOM */}

                                <input
                                    type="text"
                                    placeholder="Nom de l'OL"
                                    {...olForm.register("name", {
                                        required: "Le nom est obligatoire"
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
                                        required: "La localisation est obligatoire"
                                    })}
                                    className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jci-yellow"
                                />


                                {/* TELEPHONE */}

                                <input
                                    type="text"
                                    placeholder="Téléphone"
                                    {...olForm.register("phone", {
                                        required: "Le téléphone est obligatoire"
                                    })}
                                    className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jci-yellow"
                                />


                                {/* EMAIL */}

                                <input
                                    type="email"
                                    placeholder="Email"
                                    {...olForm.register("email", {
                                        required: "L'email est obligatoire"
                                    })}
                                    className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jci-yellow"
                                />


                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className="mt-2 px-5 py-3 bg-jci-yellow rounded-lg text-jci-white font-semibold text-sm hover:text-jci-black hover:bg-jci-white border border-jci-yellow cursor-pointer transition-colors duration-300 disabled:opacity-50"
                                >
                                    {isPending
                                        ? (isOlEdit
                                            ? "Modification en cours..."
                                            : "Ajout en cours...")
                                        : (isOlEdit
                                            ? "Modifier"
                                            : "Ajouter")}
                                </button>

                            </form>

                        </div>

                    </div>
                )}
                {isOlDeleteOpen && (
                    <div
                        className="fixed top-0 left-0 w-full h-full bg-jci-black/30 flex items-center justify-center z-30"
                        onClick={(e) => {
                            if (e.target === e.currentTarget) {
                                setIsOlDeleteOpen(false);
                            }
                        }}
                    >
                        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">

                            <h2 className="text-jci-black font-bold text-lg mb-3">
                                Confirmer la suppression
                            </h2>

                            <p className="text-sm text-jci-black/60 mb-6">
                                Êtes-vous sûr de vouloir supprimer cette organisation locale ?
                            </p>

                            <div className="flex justify-end gap-3">

                                <button
                                    type="button"
                                    onClick={() => setIsOlDeleteOpen(false)}
                                    className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-jci-black hover:bg-gray-100 cursor-pointer"
                                >
                                    Annuler
                                </button>

                                <button
                                    type="button"
                                    onClick={handleDeleteOl}
                                    disabled={isPending}
                                    className="px-4 py-2 rounded-lg bg-jci-red text-jci-black text-sm font-semibold border border-jci-red hover:bg-red-600 hover:text-jci-white cursor-pointer disabled:opacity-50"
                                >
                                    Supprimer
                                </button>

                            </div>

                        </div>

                    </div>
                )}

            </div>
            {/*Ol Interface */}
            <div className="w-[90%] flex flex-col gap-5 mt-10">

                {/* HEADER */}
            <div className="flex items-center justify-between gap-5">

                <div>
                    <h2 className="text-lg font-bold text-jci-black">
                        Organisations Locales
                    </h2>

                    <p className="text-sm text-jci-black/50">
                        Les organisations locales de cette zone
                    </p>
                </div>

                <div className="flex items-center gap-3">


                    <button
                        type="button"
                        onClick={openAddOlModal}
                        className="flex items-center gap-2 px-4 py-2.5 bg-jci-yellow text-jci-white rounded-lg text-sm font-semibold hover:bg-jci-white hover:text-jci-black border border-jci-yellow transition-colors duration-300 cursor-pointer"
                    >
                        <IoAdd size={20} />
                        Ajouter une Organisation locale
                    </button>
                    <input
                        type="text"
                        value={searchOl}
                        onChange={(e) => setSearchOl(e.target.value)}
                        placeholder="Rechercher une Organisation locale..."
                        className="w-64 px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jci-yellow focus:border-jci-yellow"
                    />

                </div>

            </div>


                {/* CARDS */}

                {filteredOls.length > 0 ? (

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

                        {filteredOls.map((ol) => (

                            <div
                                key={ol.id}
                                className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                            >

                                {/* IMAGES */}

                                <div className="relative h-40 bg-gray-100">

                                    <img
                                        src={`${import.meta.env.VITE_BACKEND_APP_API_URL_IMAGE}${ol.mapImgUrl}`}
                                        alt={ol.name}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                                    <div className="absolute bottom-3 left-4 right-4 flex items-end gap-3">

                                        <img
                                            src={`${import.meta.env.VITE_BACKEND_APP_API_URL_IMAGE}${ol.logoImgUrl}`}
                                            alt={`Logo ${ol.name}`}
                                            className="w-14 h-14 rounded-lg object-cover bg-white border-2 border-white"
                                            loading="lazy"
                                        />

                                        <h3 className="text-white font-bold text-base pb-1">
                                            {ol.name}
                                        </h3>

                                    </div>

                                </div>


                                {/* INFORMATIONS */}

                                <div className="p-4 flex flex-col gap-2">

                                    <div className="flex flex-col gap-1">

                                        <span className="text-xs text-jci-black/40">
                                            Localisation
                                        </span>

                                        <p className="text-sm text-jci-black">
                                            {ol.localisation}
                                        </p>

                                    </div>

                                    <div className="flex flex-col gap-1">

                                        <span className="text-xs text-jci-black/40">
                                            Téléphone
                                        </span>

                                        <p className="text-sm text-jci-black">
                                            {ol.phone}
                                        </p>

                                    </div>

                                    <div className="flex flex-col gap-1">

                                        <span className="text-xs text-jci-black/40">
                                            Email
                                        </span>

                                        <p className="text-sm text-jci-black truncate">
                                            {ol.email}
                                        </p>

                                    </div>
                                    {/* ACTIONS */}

                                    <div className="flex justify-between gap-2 pt-3 mt-2 border-t border-gray-100">
                                        <div className="flex gap-2 justify-start">
                                             <button
                                            type="button"
                                            onClick={() => openEditOlModal(ol)}
                                            className="p-2 rounded-full text-jci-teal bg-gray-50 hover:bg-jci-teal hover:text-jci-white cursor-pointer transition-colors duration-200"
                                            title="Modifier"
                                        >
                                            <FaPen size={14} />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => openDeleteOlModal(ol.id)}
                                            className="p-2 rounded-full text-red-500 bg-gray-50 hover:bg-red-500 hover:text-white cursor-pointer transition-colors duration-200"
                                            title="Supprimer"
                                        >
                                            <FaRegTrashCan size={14} />
                                        </button>
                                        </div>
                                        <div className="flex gap-2 justify-end">
                                            <button
                                            className=' flex flex-row iterms-center gap-2 px-3 py-1.5 bg-jci-green rounded-lg text-jci-black font-semibold text-[12px] hover:text-jci-black hover:bg-jci-white hover:border-green-600 border border-transparent cursor-pointer transition-colors duration-300'
                                            onClick={() => window.location.href = `/admin/zones/organisations-locale/${zone}/${ol.id}`}
                                            >
                                            Voir <LuExternalLink size={16}/>
                                
                                            </button>
                                        </div>
                                       

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                ) : (

                    <div className="w-full py-12 bg-white rounded-xl border border-dashed border-gray-300 flex flex-col items-center justify-center gap-3">

                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                            <IoAdd
                                size={24}
                                className="text-gray-400"
                            />
                        </div>

                        <p className="text-sm text-jci-black/50">
                            Aucune organisation locale dans cette zone
                        </p>

                        <button
                            type="button"
                            onClick={openAddOlModal}
                            className="text-sm font-semibold text-jci-teal hover:underline cursor-pointer"
                        >
                            Ajouter une OL
                        </button>

                    </div>

                )}

            </div>
        </div>
    );
};

export default ZonesDetailsManager;