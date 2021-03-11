import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TournamentResults.css';
import fetchAPI from '../functions';

const TournamentResults = (props) => {

    const [id, setId] = useState();
    const [title, setTitle] = useState();
    const [date, setDate] = useState();
    const [results, setResults] = useState();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(async () => {
        const tournament = await axios(
            'https://api.eslgaming.com/play/v1/leagues/177161', {
                method: 'GET',
                mode: 'no-cors'
          }
        );
        setId(tournament.data.id)
        setTitle(tournament.data.name.full);
        setDate(tournament.data.timeline.inProgress.begin)
        //console.log(tournament)

        const tournamentResults = await axios(
            'https://api.eslgaming.com/play/v1/leagues/177161/results', {
                method: 'GET',
                mode: 'no-cors'
          }
        );
        setResults(tournamentResults);
        console.log(tournamentResults);

    },[]);

    //useEffect(() => {
        // fetchAPI("177161")
        // .then(data => {
        //     setIsLoaded(true);
        //     console.log(data)
        //     setTitle(data);
        //     //setDate(data["date"]);
        // });

    //     fetch('http://catfacts-api.appspot.com/api/facts?number=99', { mode: 'no-cors'})
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(data)
    //         setTitle(data);
    //     })
    //     .catch((error) => {
    //         console.error('Error:', error);
    //     })

    // }, []);

    return (
        <div id={id}>
            <h2>{title}</h2>
            <small>{date}</small>
            {results.data.map(match => {
                return (
                    <div>
                        <small>{match.beginAt}</small>
                        <h4>{match.participants[0].id}<span>{match.participants[0].points}</span></h4>
                        <h4>{match.participants[1].id}<span>{match.participants[1].points}</span></h4>
                    </div>
                )
            })}
        </div>
    )
}

export default TournamentResults;