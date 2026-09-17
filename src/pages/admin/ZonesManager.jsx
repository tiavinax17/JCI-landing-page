import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { zonesAPI } from '../../services/api.js';
import { LuExternalLink } from "react-icons/lu";
import { IoClose, IoAdd } from "react-icons/io5";

const ZonesManager = () => {
  const [isPending, setIsPending] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [zoneLists, setZoneLists] = useState([]);
  const [zoneId, setZoneId] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [pendingAction, setPendingAction] = useState(null);
  const [search, setSearch] = useState('');

  const zoneForm = useForm();
  const image = zoneForm.watch('image');


  const openAddModal = () => {
    setZoneId(null);

    zoneForm.reset({
      name: '',
      image: null
    });

    setIsOpen(true);
  };


  const openEditModal = (zone) => {
    setZoneId(zone.id);

    zoneForm.reset({
      name: zone.name,
      image: null,
    });

    setIsOpen(true);
  };


  const openDeleteModal = (id) => {
    setDeleteId(id);
    setIsDeleteOpen(true);
  };


  const handleSubmit = async (data) => {
    setIsOpen(false);
    setIsPending(true);
    setPendingAction('submit');

    try {
      const formData = new FormData();

      if (data.image?.[0]) {
        formData.append('picture', data.image[0]);
      }

      formData.append('name', data.name);

      if (zoneId) {
        await zonesAPI.update(zoneId, formData);
      } else {
        await zonesAPI.create(formData);
      }

      const response = await zonesAPI.getAll();

      setZoneLists(response.data);
      
      zoneForm.reset();

    } catch (error) {
      console.error('Error saving zone:', error);
    } finally {
      setIsPending(false);
    }
  };


  const handleDelete = async () => {
    setPendingAction('delete');
    setIsPending(true);

    try {
      await zonesAPI.deleteById(deleteId);

      const response = await zonesAPI.getAll();

      setZoneLists(response.data);
      setIsDeleteOpen(false);
      setDeleteId(null);

    } catch (error) {
      console.error('Error deleting zone:', error);
    } finally {
      setIsPending(false);
    }
  };


  useEffect(() => {
    const fetchZones = async () => {
      setIsPending(true);

      try {
        const response = await zonesAPI.getAll();
        setZoneLists(response.data);
      } catch (error) {
        console.error('Error fetching zones:', error);
      } finally {
        setIsPending(false);
      }
    };

    fetchZones();
  }, []);


  const filteredZoneLists = zoneLists.filter((item) => {
    const searchValue = search.toLowerCase();

    return item.name?.toLowerCase().includes(searchValue);
  });


  return (
    <div className='relative p-10 min-h-screen flex flex-col items-start gap-5 bg-gray-100 w-full'>

      <button
        className='px-5 py-2.5 bg-jci-yellow rounded-lg text-jci-white font-semibold text-sm hover:text-jci-black hover:bg-jci-white border border-jci-yellow cursor-pointer transition-colors duration-300 flex items-center gap-2'
        onClick={openAddModal}
      >
        <IoAdd size={16} />
        Ajouter une zone
      </button>


      {isPending && (
        <div className='fixed inset-0 flex flex-col items-center justify-center gap-3 bg-white/60 backdrop-blur-sm z-10'>

          <div className='w-8 h-8 border-4 border-jci-yellow border-t-transparent rounded-full animate-spin' />

          <span className='text-sm font-medium text-jci-black/60'>
            {pendingAction === 'delete'
              ? 'Suppression en cours...'
              : 'Chargement en cours...'}
          </span>

        </div>
      )}


      {isDeleteOpen && (
        <div
          className='fixed top-0 left-0 w-full h-full bg-jci-black/30 flex items-center justify-center z-20'
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsDeleteOpen(false);
              setDeleteId(null);
            }
          }}
        >
          <div className='bg-white p-6 rounded-xl shadow-lg w-full max-w-sm'>

            <h2 className='text-jci-black font-bold text-lg mb-3'>
              Confirmer la suppression
            </h2>

            <p className='text-sm text-jci-black/60 mb-6'>
              Êtes-vous sûr de vouloir supprimer cette zone ?
            </p>

            <div className='flex justify-end gap-3'>

              <button
                type='button'
                onClick={() => {
                  setIsDeleteOpen(false);
                  setDeleteId(null);
                }}
                className='px-4 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-jci-black hover:bg-gray-100 cursor-pointer'
              >
                Annuler
              </button>

              <button
                type='button'
                onClick={handleDelete}
                className='px-4 py-2 rounded-lg bg-jci-red text-jci-black text-sm font-semibold border border-jci-red cursor-pointer hover:bg-red-600 hover:text-jci-white'
              >
                Supprimer
              </button>

            </div>
          </div>
        </div>
      )}


      {isOpen && (
        <div
          className='fixed top-0 left-0 w-full h-full bg-jci-black/30 bg-opacity-50 flex items-center justify-center z-20'
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsOpen(false);
            }
          }}
        >

          <div className='relative bg-white p-6 rounded-xl shadow-lg w-full max-w-md'>

            <div className='relative flex items-center justify-center mb-6'>

              <h2 className='text-jci-black font-bold text-lg'>
                {zoneId
                  ? 'Modifier une zone'
                  : 'Ajouter une zone'}
              </h2>

              <button
                className='absolute right-1 rounded-full p-1.5 text-jci-black/60 hover:text-jci-black hover:bg-jci-white cursor-pointer transition-colors duration-300'
                onClick={() => setIsOpen(false)}
              >
                <IoClose size={18} />
              </button>

            </div>


            <form
              onSubmit={zoneForm.handleSubmit(handleSubmit)}
              className='flex flex-col gap-4'
            >

              <div className='flex flex-col gap-1.5'>

                <label
                  className='text-[13px] font-medium text-jci-black/80'
                  htmlFor='image'
                >
                  Photo de la zone
                </label>

                <label
                  htmlFor='image'
                  className={`flex items-center justify-center px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer text-sm font-poppins text-gray-800 ${
                    image
                      ? 'border-green-500 hover:border-green-500'
                      : 'hover:border-jci-yellow'
                  }`}
                >
                  {image?.[0]?.name || 'Choisir une image'}
                </label>

                <input
                  id='image'
                  type='file'
                  accept='image/*'
                  {...zoneForm.register('image', {
                    required: zoneId
                      ? false
                      : "L'image est obligatoire"
                  })}
                  className='hidden'
                />

                {zoneForm.formState.errors.image && (
                  <span className='text-red-500 text-sm'>
                    {zoneForm.formState.errors.image.message}
                  </span>
                )}

              </div>


              <div className='flex flex-col gap-1.5'>

                <label
                  className='text-[13px] font-medium text-jci-black/80'
                  htmlFor='name'
                >
                  Nom
                </label>

                <input
                  id='name'
                  type='text'
                  placeholder='Nom de la zone'
                  {...zoneForm.register('name', {
                    required: 'Le nom est obligatoire'
                  })}
                  className='px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jci-yellow focus:border-jci-yellow transition-colors duration-200'
                />

                {zoneForm.formState.errors.name && (
                  <span className='text-red-500 text-sm'>
                    {zoneForm.formState.errors.name.message}
                  </span>
                )}

              </div>


              <button
                type='submit'
                className='mt-2 px-5 py-3 bg-jci-yellow rounded-lg text-jci-white font-semibold text-sm hover:text-jci-black hover:bg-jci-white border border-jci-yellow cursor-pointer transition-colors duration-300'
              >
                {zoneId ? 'Modifier' : 'Ajouter'}
              </button>

            </form>

          </div>
        </div>
      )}


      <div className='w-full'>

        <input
          type='text'
          placeholder='Rechercher par nom...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-jci-yellow focus:border-jci-yellow'
        />

      </div>


      <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>

  {filteredZoneLists.map((item) => (

    <div
      key={item.id}
      className='bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-shadow duration-300'
    >

      {/* Photo de couverture */}
     <div className='relative w-full h-[20vh] overflow-hidden '>
        <img
          src={`${import.meta.env.VITE_BACKEND_APP_API_URL_IMAGE}${item.imgUrl}`}
          alt={item.name}
          className='w-full h-full object-cover'
        />


      </div>

      {/* Informations + actions */}
      <div className='p-4'>

        <div className='flex flex-col items-start  mb-4'>

        {/* Nom de la zone */}
          <span className='text-xs text-jci-black font-mono text-[15px] font-bold'>
            ZONE {item.name}
          </span>
          <span className='text-xs text-jci-black/50 font-mono'>
            ID : {item.id}
          </span>

        </div>

        <div className='flex items-center justify-end gap-2'>

          <button
            className='px-3 py-1.5 bg-jci-blue rounded-lg text-jci-black font-semibold text-[12px] hover:text-jci-black hover:bg-jci-white border-jci-blue border cursor-pointer transition-colors duration-300'
            onClick={() => openEditModal(item)}
          >
            Modifier
          </button>

          <button
            className='px-3 py-1.5 bg-jci-red rounded-lg text-jci-black font-semibold text-[12px] hover:text-jci-black hover:bg-jci-white hover:border-red-600 border border-transparent cursor-pointer transition-colors duration-300'
            onClick={() => openDeleteModal(item.id)}
          >
            Supprimer
          </button>

          <button
            className=' flex flex-row iterms-center gap-2 px-3 py-1.5 bg-jci-green rounded-lg text-jci-black font-semibold text-[12px] hover:text-jci-black hover:bg-jci-white hover:border-green-600 border border-transparent cursor-pointer transition-colors duration-300'
            onClick={() => window.location.href = `/admin/zones/${item.name.toLowerCase()}`}
          >
            Voir <LuExternalLink size={16}/>

          </button>

        </div>

      </div>

    </div>

  ))}

</div>

    </div>
  )
}

export default ZonesManager