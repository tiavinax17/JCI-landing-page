const TextAreaField = ({ Label, name, placeholder, value, onChange, rows = 5, required }) => {
  return (
    <label className='flex flex-col gap-1 text-[12px] font-poppins text-jci-black/70'>
      {Label}
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        required={required}
        className='border border-black/10 bg-jci-white rounded px-4 py-3 text-[10px] text-jci-black outline-none focus:border-jci-blue resize-none'
      />
    </label>
  )
}

export default TextAreaField
