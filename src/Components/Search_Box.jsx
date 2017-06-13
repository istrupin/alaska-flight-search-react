import React from 'react';
import { Col, Form, FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';


const SearchBox = () => (

    <form>
        <div className="row">
            <div className="col-md-2 col-md-push-1">
                <FormGroup>
                    <ControlLabel>Origin Airport</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder="Enter text"
                    />
                    <FormControl.Feedback />
                </FormGroup>
            </div>
            <div className="col-md-2 col-md-push-1">
                <FormGroup>
                    <ControlLabel>Destination Airport</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder="Enter text"
                    />
                    <FormControl.Feedback />
                </FormGroup>
            </div>
        </div>
        <div className="row">
            <div className="col-md-2 col-md-push-1">
                <FormGroup>
                    <ControlLabel>Departure Date</ControlLabel>
                    <FormControl
                        type="date"
                        placeholder="Enter text"
                    />
                    <FormControl.Feedback />
                </FormGroup>
            </div>
            <div className="col-md-2 col-md-push-1">
                <FormGroup>
                    <ControlLabel>Arrival Date</ControlLabel>
                    <FormControl
                        type="date"
                        placeholder="Enter text"
                    />
                    <FormControl.Feedback />
                </FormGroup>
            </div>
        </div>
    </form>

)

export default SearchBox;