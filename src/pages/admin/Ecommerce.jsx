import { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { useForm } from 'react-hook-form'
import { itemAPI } from '../../services/api.js'
import { IoClose, IoAdd, IoImages } from "react-icons/io5"
import { toast } from "sonner"

const Ecommerce = () => {
  const { user } = useContext(UserContext)

  const [isPending, setIsPending] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [itemLists, setItemLists] = useState([])
  const [itemId, setItemId] = useState(null)

  const itemForm = useForm()
  const image = itemForm.watch('image')

  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [pendingAction, setPendingAction] = useState(null)
  const [search, setSearch] = useState('')

  const openAddModal = () => {
    setItemId(null)

    itemForm.reset({
      name: '',
      description: '',
      price: '',
      image: null
    })

    setIsOpen(true)
  }

  const openEditModal = (item) => {
    setItemId(item.id)

    itemForm.reset({
      name: item.name,
      description: item.description,
      price: item.price,
      image: null
    })

    setIsOpen(true)
  }

  const openDeleteModal = (id) => {
    setDeleteId(id)
    setIsDeleteOpen(true)
  }

  const handleSubmit = async (data) => {
    setIsOpen(false)
    setPendingAction('submit')
    setIsPending(true)

    try {
      const formData = new FormData()

      if (data.image?.[0]) {
        formData.append('picture', data.image[0])
      }

      formData.append('name', data.name)
      formData.append('description', data.description)
      formData.append('priceStr', data.price)

      if (itemId) {
        const res = await itemAPI.update(itemId, formData)
        toast.success(res.data.message)
      } else {
        const res = await itemAPI.create(formData)
        toast.success(res.data.message)
      }

      const response = await itemAPI.getAll()
      setItemLists(response.data)

    } catch (error) {
      console.error('Error saving item:', error)
      toast.error(
        error.response?.data?.message || "Une erreur est survenue"
      )
    } finally {
      setIsPending(false)
    }
  }

  const handleDelete = async () => {
    setIsDeleteOpen(false)
    setPendingAction('delete')
    setIsPending(true)

    try {
      await itemAPI.deleteById(deleteId)

      toast.success("Article supprimé !")

      const response = await itemAPI.getAll()
      setItemLists(response.data)

      setDeleteId(null)

    } catch (error) {
      console.error('Error deleting item:', error)

      toast.error(
        error.response?.data?.message || "Une erreur est survenue"
      )
    } finally {
      setIsPending(false)
    }
  }

  useEffect(() => {
    const fetchItems = async () => {
      setIsPending(true)

      try {
        const response = await itemAPI.getAll()
        setItemLists(response.data)
      } catch (error) {
        console.error('Error fetching items:', error)
      } finally {
        setIsPending(false)
      }
    }

    fetchItems()
  }, [])

  const filteredItemLists = itemLists.filter((item) => {
    const searchValue = search.toLowerCase()

    return (
      item.name?.toLowerCase().includes(searchValue) ||
      item.description?.toLowerCase().includes(searchValue)
    )
  })

  return (

  <div className='relative p-5 lg:p-10 flex flex-col items-start gap-5 bg-gray-100 w-full min-h-screen lg:pt-0 pt-20'>

    <h1 className='text-4xl lg:text-4xl font-bold text-jci-black'>
      Gestion des articles
    </h1>

    <button
      className='px-5 py-2.5 bg-blue-100 rounded-lg text-blue-500 font-semibold text-sm hover:bg-jci-white border border-blue-100 cursor-pointer transition-colors duration-300 flex items-center gap-2'
      onClick={openAddModal}
    >
      <IoAdd size={16} />
      Ajouter un article
    </button>

    <p className="text-xs text-jci-blue">
      * L’ordre d’apparition : A-Z
    </p>

    {/* Loading */}
    {isPending && (
      <div className='fixed lg:absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/60 backdrop-blur-sm z-30'>
        <div className='w-8 h-8 border-4 border-jci-yellow border-t-transparent rounded-full animate-spin' />

        <span className='text-sm font-medium text-jci-black/60'>
          {pendingAction === 'delete'
            ? 'Suppression en cours...'
            : 'Chargement en cours...'}
        </span>
      </div>
    )}

    {/* Delete modal */}
    {isDeleteOpen && (
      <div
        className='fixed inset-0 bg-jci-black/30 flex items-center justify-center z-40 px-5'
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setIsDeleteOpen(false)
            setDeleteId(null)
          }
        }}
      >
        <div className='bg-white p-6 rounded-xl shadow-lg w-full max-w-sm'>

          <h2 className='text-jci-black font-bold text-lg mb-3'>
            Confirmer la suppression
          </h2>

          <p className='text-sm text-jci-black/60 mb-6'>
            Êtes-vous sûr de vouloir supprimer cet article ?
          </p>

          <div className='flex justify-end gap-3'>

            <button
              type='button'
              onClick={() => {
                setIsDeleteOpen(false)
                setDeleteId(null)
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

    {/* Add / Edit modal */}
    {isOpen && (
      <div
        className='fixed inset-0 bg-jci-black/30 flex items-center justify-center z-40 px-4 py-5 overflow-y-auto'
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setIsOpen(false)
          }
        }}
      >
        <div className='relative bg-white p-5 lg:p-6 rounded-xl shadow-lg w-full max-w-md my-auto'>

          <div className='relative flex items-center justify-center mb-6'>

            <h2 className='text-jci-black font-bold text-base lg:text-lg text-center pr-6'>
              {itemId
                ? 'Modifier un article'
                : 'Ajouter un article'}
            </h2>

            <button
              type='button'
              className='absolute right-0 rounded-full p-1.5 text-jci-black/60 hover:text-jci-black hover:bg-jci-white cursor-pointer transition-colors duration-300'
              onClick={() => setIsOpen(false)}
            >
              <IoClose size={18} />
            </button>

          </div>

          <form
            onSubmit={itemForm.handleSubmit(handleSubmit)}
            className='flex flex-col gap-4'
          >

            {/* Image */}
            <div className="flex flex-col gap-1.5">

              <label
                className='text-[13px] font-medium text-jci-black/80'
                htmlFor="image"
              >
                Image de l'article
              </label>

              <label
                htmlFor="image"
                className={`flex flex-col items-center justify-center px-4 py-6 lg:py-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer text-sm font-poppins text-gray-800 ${
                  image
                    ? 'border-green-500 hover:border-green-500'
                    : 'hover:border-jci-yellow'
                }`}
              >
                <IoImages
                  size={30}
                  className="mb-2 text-gray-400"
                />

                {image
                  ? image[0].name
                  : 'Choisir une image'}

                {image && image[0] && (
                  <span className="text-[11px] text-gray-400 mt-1">
                    {(image[0].size / 1024 / 1024).toFixed(2)} MB
                  </span>
                )}
              </label>

              <input
                id="image"
                type="file"
                accept="image/*"
                {...itemForm.register('image', {
                  required: itemId
                    ? false
                    : "L'image est obligatoire",

                  validate: {
                    validType: (files) => {
                      const file = files?.[0]

                      if (!file) return true

                      return (
                        ["image/jpeg", "image/png", "image/webp"].includes(
                          file.type
                        ) ||
                        "Formats acceptés : JPG, PNG ou WebP."
                      )
                    },

                    validSize: (files) => {
                      const file = files?.[0]

                      if (!file) return true

                      return (
                        file.size <= 5 * 1024 * 1024 ||
                        "L'image ne doit pas dépasser 5 Mo."
                      )
                    },
                  },
                })}
                className="hidden"
              />

              {itemForm.formState.errors.image && (
                <span className="text-red-500 text-sm">
                  {itemForm.formState.errors.image.message}
                </span>
              )}

            </div>

            {/* Name */}
            <div className='flex flex-col gap-1.5'>

              <label
                className='text-[13px] font-medium text-jci-black/80'
                htmlFor="name"
              >
                Nom
              </label>

              <input
                id="name"
                type="text"
                placeholder="Nom de l'article"
                {...itemForm.register('name', {
                  required: "Le nom est obligatoire",

                  minLength: {
                    value: 2,
                    message:
                      "Le nom doit contenir au moins 2 caractères",
                  },

                  maxLength: {
                    value: 100,
                    message:
                      "Le nom ne doit pas dépasser 100 caractères",
                  },
                })}
                className='w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jci-yellow focus:border-jci-yellow transition-colors duration-200'
              />

              {itemForm.formState.errors.name && (
                <span className="text-red-500 text-sm">
                  {itemForm.formState.errors.name.message}
                </span>
              )}

            </div>

            {/* Description */}
            <div className='flex flex-col gap-1.5'>

              <label
                className='text-[13px] font-medium text-jci-black/80'
                htmlFor="description"
              >
                Description
              </label>

              <textarea
                id="description"
                placeholder="Description de l'article"
                rows={4}
                {...itemForm.register('description', {
                  required: "La description est obligatoire",

                  minLength: {
                    value: 2,
                    message:
                      "La description doit contenir au moins 2 caractères",
                  },
                })}
                className='w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-jci-yellow focus:border-jci-yellow transition-colors duration-200'
              />

              {itemForm.formState.errors.description && (
                <span className="text-red-500 text-sm">
                  {itemForm.formState.errors.description.message}
                </span>
              )}

            </div>

            {/* Price */}
            <div className='flex flex-col gap-1.5'>

              <label
                className='text-[13px] font-medium text-jci-black/80'
                htmlFor="price"
              >
                Prix
              </label>

              <input
                id="price"
                type="number"
                min="0"
                placeholder="Prix"
                {...itemForm.register('price', {
                  required: "Le prix est obligatoire",

                  min: {
                    value: 0,
                    message: "Le prix ne peut pas être négatif",
                  },

                  valueAsNumber: true,
                })}
                className='w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jci-yellow focus:border-jci-yellow transition-colors duration-200'
              />

              {itemForm.formState.errors.price && (
                <span className="text-red-500 text-sm">
                  {itemForm.formState.errors.price.message}
                </span>
              )}

            </div>

            <button
              type='submit'
              className='mt-2 w-full px-5 py-3 bg-jci-yellow rounded-lg text-jci-white font-semibold text-sm hover:text-jci-black hover:bg-jci-white border border-jci-yellow cursor-pointer transition-colors duration-300'
            >
              {itemId ? 'Modifier' : 'Ajouter'}
            </button>

          </form>

        </div>
      </div>
    )}

    {/* Search */}
    <div className='w-full lg:w-[90%]'>

      <input
        type='text'
        placeholder='Rechercher par nom ou description...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-jci-yellow focus:border-jci-yellow'
      />

    </div>


    {/* ================================================= */}
    {/* DESKTOP TABLE */}
    {/* ================================================= */}

    <div className='  md:w-[90%] w-full overflow-x-auto rounded border border-gray-200 shadow-sm'>

      {filteredItemLists.length > 0 ? (

        <table className='w-full border-collapse text-sm'>

          <thead
            className={`${
              user.role === 'SUPER_ADMIN'
                ? 'bg-red-900'
                : user.role === 'ADMIN_NATIONAL'
                ? 'bg-jci-black'
                : user.role === 'ADMIN_LOCAL'
                ? 'bg-green-900'
                : 'bg-yellow-900'
            } text-jci-white font-poppins font-semibold`}
          >
            <tr className='text-left'>

              <th className='px-4 py-3 text-[13px] uppercase tracking-wide'>
                ID
              </th>

              <th className='px-4 py-3 text-[13px] uppercase tracking-wide'>
                Image
              </th>

              <th className='px-4 py-3 text-[13px] uppercase tracking-wide'>
                Nom
              </th>

              <th className='px-4 py-3 text-[13px] uppercase tracking-wide'>
                Description
              </th>

              <th className='px-4 py-3 text-[13px] uppercase tracking-wide'>
                Prix
              </th>

              <th className='px-4 py-3 text-[13px] uppercase tracking-wide'>
                Actions
              </th>

            </tr>
          </thead>

          <tbody className='divide-y divide-gray-200'>

            {filteredItemLists.map((item, index) => (

              <tr
                key={item.id}
                className={`text-left transition-colors duration-200 hover:bg-jci-yellow/10 ${
                  index % 2 === 0
                    ? "bg-gray-50"
                    : "bg-jci-white"
                }`}
              >

                <td className='px-4 py-3 text-jci-black/60 font-mono text-[13px] whitespace-nowrap'>
                  {item.id}
                </td>

                <td className='px-4 py-3'>

                  <div className="w-15 h-15 rounded-lg overflow-hidden">

                    <img
                      src={`${import.meta.env.VITE_BACKEND_APP_API_URL_IMAGE}${item.imgUrl}`}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />

                  </div>

                </td>

                <td className='px-4 py-3 whitespace-nowrap'>
                  <span className='text-jci-black font-bold tracking-wide'>
                    {item.name}
                  </span>
                </td>

                <td className='px-4 py-3 text-jci-black max-w-md'>
                  <p className="line-clamp-2">
                    {item.description}
                  </p>
                </td>

                <td className='px-4 py-3 text-jci-black font-semibold whitespace-nowrap'>
                  {Number(item.price)
                    .toLocaleString('fr-FR')
                    .replace(/\u202f/g, '.')} Ar
                </td>

                <td className='px-4 py-3'>

                  <div className='flex items-center justify-start gap-2'>

                    <button
                      className='px-3 py-1.5 bg-blue-100 rounded-lg text-blue-500 font-semibold text-[12px] hover:bg-jci-white hover:border-blue-100 border border-transparent cursor-pointer transition-colors duration-300'
                      onClick={() => openEditModal(item)}
                    >
                      Modifier
                    </button>

                    <button
                      className='px-3 py-1.5 bg-red-100 rounded-lg text-red-500 font-semibold text-[12px] hover:bg-jci-white hover:border-red-100 border border-transparent cursor-pointer transition-colors duration-300'
                      onClick={() => openDeleteModal(item.id)}
                    >
                      Supprimer
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      ) : (

        <div className="w-full py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300 flex flex-col items-center justify-center gap-3">

          <IoImages
            size={24}
            className="text-gray-400"
          />

          <p className="text-sm text-jci-black/50">
            Aucun article pour le moment
          </p>

          <button
            type="button"
            onClick={openAddModal}
            className="text-sm font-semibold text-jci-teal hover:underline cursor-pointer"
          >
            Ajouter un article
          </button>

        </div>

      )}

    </div>


    {/* ================================================= */}
    {/* MOBILE CARDS */}
    {/* ================================================= */}



  </div>
)

}

export default Ecommerce

