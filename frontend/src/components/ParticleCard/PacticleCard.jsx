import { useState, useEffect } from 'react'
import './ParticleCard.css' 
import { API_PDG_REST_URL, API_NAME_URL } from "../../constants"; 
import ReactModal from 'react-modal';

import axios from 'axios';

export default function ParticleCard({particle})
{
    const [modalForEditNameIsOpen, setModalForEditNameIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        baseid: "",
        name_en: "",
        name_ru: "",
        name_pt: ""
      })

    let backgroundColor = "";
    if (particle.is_boson) { backgroundColor = "#EED95B"}
    else if (particle.is_lepton) { backgroundColor = "#97EC5F"}
    else if (particle.is_quark) { backgroundColor = "#DCA9F6"}
    else if (particle.is_baryon) { backgroundColor = "#138D75"}
    else if (particle.is_meson) { backgroundColor = "#EB765B"}
    else {backgroundColor = "#78281F"}
    // console.log("backgroundColor:", backgroundColor, particle.number)
    let urlForEditName = API_NAME_URL + particle.baseid + "/"
    let urlForAllDetails = API_PDG_REST_URL + particle.baseid 



    const editParticleName = async () => 
        {
            console.log("salvando alteracoes..", formData)
            await axios.patch(urlForEditName, formData)
                .then(
                    function (response) 
                    {
                        console.log("particle names saved succesfully!", response.data)
                        console.log(response);
                        // toast.success(`particle names successfully changed! ${response.data}` ,
                        // {
                        //     duration: 7000,
                        //     position: 'top-right'
                        // });
                        setModalForEditNameIsOpen(false)
                    })
                .catch(function (error) 
                    {
                        console.log(error, urlForEditName, formData);
                        console.log("Error during data posting!", error.response?.data);
                        // toast.error('This is an error!',
                        // {
                        // duration: 7000,
                        // position: 'top-right'
                        // });
                        
                    })
                .finally(function () 
                {
                    // toast('Here is your toast.')
                    // выполняется всегда
                });
        }




    const handleChange = (e) => {
        console.log(e.target.value)
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

            <label 
                htmlFor="name_ru">название на русском  
                
            </label>
            <a href="https://ru.wikipedia.org/wiki/%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA_%D1%87%D0%B0%D1%81%D1%82%D0%B8%D1%86#:~:text=%D0%AD%D0%BB%D0%B5%D0%BC%D0%B5%D0%BD%D1%82%D0%B0%D1%80%D0%BD%D0%B0%D1%8F%20%D1%87%D0%B0%D1%81%D1%82%D0%B8%D1%86%D0%B0%20%E2%80%94%20%D1%8D%D1%82%D0%BE%20%D1%87%D0%B0%D1%81%D1%82%D0%B8%D1%86%D0%B0%20%D0%B1%D0%B5%D0%B7,%2C%20%D0%B0%20%D0%B1%D0%BE%D0%B7%D0%BE%D0%BD%D1%8B%20%E2%80%94%20%D1%86%D0%B5%D0%BB%D1%8B%D0%B9%20%D1%81%D0%BF%D0%B8%D0%BD.«" target='blank'>
                 wiki</a>
                 <br></br>
            <input
                type="text"
                name="name_ru"
                value={particle.name_ru}
                // placeholder="Russian name..."
                onChange={handleChange}
            />
            <br></br>

            <label htmlFor="name_pt">nome em português  
                <a href="https://pt.wikipedia.org/wiki/Part%C3%ADcula_elementar#:~:text=Em%20f%C3%ADsica%20de%20part%C3%ADculas%2C%20uma,como%20el%C3%A9trons%2C%20pr%C3%B3tons%20e%20n%C3%AAutrons." target='blank'>
                 wiki</a>
            </label><br></br>
            <input
                
                type="text"
                name="name_pt"
                value={particle.name_pt}
                // placeholder="Português name..."
                onChange={handleChange}
            />
            <br></br>
            
            <label htmlFor="name_en">english name  
                <a href="https://en.wikipedia.org/wiki/Elementary_particle" target='blank'>
                 wiki</a>
            </label><br></br>
            <input
                type="text"
                name="name_en"
                value={particle.name_en}
                placeholder="english name..."
                onChange={handleChange}
            />
            <br></br>
            <button onClick={() => setModalForEditNameIsOpen(false)}> Cancel </button>
            <button onClick = {editParticleName}> Save changes </button>
        </div>
    )

    const closeModal = () => {
        // setModalIsOpen(false);
        setModalForEditNameIsOpen(false);
      };





    const handleEditName = (particle, e) => {
        e.preventDefault()
        console.log("edit name of", particle.baseid, particle)
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
            [
                {particle.burns_counter > 0 ? <b>{particle.burns_counter}</b> : 0}/ 
                {particle.decays_counter > 0 ? <b>{particle.decays_counter}</b> : 0} 
                    
                
            ]
             |<a href={urlForEditName} 
             target='blank' 
             onClick={(e) =>handleEditName(particle, e)}> edit </a> 
             |<a href={urlForAllDetails} target='blank'> more</a>
             <button onClick={() => handleEditName(particle)}>edit name</button>
        </div>
        </>
    )
}

