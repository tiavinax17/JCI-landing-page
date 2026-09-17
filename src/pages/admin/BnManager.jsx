import React, { useEffect } from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { bnAPI } from '../../services/api.js';
import { IoClose , IoAdd } from "react-icons/io5";


const BnManager = () => {
    const [isPending, setIsPending] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [bnLists, setBnLists] = useState([]);
    const [bnMemberId, setBnMemberId] = useState(null);
    const bnForm = useForm();
    const image = bnForm.watch('image');
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [pendingAction, setPendingAction] = useState(null);
    const [search, setSearch] = useState('');

   const openAddModal = () => {
    setBnMemberId(null);
    bnForm.reset({
      name: '',
      firstName: '',
      title: '',
      image: null
    });

    setIsOpen(true);
  };

  const openEditModal = (member) => {
    setBnMemberId(member.id);
    bnForm.reset({
      name: member.name,
      firstName: member.firstName,
      title: member.title,
      image: null,
    });
    setIsOpen(true);
  }
  const openDeleteModal = (id) => {
    setDeleteId(id);
    setIsDeleteOpen(true);
  };

  const handleSubmit = async (data) => {
    setIsOpen(false);
    setPendingAction('submit');
    setIsPending(true);
    try {
      // Assuming bnAPI.create is the method to add a new BN member
      const formData = new FormData();
      if (data.image?.[0]) {
        formData.append('picture', data.image[0]);
      }
      formData.append('name', data.name);
      formData.append('firstName', data.firstName);
      formData.append('title', data.title);
      // Refresh the BN members list after adding a new member
      if(bnMemberId) {
        console.log('Updating BN member with ID:', bnMemberId);
        await bnAPI.update(bnMemberId, formData);
      } else {
        console.log('Creating new BN member');
        await bnAPI.create(formData);
      }
      const response = await bnAPI.getAll();
      setBnLists(response.data);
    } catch (error) {
      console.error('Error adding BN member:', error);
    } finally {
      setIsPending(false);
    }
  };
    const handleDelete = async () => {
      setIsDeleteOpen(false);
      setPendingAction('delete');
      setIsPending(true);
      try {
        await bnAPI.deleteById(deleteId);
        const response = await bnAPI.getAll();
        setBnLists(response.data);
        setDeleteId(null);
      } catch (error) {
        console.error('Error deleting BN member:', error);
      } finally {
        setIsPending(false);
      }
    };

  
  useEffect(() => {
    // Fetch BN members from the API
    const fetchBnMembers = async () => {
      setIsPending(true);
      try {
        const response = await bnAPI.getAll();
        setBnLists(response.data);
      } catch (error) {
        console.error('Error fetching BN members:', error);
      } finally {
        setIsPending(false);
      }
    };

    fetchBnMembers();
  }, []);

  const filteredBnLists = bnLists.filter((item) => {
    const searchValue = search.toLowerCase();

    return (
      item.name?.toLowerCase().includes(searchValue) ||
      item.firstName?.toLowerCase().includes(searchValue) ||
      item.title?.toLowerCase().includes(searchValue)
    );
  });

  return (
    <div className=' relative p-10 flex flex-col items-start gap-5 bg-gray-100 w-full'>
        <button
      className='px-5 py-2.5 bg-jci-yellow rounded-lg text-jci-white font-semibold text-sm hover:text-jci-black hover:bg-jci-white border border-jci-yellow cursor-pointer transition-colors duration-300 flex items-center gap-2'
      onClick={openAddModal}
    >
      <IoAdd size={16} />
      Ajouter un membre du bureau national
    </button>
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
            Êtes-vous sûr de vouloir supprimer ce membre du bureau national ?
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
      <div className='fixed top-0 left-0 w-full h-full bg-jci-black/30 bg-opacity-50 flex items-center justify-center'
        onClick={(e) => {
        if (e.target === e.currentTarget) {
          setIsOpen(false);
        }
      }}
      >
        <div className='relative bg-white p-6 rounded-xl shadow-lg w-full max-w-md'>
          <div className='relative flex items-center justify-center mb-6'>
            <h2 className='text-jci-black font-bold text-lg'>  
              {bnMemberId
                ? 'Modifier un membre du bureau national'
                : 'Ajouter un membre du bureau national'}
            </h2>
            <button
              className='absolute right-1 rounded-full p-1.5 text-jci-black/60 hover:text-jci-black hover:bg-jci-white cursor-pointer transition-colors duration-300'
              onClick={() => {setIsOpen(false);}}
            >
              <IoClose size={18}/>
            </button>
          </div>
          <form onSubmit={bnForm.handleSubmit(handleSubmit)}  className='flex flex-col gap-4' >
            <div className="flex flex-col gap-1.5">
              <label className='text-[13px] font-medium text-jci-black/80' htmlFor="image">
                Photo de profile
              </label>

              <label
                  htmlFor="image"
                  className={`flex items-center justify-center px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer text-sm font-poppins text-gray-800  ${image && image ? 'border-green-500 hover:border-green-500' : 'hover:border-jci-yellow'}`}
                >
                  {image && image ? image[0].name : 'Choisir une image'}
                </label>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  {...bnForm.register('image', { required: bnMemberId ? false : 'L\'image est obligatoire' })}
                  className="hidden"
                />
                {bnForm.formState.errors.image && (
                  <span className="text-red-500 text-sm">
                    {bnForm.formState.errors.image.message}
                  </span>
                )}
            </div>
            <div className='flex flex-col gap-1.5'>
              <label className='text-[13px] font-medium text-jci-black/80' htmlFor="name">Nom</label>
              <input
                id="name"
                type="text"
                placeholder="Nom"
                {...bnForm.register('name', { required: 'Le nom est obligatoire' })}
                className='px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jci-yellow focus:border-jci-yellow transition-colors duration-200'
              />
              {bnForm.formState.errors.name && (
                <span className="text-red-500 text-sm">
                  {bnForm.formState.errors.name.message}
                </span>
)}
            </div>
            <div className='flex flex-col gap-1.5'>
              <label className='text-[13px] font-medium text-jci-black/80' htmlFor="firstName">Prenom</label>
              <input
                id="firstName"
                type="text"
                placeholder="Prenom"
                {...bnForm.register('firstName', { required: 'Le prenom est obligatoire' })}
                className='px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jci-yellow focus:border-jci-yellow transition-colors duration-200'
              />
              {bnForm.formState.errors.firstName && (
                <span className="text-red-500 text-sm">
                  {bnForm.formState.errors.firstName.message}
                </span>
              )}
            </div>
            <div className='flex flex-col gap-1.5'>
              <label className='text-[13px] font-medium text-jci-black/80' htmlFor="title">Titre</label>
              <input
                id="title"
                type="text"
                placeholder="Titre"
                {...bnForm.register('title', { required: 'Le titre est obligatoire' })}
                className='px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jci-yellow focus:border-jci-yellow transition-colors duration-200'
              />
              {bnForm.formState.errors.title && (
                <span className="text-red-500 text-sm">
                  {bnForm.formState.errors.title.message}
                </span>
              )}
            </div>
            <button
              type="submit"
              className='mt-2 px-5 py-3 bg-jci-yellow rounded-lg text-jci-white font-semibold text-sm hover:text-jci-black hover:bg-jci-white border border-jci-yellow cursor-pointer transition-colors duration-300'
            >
              {bnMemberId ? 'Modifier' : 'Ajouter'}
            </button>
          </form>
        </div>
      </div>
    )}
    <div className='w-full'>
    <input
      type='text'
      placeholder='Rechercher par nom, prénom ou titre...'
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className='w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-jci-yellow focus:border-jci-yellow'
    />
  </div>
     <div className='w-full overflow-x-auto rounded-xl border border-gray-200 shadow-sm'>
        <table className='w-full border-collapse text-sm'>
          <thead className='bg-jci-blue text-jci-white font-poppins font-semibold'>
            <tr className='text-left'>
              <th className='px-4 py-3 text-left font-semibold text-[13px] uppercase tracking-wide whitespace-nowrap'>ID</th>
              <th className='px-4 py-3 text-left font-semibold text-[13px] uppercase tracking-wide whitespace-nowrap'>Image</th>
              <th className='px-4 py-3 text-left font-semibold text-[13px] uppercase tracking-wide whitespace-nowrap'>Nom</th>
              <th className='px-4 py-3 text-left font-semibold text-[13px] uppercase tracking-wide whitespace-nowrap'>prenom</th>
              <th className='px-4 py-3 text-left font-semibold text-[13px] uppercase tracking-wide whitespace-nowrap'>Titre</th>
              <th className='px-4 py-3 text-left font-semibold text-[13px] uppercase tracking-wide whitespace-nowrap'>Actions</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {filteredBnLists && filteredBnLists.map((item, index)=>(
              <tr
                key={item.id}
                className={`text-left transition-colors duration-200 hover:bg-jci-yellow/10 ${index % 2 === 0 ? "bg-gray-50" : "bg-jci-white"}`}
              >
                <td className='px-4 py-3 text-left text-jci-black/60 font-mono text-[13px] whitespace-nowrap'>{item.id}</td>
                <td className='px-4 py-3 text-left text-jci-black font-medium'>
                  <div className="w-15 h-15 rounded-full overflow-hidden">
                    <img
                      src={`${import.meta.env.VITE_BACKEND_APP_API_URL_IMAGE}${item.imgUrl}`}
                      alt={`${item.name} ${item.firstName}`}
                      className="w-full h-full object-cover"
                    />
                  </div>                
                </td>
                <td className='px-4 py-3 text-left whitespace-nowrap'>
                  <span className='px-4 py-3 text-left text-jci-black font-bold tracking-widest'>
                    {item.name}
                  </span>
                </td>
                <td className='px-4 py-3 text-left text-jci-black tracking-widest'>{item.firstName}</td>
                <td className='px-4 py-3 text-left text-jci-black tracking-widest'>
                  {item.title ? item.title : <span className='text-jci-black italic'>Pas de titre</span>}
                </td>
                <td className='px-4 py-3'>
                  <div className='flex items-center  justify-start gap-2'>
                    <button className='px-3 py-1.5 bg-jci-blue rounded-lg text-jci-black font-semibold text-[12px] hover:text-jci-black hover:bg-jci-white border-jci-blue border cursor-pointer transition-colors duration-300'
                      onClick={() => openEditModal(item)}
                    >Modifier</button>
                    <button className='px-3 py-1.5 bg-jci-red rounded-lg text-jci-black font-semibold text-[12px] hover:text-jci-black hover:bg-jci-white hover:border-red-600 border border-transparent cursor-pointer transition-colors duration-300'
                      onClick={() => openDeleteModal(item.id)}                   
                    >Supprimer</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default BnManager