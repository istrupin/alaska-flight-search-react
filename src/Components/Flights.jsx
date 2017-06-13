import React from 'react';
import SearchBox from './Search_Box.jsx';
import ResultsTable from './Results_Table.jsx';
import '../Styles/DataTable.css';
import '../Styles/DataTableBase.css';




const Flights = () => (
    <div>
        <div>
            <SearchBox />
        </div>

        <br />
        <div className="row">
        <div className="col-md-3 col-md-push-1">
            <ResultsTable  />
        </div>
        </div>
    </div>
)

export default Flights;