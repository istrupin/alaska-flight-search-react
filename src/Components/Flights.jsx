import React, {Component} from 'react';
import SearchBox from './Search_Box.jsx';
import ResultsTable from './Results_Table.jsx';
import '../Styles/DataTable.css';
import '../Styles/DataTableBase.css';




class Flights extends Component {

    constructor(props) {
        super(props);

        this.state = {
            flights:[]
        };

        this.getFlights();
    }

    getFlights(){
        fetch('http://localhost:49868/api/flights').then((res) => res.json())
        .then((data) => {
            this.setState({flights: data});
            //console.log(this.state.flights);
        });
    }

    flightSearch(origin, destination){
        console.log(`origin: ${origin}, destination: ${destination}`);
    }


    render() {
        return (
            <div>
                <div>
                    <SearchBox onSearchTermsChange={this.flightSearch} />
                </div>

                <br />
                <div className="row">
                    <div className="col-md-3 col-md-push-1">
                        <ResultsTable flights={this.state.flights} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Flights;