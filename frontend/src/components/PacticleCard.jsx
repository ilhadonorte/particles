
import './ParticleCard.css' 

export default function ParticleCard({particle})
{
    let backgroundColor = "";
    if (particle.is_boson) { backgroundColor = "#F8C47"}
    else if (particle.is_baryon) { backgroundColor = "#138D75"}
    else if (particle.is_lepton) { backgroundColor = "#00FF00"}
    else if (particle.is_meson) { backgroundColor = "#FF5733"}
    else if (particle.is_quark) { backgroundColor = "#DD33FF"}
    else {backgroundColor = "#78281F"}
    // console.log("backgroundColor:", backgroundColor, particle.number)
    return(
        <>
        <div className="particleCard"
        style={{ backgroundColor: backgroundColor }}
        >
            №{particle.number}: name {particle.name}, ({particle.name_ru}) 

        </div>
        </>
    )
}

