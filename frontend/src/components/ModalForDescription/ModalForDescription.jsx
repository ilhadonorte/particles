import { useState, useEffect } from 'react'
import ReactModal from 'react-modal';
import axios from "axios";
import { API_DESCRIPTION_URL } from "../../constants"; 

export default function ModalForDescription({isOpen})
{
    console.log("isOpen=", isOpen, typeof(isOpen))
    const [formData, setFormData] = useState({
        description_en: "",
        description_ru: "",
        description_pt: ""
      })
    
      const closeModal = () => {
        isOpen = false;
      };


    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
          });
        console.log("field were changed..", event.target.value)
    }  

    const handleSaveDescription = async (e) => 
        {
        e.preventDefault();
        console.log("saving new description data..")
        await axios.post(API_DESCRIPTION_URL, formData)
        .then(function (response) 
            {
                console.log("Success!", response);
                console.log("New description created: ", response.data)
                toast.success(`Description successfully created! ${response.data}` ,
                {
                    duration: 7000,
                    position: 'top-right'
                }
            );
            // setModalForEditNameIsOpen(false)
            })
        .catch(function (error) 
            {
            console.log(error, API_DESCRIPTION_URL, formData);
            console.log("Error during data posting", error.response?.data);
            toast.error('Error during data posting',
                {
                duration: 7000,
                position: 'top-right'
                });
            }
            )
    .finally(function () 
      {
        // toast('Here is your toast.')
        // выполняется всегда
      });
  
        }
        

    const modalContentForDescription = (
        <div>
          <h2>add/edit description | <a href={API_DESCRIPTION_URL} target='blank'> view all descriptions</a></h2>
          <br></br>

          <input
                type="text"
                name="description_en"
                value={formData.description_en}
                placeholder="Description..."
                onChange={handleChange}
              /> 
              <br></br>
              <input
                type="text"
                name="description_ru"
                value={formData.description_ru}
                placeholder="вариант на русском..."
                onChange={handleChange}
              />
              <br></br>
              <input
                type="text"
                name="description_pt"
                value={formData.description_pt}
                placeholder="Português..."
                onChange={handleChange}
              />
              <br></br>
              <button 
              
                onClick={() => isOpen = false}
                >Cancel 
              </button>
      
              <button onClick = {handleSaveDescription}>Save description </button>
        </div>
      )
      
    return (
        
        <ReactModal 
        isOpen={isOpen}
        onRequestClose={closeModal}
        shouldCloseOnEsc={true}
        >
          {modalContentForDescription}
        </ReactModal>
    )
}