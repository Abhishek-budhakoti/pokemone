import { useEffect, useState } from "react";

import { PokemonCards } from "./PokemonCards.jsx";

export const Pokemon =()=>
{
const [pokemon,setPokemon]=useState([]);
const [loading,setLoading]=useState(true);
const [error,setError]=useState(null);
const[search,setsearch]=useState("")


const API ="https://pokeapi.co/api/v2/pokemon?limit=124";
const fetchPokemon = async()=>{
    try {
        const res = await fetch(API)
        const data =await res.json();
        const detailedPokemonData=data.results.map(async(curPokemon)=>{

            const res = await fetch(curPokemon.url);
            const data= await  res.json();
            return data;
        })

        const detailedResponses=  await Promise.all(detailedPokemonData);
        setPokemon(detailedResponses);
        setLoading(false);
    } catch (error) {
        console.log(error);
        setLoading(false);
        setError(error)
    }
}


useEffect(()=>{
    fetchPokemon();
},[]);
const searchData=pokemon.filter((curPokemon)=>
curPokemon.name.toLowerCase().includes(search.toLocaleLowerCase()));

if (loading) {
    return(
        <div>
            <h1>loading....</h1>
        </div>
    );
    
}
if (error) {
    return(
        <div>
            <h1>{error.message};
            </h1>
        </div>
    );
}
    return(
        <>
        <section className="container">
            <header>
                <h1>lets Catch Pokemon</h1>
            </header>
            <div className="pokemon-search">
                <input type="text" placeholder="search pokemon" 
                value={search} onChange={(e)=>setsearch(e.target.value)}/>
            </div>

            <div>
                <ul className="cards" >
                    {
                        searchData.map((curPokemon)=>{
                            return (< PokemonCards key={curPokemon.id} pokemonData={curPokemon}/>)

                        })
                    }

                </ul>
            </div>
        </section>
        </>
    );
};