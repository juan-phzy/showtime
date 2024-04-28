interface PreferenceCardProps {
    isName: boolean;
    text: string;
    selected: boolean;
  }
  
  const PreferenceCard = ({isName, text, selected}:PreferenceCardProps) => {

    const fullNameArray = isName ? text.split(" ") : null;
    const firstName = fullNameArray ? fullNameArray.shift() : null;
    const lastNames = fullNameArray ? fullNameArray.join(" ") : null;

    return (
      <section className={`preference-card ${selected && 'selected'}`}>
          <div className='w-full h-fit flex flex-col justify-center items-center text-xs'>
            {!isName ? text : <><span>{firstName}</span><span>{lastNames}</span></>}
          </div>
      </section>
    )
  }
  
  export default PreferenceCard;