const StatBlock = ({ Value, Label, TextColor, TextColor2, TextColor3, BGColor }) => {
  return (
    <div
      className={`
        group relative overflow-hidden rounded
        border border-jci-blue/10
        w-[32vw] max-w-35
        aspect-[1.55/1]
        px-4 py-3
        ${BGColor ? BGColor : ""}
      `}
    >
      {/* Value géant en filigrane derrière le contenu */}
      <span
        className={`
          absolute -top-8 left-1/2 -translate-x-1/2
          text-[100px] leading-none
          font-roboto font-black opacity-10
          pointer-events-none select-none whitespace-nowrap
          transition-transform duration-300 ease-out
          group-hover:scale-125
          ${TextColor3 ? TextColor3 : "text-jci-teal"}
        `}
      >
        {Value}
      </span>

      <div className="relative flex flex-col justify-center items-center -mt-5">
        <h1
          className={`
            text-[36px] tracking-tighter
            font-roboto font-black
            ${TextColor ? TextColor : "text-jci-black"}
          `}
        >
          {Value}
        </h1>

        <p
          className={`
            text-[12px] -mt-4
            font-poppins font-bold
            ${TextColor2 ? TextColor2 : "text-jci-white"}
          `}
        >
          {Label}
        </p>
      </div>
    </div>
  )
}

export default StatBlock