// let button = document.querySelector('#button');

// const getblblb = () => {
//     axios.get('https://swapi.co/api/planets/')
//         .then(result => {
//             return [{ planetName: 'earth', residents: ['urls'] }]
//         })
//         .then(planets => {
//             return [{ planetName: 'earth', speciesUrls:}]
//         })
//         .then(planets => {
//             return [{ planetName: 'earth', speciesName: [''] }]
//         })
//         .then()

// }

// const getStarWarsData = () => {
//     axios.get('https://swapi.co/api/planets/')
//         .then(res => {
//             const planetsList = res.data.results;
//             planetsList.map(planet => {
//                 const residentsListUrls = planet.residents;
//                 const residentsPromises = residentsListUrls.map(url => {
//                     return axios.get(url);
//                 })
//                 Promise.all(residentsPromises)
//                     .then(residents => {
//                         residents.map(resident => {
//                             const speciesListUrls = resident.data.species;
//                             const speciesPromises = speciesListUrls.map(url => {
//                                 return axios.get(url);

//                             })
//                             const a = Promise.all(speciesPromises)
//                                 .then(speciesArray => {
//                                     const speciesNames = speciesArray.map(specie => {
//                                         return specie.data.name;
//                                     })
//                                     console.log(speciesNames);
//                                     return speciesNames;
//                                 })
//                             console.log(a);
//                         })
//                     })
//             })

//             // Promise.all(res.data.results.map(planet => Promise.all(planet.residents.map(res => axios.get(res)))))
//             //     .then(data => {
//             //         data.map(residentsList => {
//             //             // console.log(residentsList);
//             //             residentsList.map(resident => {
//             //                 console.log(resident)

//             //             })
//             //         });
//             //     })
//         })
// };

// button.addEventListener('click', getStarWarsData);



let button = document.querySelector('#button');

const getStarWarsData = () => {
    axios.get('https://swapi.co/api/planets/')
        .then(res => {
            const planetsList = res.data.results;
            const array = planetsList.map(planet => {
                const residentsListUrls = planet.residents;
                const residentsPromises = residentsListUrls.map(url => {
                    return axios.get(url).catch(err=>  null);
                })
                
                return Promise.all(residentsPromises)
                    .then(residents => {
                        const residentsRes = residents.map(resident => {
                            const speciesListUrls = resident.data.species;
                            const speciesPromises = speciesListUrls.map(url => {
                                return axios.get(url);
                            });
                            return Promise.all(speciesPromises)
                                .then(speciesArray => {
                                    const speciesNames = speciesArray.map(specie => {
                                        return specie.data.name;
                                    });
                                    return speciesNames;
                                });
                        });

                        return Promise.all(residentsRes)
                            .then(species => {
                                const speciesArray = [].concat(...species);
                                const uniqueSpecies = [...new Set(speciesArray)]
                                const speciesString = uniqueSpecies.join(', ');
                                return { planetName: planet.name, species: speciesString };
                            });
                    });
            });
            return Promise.all(array).catch(error => console.log(error));
        })
        .then(console.table);
};

button.addEventListener('click', getStarWarsData);

