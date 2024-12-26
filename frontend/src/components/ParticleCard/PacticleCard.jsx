
import './ParticleCard.css' 
import { API_PDG_REST_URL, API_NAME_URL } from "../../constants"; 

export default function ParticleCard({particle})
{
    let backgroundColor = "";
    if (particle.is_boson) { backgroundColor = "#EED95B"}
    else if (particle.is_lepton) { backgroundColor = "#97EC5F"}
    else if (particle.is_quark) { backgroundColor = "#DCA9F6"}
    else if (particle.is_baryon) { backgroundColor = "#138D75"}
    else if (particle.is_meson) { backgroundColor = "#EB765B"}
    else {backgroundColor = "#78281F"}
    // console.log("backgroundColor:", backgroundColor, particle.number)
    let urlForEditName = API_NAME_URL + particle.baseid 
    let urlForAllDetails = API_PDG_REST_URL + particle.baseid 


    
    return(
        <>
        <div className="particleCard"
        style={{ backgroundColor: backgroundColor }}
        >
            №{particle.number}: baseid <b>{particle.baseid}</b>, name <b>{particle.name}</b>, ({particle.name_ru}/{particle.name_pt}) 
             |<a href={urlForEditName} target='blank'> edit </a> 
             |<a href={urlForAllDetails} target='blank'> more</a>
        </div>
        </>
    )
}

