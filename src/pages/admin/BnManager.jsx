import {useEffect, useState, useContext } from 'react'
import { UserContext } from '../../context/UserContext';
import { useForm } from 'react-hook-form';
import { bnAPI } from '../../services/api.js';
import { IoClose , IoAdd, IoImages } from "react-icons/io5";
import {toast} from "sonner";


const BnManager = () => {
  const {user} = useContext(UserContext);
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
        const res =await bnAPI.update(bnMemberId, formData);
        toast.success(res.data.message);
      } else {
        console.log('Creating new BN member');
        const res = await bnAPI.create(formData);
        toast.success(res.data.message);
      }
      const response = await bnAPI.getAll();
      setBnLists(response.data);
    } catch (error) {
      console.error('Error adding BN member:', error);
      toast.error(error.response?.data?.message || "Une erreur est survenue");
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
        toast.success("Membre du Bureau National supprimé !");
        const response = await bnAPI.getAll();
        setBnLists(response.data);
        setDeleteId(null);
      } catch (error) {
        console.error('Error deleting BN member:', error);
        toast.error(error.response?.data?.message || "Une erreur est survenue");
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
    <div className=' relative p-10 flex flex-col items-start gap-5 bg-gray-100 w-full min-h-screen md:pt-0 pt-20'>
      <h1 className='text-4xl font-bold text-jci-black'>Gestion des membres du bureau national</h1>
      <button
        className='px-5 py-2.5 bg-blue-100 rounded-lg text-blue-500 font-semibold text-sm  hover:bg-jci-white border border-blue-100 cursor-pointer transition-colors duration-300 flex items-center gap-2'
        onClick={openAddModal}
      >
        <IoAdd size={16} />
        Ajouter un membre du bureau national
      </button>
      <p className="text-xs text-jci-blue">
     * L’ordre d’ajout suivra l’ordre d’apparition : première entrée, première apparue.
    </p>
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
                  className={`flex flex-col items-center justify-center px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer text-sm font-poppins text-gray-800  ${image && image ? 'border-green-500 hover:border-green-500' : 'hover:border-jci-yellow'}`}
                >
                  <IoImages
                    size={30}
                    className="mb-2 text-gray-400"
                  />
                  {image && image ? image[0].name : 'Choisir une image'}
                  {image && image && (
                    <span className="text-[11px] text-gray-400 mt-1">
                        {(image[0].size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  )}
                </label>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  {...bnForm.register('image', { required: bnMemberId ? false : 'L\'image est obligatoire' ,
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
                {...bnForm.register('name', { required: "Le nom est obligatoire",
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
                {...bnForm.register('firstName', { required: "Le prénom est obligatoire",
                  minLength: {
                    value: 2,
                    message: "Le prénom doit contenir au moins 2 caractères",
                  },
                  maxLength: {
                    value: 100,
                    message: "Le prénom ne doit pas dépasser 100 caractères",
                  },
                  pattern: {
                    value: /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/,
                    message: "Le prénom contient des caractères invalides",
                  } })}
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
    <div className='w-[90%]'>
    <input
      type='text'
      placeholder='Rechercher par nom, prénom ou titre...'
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className='w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-jci-yellow focus:border-jci-yellow'
    />
  </div>
     <div className='md:w-[90%] w-full overflow-x-auto rounded border border-gray-200 shadow-sm'>
      {filteredBnLists.length > 0 ? (
        <table className='w-full border-collapse text-sm'>
          <thead className={` ${user.role === 'SUPER_ADMIN' ? 'bg-red-900' : user.role === 'ADMIN_NATIONAL' ? 'bg-jci-black' : user.role === 'ADMIN_LOCAL' ? 'bg-green-900' : 'bg-yellow-900'} text-jci-white font-poppins font-semibold`}>
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
                      loading="lazy"
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
                    <button
                     className='px-3 py-1.5 bg-blue-100 rounded-lg text-blue-500 font-semibold text-[12px]  hover:bg-jci-white hover:border-blue-100 border border-transparent cursor-pointer transition-colors duration-300'
                      onClick={() => openEditModal(item)}
                    >Modifier</button>
                    <button 
                    className='px-3 py-1.5 bg-red-100 rounded-lg text-red-500 font-semibold text-[12px]  hover:bg-jci-white hover:border-red-100 border border-transparent cursor-pointer transition-colors duration-300'
                      onClick={() => openDeleteModal(item.id)}                   
                    >Supprimer</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>)
        :
        <div className="w-full py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300 flex flex-col items-center justify-center gap-3">

          <div className="w-12 h-12  flex items-center justify-center">
              <IoImages
              size={24}
              className="text-gray-400"
              />
          </div>

          <p className="text-sm text-jci-black/50">
              Aucun membre du bureau national pour le moment
          </p>

          <button
              type="button"
              onClick={openAddModal}
              className="text-sm font-semibold text-jci-teal hover:underline cursor-pointer"
          >
              Ajouter un membre du bureau national
          </button>

        </div>}
      </div>
    </div>
  )
}

export default BnManager