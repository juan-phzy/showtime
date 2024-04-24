interface PreferenceCardProps {
    selected: boolean;
    title: string;
    distance: string;
    address: string;
    city: string;
    state: string;
  }
  
  const PreferenceCard = ({title,distance,address,city,state,selected}:PreferenceCardProps) => {
    const formattedDistance = (parseFloat(distance).toFixed(1)).toString();
    return (
      <section className={`cinema-card ${selected && 'selected'}`}>
          <div className='w-full h-fit flex justify-start items-center text-lg'>{title}</div>
          <div className='w-full h-fit flex justify-start items-center text-xs'>
            {formattedDistance} mi away | {`${address}, ${city}, ${state}`}
          </div>
      </section>
    )
  }
  
  export default PreferenceCard;