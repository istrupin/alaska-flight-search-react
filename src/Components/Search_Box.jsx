import React, { Component } from 'react';
import { Col, Form, FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';


class SearchBox extends Component {
    constructor(props) {
        super(props);

        this.state = {origin: '', destination: ''}
    }

    render() {
        return (
            <form>
                <div className="row">
                    <div className="col-md-2 col-md-push-1">
                        <FormGroup>
                            <ControlLabel>Origin Airport</ControlLabel>
                            <FormControl componentClass="select"
                                value={this.state.origin}
                                onChange={(e) => this.onInputChange(e.target.value,this.state.destination)}
                            >
                                {this.renderAirports()}
                            </FormControl>
                            <FormControl.Feedback />
                        </FormGroup>
                    </div>
                    <div className="col-md-2 col-md-push-1">
                        <FormGroup>
                            <ControlLabel>Destination Airport</ControlLabel>
                            <FormControl
                                componentClass="select"
                                placeholder="Enter text"
                                value={this.state.destination}
                                onChange={(e) => this.onInputChange(this.state.origin, e.target.value)}
                            >
                             {this.renderAirports()}

                            </FormControl>
                            <FormControl.Feedback />
                        </FormGroup>
                    </div>
                </div>
            </form>
        )
    }

    onInputChange(origin, destination){
        let org = origin == null ? null : origin.toUpperCase();
        let dst = destination == null ? null : destination.toUpperCase();
        
        this.setState({origin: org, destination: dst});
        this.props.onSearchTermsChange(org, dst);
    }

    renderAirports(){
        return this.props.airports.map(x => <option value={x.Code}>{x.Name}</option>);
    }
}

export default SearchBox;