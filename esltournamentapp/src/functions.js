export async function fetchAPI(path) {


    // let xhr = new XMLHttpRequest;
    // xhr.addEventListener(() => {
        
    // })
    // xhr.open('GET', "https://api.eslgaming.com/play/v1/leagues/" + path);
    // xhr.send();
    
    fetch('http://catfacts-api.appspot.com/api/facts?number=99', { mode: 'no-cors'})
        .then(response => response.json())
        .then(data => {
            return data;
    })

    // let k = new Promise( (resolve, reject) => {
    //     resolve(
    //         fetch("https://api.eslgaming.com/play/v1/leagues/" + path, {
    //                 mode: 'no-cors',
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 },
    //             }
    //         )
    //         .then(response => response.json())
    //         .then(data => {
    //             return data;
    //         })
    //     );
    //     reject(
    //         console.log("rejected")
    //     );
    // });
    // return k;
}

export default fetchAPI;