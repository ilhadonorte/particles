import ParticleCard from '../ParticleCard/PacticleCard';

export default function ParticlesGroup({particlesGroup}){
    
    return(
        <div>
            {particlesGroup.map(particle => <ParticleCard key={particle.number} particle={particle}></ParticleCard>)}
        </div>
    )
}