const InputField = ({ Label, Type = "text", name, placeholder, value, onChange, required }) => {
  return (
    <label className='flex flex-col gap-1 text-[11px] font-poppins text-jci-black/70'>
      {Label}
      <input
        type={Type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className='border bg-jci-white border-black/10 rounded-[10px] px-2 py-3 text-[10px] text-jci-black outline-none focus:border-jci-blue'
      />
    </label>
  )
}

export default InputField
