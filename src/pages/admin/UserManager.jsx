import {useEffect, useState, useContext } from 'react'
import { UserContext } from '../../context/UserContext';
import { usersAPI, organisationLocalesAPI } from '../../services/api';
import {useForm} from 'react-hook-form';
import { IoClose , IoAdd, IoImages } from "react-icons/io5";
import { toast } from "sonner";


const UserManager = () => {
  const {user} = useContext(UserContext);
  const userEmail = user?.email;
  const [pendingAction, setPendingAction] = useState(null);
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(null);
  const [organisationLocales, setOrganisationLocales] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const userForm = useForm();
  const superAdmin = user?.role === 'SUPER_ADMIN';
  const selectedRole = userForm.watch('role');
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [passwordUserId, setPasswordUserId] = useState(null);
  const [searchEmail, setSearchEmail] = useState('');
  const [searchRole, setSearchRole] = useState('');

 const openAddModal = () => {
    setUserId(null);
    userForm.reset({ email: '', password: '', role: '', ol_id: '' });
    setIsOpen(true);
  }

  const openEditModal = (user) => {
    setUserId(user.id);
    userForm.reset({
      email: user.email,
      password: '',
      ol_id: user.organisationLocalId,
    });
    setIsOpen(true);
  }
  const openDeleteModal = (id) => {
    setDeleteId(id);
    setIsDeleteOpen(true);
  };

  const openResetPasswordModal = (id) => {
    setPasswordUserId(id);
    userForm.reset({ password: '' });
    setIsPasswordOpen(true);
  };


  const handleSubmit = async (data) => {
    setIsOpen(false);
    setPendingAction('submit');
    setIsPending(true);
    try {
      const payload = { ...data };
      if (userId && !payload.password) {
        delete payload.password;
      }
      if(userId){
        await usersAPI.update(userId, payload);
      } else {
        await usersAPI.create(payload);
      }
       toast.success("Compte utilisateur " + (userId ? "mis à jour" : "créé") + " avec succès");
      const res = await usersAPI.getAll();
      setUsers(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Une erreur est survenue");
    } finally {
      setIsPending(false);
    }
  }

  const handleDelete = async () => {
    setIsDeleteOpen(false);
    setPendingAction('delete');
    setIsPending(true);
    try {
      await usersAPI.deleteById(deleteId);
      const res = await usersAPI.getAll();
      toast.success("Compte utilisateur supprimé avec succès");
      setUsers(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Suppression impossible");
    } finally {
      setIsPending(false);
      setDeleteId(null);
    }
  }

  const handleResetPassword = async (data) => {
    setIsPasswordOpen(false);
    setPendingAction('password');
    setIsPending(true);

    try {
      await usersAPI.updatePassword(passwordUserId, {
        password: data.password
      });

      setPasswordUserId(null);
      toast.success("Mot de passe réinitialisé avec succès");
      userForm.reset({ password: '' });

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Impossible de réinitialiser le mot de passe"
      );
    } finally {
      setIsPending(false);
    }
  };


  useEffect(()=>{
    const fetchUsers = async () =>{
      try {
        const res = await usersAPI.getAll();
        setUsers(res.data);
      } catch (error) {
      console.log(error.response?.data?.message || "Impossible de récupérer les utilisateurs");
      }
    }
    const fetchOrganisationLocales = async () =>{
      try {
        const res = await organisationLocalesAPI.getAll();
        setOrganisationLocales(res.data);
      } catch (error) {
      console.log(error.response?.data?.message || "Impossible de récupérer les organisations locales");
      }
    }

    fetchOrganisationLocales();
    fetchUsers();
  },[])

  const filteredUsers = users.filter((user) => {
    const emailMatch = user.email
      .toLowerCase()
      .includes(searchEmail.toLowerCase());

    const roleMatch = searchRole
      ? user.role === searchRole
      : true;

    return emailMatch && roleMatch;
  });
  return (
    <div className=' relative p-10 flex flex-col items-start gap-5 bg-gray-100 w-full min-h-screen md:pt-0 pt-20 '>
      <h1 className='text-4xl font-bold text-jci-black'>Gestion des comptes utilisateurs</h1>
      <button
        className='px-5 py-2.5 bg-blue-100 rounded-lg text-blue-500 font-semibold text-sm  hover:bg-jci-white border border-blue-100 cursor-pointer transition-colors duration-300 flex items-center gap-2'
        onClick={() => {openAddModal()}}
      >
        <IoAdd size={16} />
        Ajouter un utilisateur
      </button>
        <a
          href="https://www.lastpass.com/features/password-generator"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-jci-blue underline hover:opacity-80"
        >
          Suggestion : utilisez Password Generator - LastPass pour générer un mot de passe sécurisé.
        </a>      {/* Loading indicator */}
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
            Êtes-vous sûr de vouloir supprimer cet utilisateur ?
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

    {isPasswordOpen && (
      <div
        className='absolute top-0 left-0 w-full h-full bg-jci-black/30 flex items-center justify-center z-20'
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setIsPasswordOpen(false);
            setPasswordUserId(null);
            userForm.reset({ password: '' });
          }
        }}
      >
        <div className='relative bg-white p-6 rounded-xl shadow-lg w-full max-w-md'>

          <div className='relative flex items-center justify-center mb-6'>
            <h2 className='text-jci-black font-bold text-lg'>
              Réinitialiser le mot de passe
            </h2>

            <button
              type='button'
              className='absolute right-1 rounded-full p-1.5 text-jci-black/60 hover:text-jci-black hover:bg-jci-white cursor-pointer transition-colors duration-300'
              onClick={() => {
                setIsPasswordOpen(false);
                setPasswordUserId(null);
                userForm.reset({ password: '' });
              }}
            >
              <IoClose size={18} />
            </button>
          </div>

          <form
            onSubmit={userForm.handleSubmit(handleResetPassword)}
            className='flex flex-col gap-4'
          >

            <div className='flex flex-col gap-1.5'>
              <label
                className='text-[13px] font-medium text-jci-black/80'
                htmlFor='newPassword'
              >
                Nouveau mot de passe
              </label>
              <p className='text-[11px] text-jci-black/60'>* Minimum 12 caractères, incluant une majuscule, une minuscule, un chiffre et un caractère spécial</p>
              <input
                id='newPassword'
                type='password'
                placeholder='Nouveau mot de passe'
                {...userForm.register('password', {
                  required: 'Le mot de passe est obligatoire'
                ,
                  minLength: {
                  value: 12,
                  message: "Le mot de passe doit contenir au moins 12 caractères",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{12,}$/,
                    message:
                      "Le mot de passe doit contenir une majuscule, une minuscule, un chiffre et un caractère spécial. Exemple: JciMadagascar@2026",
                  },
                 })}
                className='px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jci-yellow focus:border-jci-yellow transition-colors duration-200'
              />

              {userForm.formState.errors.password && (
                <span className='text-red-500 text-sm'>
                  {userForm.formState.errors.password.message}
                </span>
              )}
            </div>

            <button
              type='submit'
              className='mt-2 px-5 py-3 bg-jci-yellow rounded-lg text-jci-white font-semibold text-sm hover:text-jci-black hover:bg-jci-white border border-jci-yellow cursor-pointer transition-colors duration-300'
            >
              Réinitialiser
            </button>

          </form>
        </div>
      </div>
    )}
     {/* Modal for adding a user   */}
      {isOpen && (
        <div className='fixed top-0 left-0 w-full h-full bg-jci-black/30 bg-opacity-50 flex items-center justify-center'
         onClick={(e) => {
          if (e.target === e.currentTarget) {
            setIsOpen(false);
            setUserId(null);
            userForm.reset({
              email: '',
              password: '',
              role: '',
              ol_id: ''
            });
          }
        }}
        >
          <div className='relative bg-white p-6 rounded-xl shadow-lg w-full max-w-md'>
          <div className='relative flex items-center justify-center mb-6'>
            <h2 className='text-jci-black font-bold text-lg'>{userId ? "Modifier l'utilisateur" : "Ajouter un utilisateur"}</h2>
            <button
              className='absolute right-1 rounded-full p-1.5 text-jci-black/60 hover:text-jci-black hover:bg-jci-white cursor-pointer transition-colors duration-300'
              onClick={() => {setIsOpen(false); setUserId(null); userForm.reset({email: '', password: '', role: '', ol_id: ''});}}
            >
              <IoClose size={18}/>
            </button>
          </div>

          {/* Form fields for adding a user go here */}
          <form onSubmit={userForm.handleSubmit(handleSubmit)} className='flex flex-col gap-4'>
            <div className='flex flex-col gap-1.5'>
              <label className='text-[13px] font-medium text-jci-black/80' htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="example@email.com"
                {...userForm.register("email", {
                  required: "L'email est obligatoire",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Adresse email invalide",
                  },
                  maxLength: {
                    value: 254,
                    message: "Email trop long",
                  },
                })}

                className='px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jci-yellow focus:border-jci-yellow transition-colors duration-200'
              />
              {userForm.formState.errors.email && (
                  <span className="text-red-500 text-sm">
                    {userForm.formState.errors.email.message}
                  </span>
                )}
            </div>

           {!userId && (
            <div className='flex flex-col gap-1.5'>
              <label className='text-[13px] font-medium text-jci-black/80' htmlFor="password">
                Mot de passe 
              </label>
              <p className='text-[11px] text-jci-black/60'>* Minimum 12 caractères, incluant une majuscule, une minuscule, un chiffre et un caractère spécial</p>
              <input
                type="password"
                id="password"
                placeholder="Mot de passe"
                {...userForm.register('password', { 
                  required: !userId ? 'Le mot de passe est obligatoire' : false,
                  minLength: {
                  value: 12,
                  message: "Le mot de passe doit contenir au moins 12 caractères",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{12,}$/,
                    message:
                      "Le mot de passe doit contenir une majuscule, une minuscule, un chiffre et un caractère spécial. Exemple: JciMadagascar@2026",
                  },
                 })}
                className='px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jci-yellow focus:border-jci-yellow transition-colors duration-200'
              />
              {userForm.formState.errors.password && (
                  <span className="text-red-500 text-sm">
                    {userForm.formState.errors.password.message}
                  </span>
                )}
            </div>
           )}

           {!userId && (
            <div className='flex flex-col gap-1.5'>
              <label className='text-[13px] font-medium text-jci-black/80' htmlFor="role">Rôle</label>
              <select
                id="role"
                {...userForm.register('role', { required: 'Le rôle est obligatoire' })}
                className='px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-jci-yellow focus:border-jci-yellow transition-colors duration-200'
              >
                <option value="">Selectionnez un rôle</option>
                {superAdmin && <option value="SUPER_ADMIN">Super Administrateur</option>}
                <option value="ADMIN_E_COMMERCE">Administrateur e-commerce</option>
                <option value="ADMIN_NATIONAL">Administrateur national</option>
                <option value="ADMIN_LOCAL">Administrateur local</option>
              </select>
              {userForm.formState.errors.role && (
                  <span className="text-red-500 text-sm">
                    {userForm.formState.errors.role.message}
                  </span>
                )}
            </div>
           )}

            {selectedRole=== 'ADMIN_LOCAL' && (
              <div className='flex flex-col gap-1.5'>
                <label className='text-[13px] font-medium text-jci-black/80' htmlFor="ol_id">Organisation Locale</label>
                <select
                  id="ol_id"
                  {...userForm.register('ol_id')}
                  className='px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-jci-yellow focus:border-jci-yellow transition-colors duration-200'
                >
                  {organisationLocales?.length === 0 && <option value="">Aucune organisation locale disponible</option>}
                  {organisationLocales?.length > 0 && <option value="">Selectionnez une organisation locale</option>}
                  {organisationLocales?.length > 0 && organisationLocales.map((org) => (
                    <option key={org.id} value={org.id}>{org.name}</option>
                  ))}
                </select>
              </div>
            )}

            <button
              type="submit"
              className='mt-2 px-5 py-3 bg-jci-yellow rounded-lg text-jci-white font-semibold text-sm hover:text-jci-black hover:bg-jci-white border border-jci-yellow cursor-pointer transition-colors duration-300'
            >
              {userId ? "Modifier" : "Ajouter"}
            </button>
          </form>
        </div>
        </div>
      )}
      <div className='w-full flex flex-col md:flex-row gap-3'>
        <input
          type='text'
          placeholder='Rechercher par email...'
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          className='w-full md:flex-1 px-4 py-2.5 border bg-white border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jci-yellow focus:border-jci-yellow'
        />

        <select
          value={searchRole}
          onChange={(e) => setSearchRole(e.target.value)}
          className='w-full md:w-64 px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-jci-yellow focus:border-jci-yellow'
        >
          <option value=''>Tous les rôles</option>
          <option value='SUPER_ADMIN'>Super Administrateur</option>
          <option value='ADMIN_E_COMMERCE'>Administrateur e-commerce</option>
          <option value='ADMIN_NATIONAL'>Administrateur national</option>
          <option value='ADMIN_LOCAL'>Administrateur local</option>
        </select>
      </div>
      <div className='w-full overflow-x-auto rounded border border-gray-200 shadow-sm'>
        {filteredUsers && filteredUsers.length > 0 ? (
          <table className='w-full border-collapse text-sm'>
          <thead className={` ${user.role === 'SUPER_ADMIN' ? 'bg-red-900' : user.role === 'ADMIN_NATIONAL' ? 'bg-jci-black' : user.role === 'ADMIN_LOCAL' ? 'bg-green-900' : 'bg-yellow-900'} text-jci-white font-poppins font-semibold`}>
            <tr className='text-left'>
              <th className='px-4 py-3 text-left font-semibold text-[13px] uppercase tracking-wide whitespace-nowrap'>ID</th>
              <th className='px-4 py-3 text-left font-semibold text-[13px] uppercase tracking-wide whitespace-nowrap'>Email</th>
              <th className='px-4 py-3 text-left font-semibold text-[13px] uppercase tracking-wide whitespace-nowrap'>Role</th>
              <th className='px-4 py-3 text-left font-semibold text-[13px] uppercase tracking-wide whitespace-nowrap'>Organisation Locales</th>
             {superAdmin && <th className='px-4 py-3 text-left font-semibold text-[13px] uppercase tracking-wide whitespace-nowrap'>Dernière Connexion</th>}
              <th className='px-4 py-3 text-center font-semibold text-[13px] uppercase tracking-wide whitespace-nowrap'>Actions</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {filteredUsers && filteredUsers.map((user, index)=>(
              user.role === 'SUPER_ADMIN' ? (
              <tr
                key={user.id}
                className={`text-left transition-colors duration-200 hover:bg-jci-yellow/10 ${index % 2 === 0 ? "bg-gray-50" : "bg-jci-white"}`}
              >
                <td className='px-4 py-3 text-left text-jci-black/60 font-mono text-[13px] whitespace-nowrap'>{user.id}</td>
                <td className='px-4 py-3 text-left text-jci-black font-medium'>{user.email}</td>
                <td className='px-4 py-3 text-left whitespace-nowrap'>
                  <span 
                  className={`inline-block px-2.5 py-1 rounded-full font-semibold text-[11px] tracking-wide ${
                      user.role === 'SUPER_ADMIN'
                        ? 'bg-red-100 text-red-700'
                        : user.role === 'ADMIN_NATIONAL'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                    >
                    {user.role === 'SUPER_ADMIN' 
                      ? 'Super Administrateur' 
                      : user.role === 'ADMIN_NATIONAL' 
                      ? 'Administrateur National' :
                      user.role=== 'ADMIN_LOCAL'
                      ? 'Administrateur Local'
                      : 'Administrateur e-commerce'}
                  </span>
                </td>
                {/* <td className='px-4 py-3 text-left text-jci-black/40 tracking-widest'>************</td> */}
                <td className='px-4 py-3 text-left text-jci-black '>
                  {user.organisationLocalId ? user.organisationLocal.name : <span className='italic text-jci-black/40 ' >Pas d'OL</span>}
                </td>
                  {superAdmin ? <td className='px-4 py-3 text-left text-jci-black/40 italic'>
                  {user.lastLogin
                      ? new Date(user.lastLogin).toLocaleString('fr-FR', {
                          dateStyle: 'short',
                          timeStyle: 'short'
                        })
                      : <span>Jamais</span>
                    }
                </td> : <td></td>}
                 {superAdmin && (
                 <td className='px-1 py-3'>
                  <div className='flex items-center justify-center gap-2'>
                    <button className='px-3 py-1.5 bg-blue-100 rounded-lg text-blue-500 font-semibold text-[12px]  hover:bg-jci-white hover:border-blue-100 border border-transparent cursor-pointer transition-colors duration-300'
                      onClick={() => openEditModal(user)}
                    >Modifier</button>
                    <button className='px-2 py-1.5 bg-gray-100 rounded-lg text-black font-semibold text-[12px]  hover:bg-jci-white hover:border-gray-100 border border-transparent cursor-pointer transition-colors duration-300'
                      onClick={() => openResetPasswordModal(user.id)}
                    >Réinitialiser le mot de passe</button>
                     {user.email != userEmail ? (
                      <button 
                      className='px-3 py-1.5 bg-red-100 rounded-lg text-red-500 font-semibold text-[12px]  hover:bg-jci-white hover:border-red-100 border border-transparent cursor-pointer transition-colors duration-300'
                      onClick={() => openDeleteModal(user.id)}
                    >Supprimer</button>
                    ) : <button
                      className='px-2 py-1.5  rounded-lg text-jci-black font-semibold text-[12px] hover:text-jci-black hover:bg-jci-white  border border-transparent cursor-not-allowed transition-colors duration-300 opacity-50'
                      disabled
                    >
                      Ton compte
                    </button>}
                  </div>
                </td>
                 )}
              </tr>
              ) : 
              <tr
                key={user.id}
                className={`text-left transition-colors duration-200 hover:bg-jci-yellow/10 ${index % 2 === 0 ? "bg-gray-50" : "bg-jci-white"}`}
              >
                <td className='px-4 py-3 text-left text-jci-black/60 font-mono text-[13px] whitespace-nowrap'>{user.id}</td>
                <td className='px-4 py-3 text-left text-jci-black font-medium'>{user.email}</td>
                <td className='px-4 py-3 text-left whitespace-nowrap'>
                  <span
                    className={`inline-block px-2.5 py-1 rounded-full font-semibold text-[11px] tracking-wide ${
                      user.role === 'SUPER_ADMIN'
                        ? 'bg-red-500 text-red-700'
                        : user.role === 'ADMIN_NATIONAL'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {user.role === 'SUPER_ADMIN' 
                      ? 'Super Administrateur' 
                      : user.role === 'ADMIN_NATIONAL' 
                      ? 'Administrateur National' :
                      user.role=== 'ADMIN_LOCAL'
                      ? 'Administrateur Local'
                      : 'Administrateur e-commerce'}
                  </span>
                </td>
                {/* <td className='px-4 py-3 text-left text-jci-black/40 tracking-widest'>************</td> */}
                <td className='px-4 py-3 text-left text-jci-black '>
                  {user.organisationLocalId ? user.organisationLocal.name : <span className='italic text-jci-black/40 ' >Pas d'OL</span>}
                </td>
                {superAdmin && <td className='px-4 py-3 text-left text-jci-black/40 italic '>
                  {user.lastLogin
                      ? new Date(user.lastLogin).toLocaleString('fr-FR', {
                          dateStyle: 'short',
                          timeStyle: 'short'
                        })
                      : <span>Jamais</span>
                    }                
                  </td>}
                <td className='px-1 py-3'>
                  <div className='flex items-start justify-start gap-2'>
                    <button className='px-3 py-1.5 bg-blue-100 rounded-lg text-blue-500 font-semibold text-[12px]  hover:bg-jci-white hover:border-blue-100 border border-transparent cursor-pointer transition-colors duration-300'
                      onClick={() => openEditModal(user)}
                    >Modifier</button>
                    <button className='px-2 py-1.5 bg-gray-100 rounded-lg text-black font-semibold text-[12px]  hover:bg-jci-white hover:border-gray-100 border border-transparent cursor-pointer transition-colors duration-300'
                      onClick={() => openResetPasswordModal(user.id)}
                    >Réinitialiser le mot de passe</button>
                    {user.email != userEmail ? (
                      <button 
                      className='px-3 py-1.5 bg-red-100 rounded-lg text-red-500 font-semibold text-[12px]  hover:bg-jci-white hover:border-red-100 border border-transparent cursor-pointer transition-colors duration-300'
                      onClick={() => openDeleteModal(user.id)}
                    >Supprimer</button>
                    ) : <button
                      className='px-2 py-1.5 bg-jci-red rounded-lg text-jci-black font-semibold text-[12px] hover:text-jci-black hover:bg-jci-white  border border-transparent cursor-not-allowed transition-colors duration-300 opacity-50'
                      disabled
                    >
                      Ton compte
                    </button>}
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
              Aucun utilisateur pour le moment
          </p>

          <button
              type="button"
              onClick={openAddModal}
              className="text-sm font-semibold text-jci-teal hover:underline cursor-pointer"
          >
              Ajouter un compte utilisateur
          </button>

        </div>}
      </div>
    </div>
  )
}

export default UserManager