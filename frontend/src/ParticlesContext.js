import { createContext } from 'react';

import { API_PARTICLES_URL } from "./constants"; 

const fetchParticles = async () => 
{
    try 
        {
            console.time("fetchParticles");
            const response = await fetch(API_PARTICLES_URL);
            const particles = await response.json();
            console.timeEnd("fetchParticles");
            return particles

        } 
        catch (err) 
        {
            console.log(err);
        }
        console.timeEnd("fetchParticles");
        };  


// console.log("particles context created: ", {particles})

export const ParticlesContext = createContext(await(fetchParticles()));