import React from 'react';
import Cookies from 'js-cookie';
import { Popup, Button,Card,Grid,Menu,Icon } from 'semantic-ui-react';
import moment from 'moment';

export class JobSummaryCard extends React.Component {
    constructor(props) {
        super(props);
        this.selectJob = this.selectJob.bind(this)
    }

    selectJob(id) {
        var cookies = Cookies.get('talentAuthToken');
        var link = 'http://localhost:51689/listing/listing/closeJob?id=' + this.props.id;
        $.ajax({
            url: link,
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                console.log(res)
                
            }.bind(this),
            error: function (res) {
                console.log(res.status)
            }
        }) 
    }



    render() {
        return (
            
            <div className="column">
                <div className="ui card fluid">
                    <div className="content">
                        <a className="ui black right ribbon label"><i className="user circle icon"></i>0</a>
                        <div className="header">
                            {this.props.title}
                        </div>
                        <div className="meta">
                            <p>{this.props.city}, {this.props.country}</p>
                        </div>
                        <div className="description">
                            {this.props.summary}
                        </div>
                    </div>
                    <div className="extra content">
                        <button className="ui negative button mini">Expired</button>
                        <div className="ui buttons right floated mini">
                            <button
                                className="ui blue basic button mini"
                                //onClick={this.selectJob}
                            >
                                <i className="ban icon"></i>
                                Close
                            </button>
                            <button
                                className="ui blue basic button mini"
                            >
                                <i className="edit outline icon"></i>
                                Edit
                            </button>
                            <button className="ui blue basic button mini"><i className="copy outline icon"></i>Copy</button>
                        </div>
                    </div>
                </div>
            </div>

           
            
   
            
            
            
            
            
            
        )
    }
}