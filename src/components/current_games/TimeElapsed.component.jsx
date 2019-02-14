import React, { Component } from 'react';
import moment from 'moment';


class TimeElapsed extends Component {
    constructor(props) {
        super(props);
        var now = new Date();
        var date = new Date(parseInt(props.time));
        // console.log(props.time);
        this.state = {
            time: moment.utc(moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(date, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss")
        };
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
    }

    tick() {
        var now = new Date();
        var date = new Date(parseInt(this.props.time));
        this.setState({
            time: moment.utc(moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(date, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss")
        });
    }

    render() {
        if (this.props.time) {
            return (
                <td>{this.state.time}</td>
            );
        }
        return <td>-</td>
    }
}

export default TimeElapsed;
