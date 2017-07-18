import React, { Component } from 'react';
import SearchBox from './Search_Box.jsx';
import ResultsTable from './Results_Table.jsx';
import '../Styles/DataTable.css';
import '../Styles/DataTableBase.css';




class Flights extends Component {

    constructor(props) {
        super(props);

        this.state = {
            flights: [],
            filteredFlights: [],
            airports: []
        };

        this.flightSearch = this.flightSearch.bind(this);

        this.getFlightData();
    }


    getFlightData(){
        const flightsPromise = fetch('http://localhost:49868/api/flights').then((res) => res.json())
            .then((data) => {
                return data;
            });

        const airportsPromise = fetch('http://localhost:49868/api/airports').then((res) => res.json())
            .then((data => {
                return data;
            }));

            Promise.all([flightsPromise, airportsPromise]).then(values => {
                this.setState({flights: values[0], filteredFlights: values[0], airports: values[1]})
            })
    }

    flightSearch(origin, destination) {
        console.log(`origin: ${origin}, destination: ${destination}`);
        this.setState({
            filteredFlights: this.state.flights.filter(function (el) {
                return (el.From.includes(origin) || !origin) &&
                    (el.To.includes(destination) || !destination);
            })
        });
    }


    render() {
        return (
            <div>
                <div>
                    <SearchBox onSearchTermsChange={this.flightSearch} airports={this.state.airports} />
                </div>

                <br />
                <div className="row">
                    <div className="col-md-3 col-md-push-1">
                        <ResultsTable flights={this.state.filteredFlights} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Flights;