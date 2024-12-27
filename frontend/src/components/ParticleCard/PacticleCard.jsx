import { useState, useEffect } from 'react'
import './ParticleCard.css' 
import { API_PDG_REST_URL, API_NAME_URL } from "../../constants"; 
import ReactModal from 'react-modal';

export default function ParticleCard({particle})
{
    const [modalForEditNameIsOpen, setModalForEditNameIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        baseid:"",
        name_en:"",
        name_ru:"",
        name_pt:""
      })

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

    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };  


    const modalContentForName = (
        <div>
            <h2>edit particle {particle.baseid} names:</h2>
            <label htmlFor="baseid">baseid </label><br></br>
            <input
                type="text"
                name="baseid"
                value={particle.baseid}
                readOnly={true}
            /> 
            <br></br>

            <label htmlFor="name_ru">название на русском </label><br></br>
            <input
                type="text"
                name="name_ru"
                value={particle.name_ru}
                // placeholder="Russian name..."
                onChange={handleChange}
            />
            <br></br>

            <label htmlFor="name_pt">nome em português </label><br></br>
            <input
                
                type="text"
                name="name_pt"
                value={particle.name_pt}
                // placeholder="Português name..."
                onChange={handleChange}
            />
            <br></br>
            
            <label htmlFor="name_en">english name </label><br></br>
            <input
                type="text"
                name="name_en"
                value={particle.name_en}
                placeholder="english name..."
                onChange={handleChange}
            />
            <br></br>
            <button onClick={() => setModalForEditNameIsOpen(false)}>Cancel </button>
            <button 
                // onClick = {editParticleName}
                >
                Save changes 
            </button>
        </div>
    )

    const closeModal = () => {
        // setModalIsOpen(false);
        setModalForEditNameIsOpen(false);
      };





    const handleEditName = (particle) => {
        // e.preventDefault()
        console.log("edit name of", particle.baseid)
        // modalContentForName
        setModalForEditNameIsOpen(true)
      }
    
    return(
        <>
            <ReactModal 
            isOpen={modalForEditNameIsOpen}
            parentSelector={() => document.querySelector('#root')}
            onRequestClose={closeModal}
            >
            {modalContentForName}
            </ReactModal>

        <div className="particleCard"
        style={{ backgroundColor: backgroundColor }}
        >
            №{particle.number}: baseid <b>{particle.baseid}</b>, name <b>{particle.name}</b>, ({particle.name_ru}/{particle.name_pt}) 
             |<a href={urlForEditName} target='blank' onClick={() =>handleEditName(particle)}> edit </a> 
             |<a href={urlForAllDetails} target='blank'> more</a>
             <button onClick={() => handleEditName(particle)}>edit name</button>
        </div>
        </>
    )
}

