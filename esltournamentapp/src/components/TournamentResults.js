import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import './TournamentResults.css';

const TournamentResults = (props) => {

    const [id, setId] = useState();
    const [title, setTitle] = useState();
    const [date, setDate] = useState();
    const [contestants, setContestants] = useState([]);
    const [results, setResults] = useState([]);

    function sortResults() {
        let selectBox = document.querySelector("select");
        let sorted;

        if(selectBox.options[selectBox.selectedIndex].value === "ASC") {
            sorted = [...results].sort(function(a,b){
                return new Date(a.beginAt) - new Date(b.beginAt);
            });
        }

        if(selectBox.options[selectBox.selectedIndex].value === "DESC") {
            sorted = [...results].sort(function(a,b){
                return new Date(b.beginAt) - new Date(a.beginAt);
            });
        }

        setResults(sorted);
    }

    useEffect(async () => {
        const tournament = await axios(
            'https://api.eslgaming.com/play/v1/leagues/' + props.tournamentID, {
                method: 'GET',
                mode: 'no-cors'
          }
        );
        setId(tournament.data.id)
        setTitle(tournament.data.name.full);
        setDate(moment(tournament.data.timeline.inProgress.begin).format("Do MMMM YYYY"));

        const tournamentContestants = await axios(
            'https://api.eslgaming.com/play/v1/leagues/' + props.tournamentID + '/contestants', {
                method: 'GET',
                mode: 'no-cors'
            }
        )

        let contestantArray = [];
        Object.entries(tournamentContestants.data).map(contestant => {
            //console.log(contestant)
            contestantArray[contestant[1].id] = contestant[1].name;
        });
        setContestants(contestantArray);

        const tournamentResults = await axios(
            'https://api.eslgaming.com/play/v1/leagues/' + props.tournamentID + '/results', {
                method: 'GET',
                mode: 'no-cors'
          }
        );

        tournamentResults.data.sort(function(a,b){
            return new Date(a.beginAt) - new Date(b.beginAt);
        });
        setResults(tournamentResults.data);

    },[]);

    return (
        <div id={id} className="container">
            <div className="header">
                <h2>{title}</h2>
                <h6>{date}</h6>
            </div>
            <div className="sort">
                <select onChange={sortResults}>
                    <option value="ASC">Date asc</option>
                    <option value="DESC">Date desc</option>
                </select>
            </div>
            {results.map(match => {
                return (
                    <div key={match.id} className="match">
                        <small className="time">{moment(match.beginAt).format("H:mm")}</small>
                        <div id={match.participants[0].id} className={(match.participants[0].points > match.participants[1].points ? "winner" : "loser")}>
                            <h4>{contestants[match.participants[0].id]}<span>{match.participants[0].points > match.participants[1].points ? <strong>{match.participants[0].points}</strong> : match.participants[0].points}</span></h4>
                        </div>
                        <div id={match.participants[1].id} className={(match.participants[1].points > match.participants[0].points ? "winner" : "loser")}>
                            <h4>{contestants[match.participants[1].id]}<span>{match.participants[1].points > match.participants[0].points ? <strong>{match.participants[1].points}</strong> : match.participants[1].points}</span></h4>
                        </div>
                    </div>
                )
            })}
        </div>
    );

}

export default TournamentResults;