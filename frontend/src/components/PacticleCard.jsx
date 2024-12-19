
import './ParticleCard.css' 

export default function ParticleCard({particle})
{
    let backgroundColor = "";
    if (particle.is_boson) { backgroundColor = "#F8C47"}
    else if (particle.is_baryon) { backgroundColor = "#138D75"}
    else if (particle.is_lepton) { backgroundColor = "#00FF00"}
    else if (particle.is_meson) { backgroundColor = "#FF5733"}
    else if (particle.is_quark) { backgroundColor = "#bb8fce"}
    else {backgroundColor = "#78281F"}
    // console.log("backgroundColor:", backgroundColor, particle.number)
    return(
        <>
        <div className="particleCard"
        style={{ backgroundColor: backgroundColor }}
        >
            №{particle.number}: baseid <b>{particle.baseid}</b>, name <b>{particle.name}</b>, ({particle.name_ru}/{particle.name_pt}) 
             |<a href=''> edit</a>
        </div>
        </>
    )
}

