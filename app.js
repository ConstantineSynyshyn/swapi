let button = document.querySelector('#button');



const getStarWarsData = ()=> {    
        axios.get('https://swapi.co/api/planets/')
        .then(res=>{
        Promise.all(res.data.results.map(planet=> Promise.all(planet.residents.map( res => axios.get(res)))) //
        )
        .then(data =>{ 
            data.map(residentsList=>{
                console.log(residentsList);
                residentsList.map( resident => {
                    console.log(resident)

                })
            });
        })                     
})
};

button.addEventListener('click', getStarWarsData);


