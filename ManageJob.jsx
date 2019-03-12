import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import LoggedInBanner from '../../Layout/Banner/LoggedInBanner.jsx';
import { LoggedInNavigation } from '../../Layout/LoggedInNavigation.jsx';
import { JobSummaryCard } from './JobSummaryCard.jsx';
import { BodyWrapper, loaderData } from '../../Layout/BodyWrapper.jsx';
import { Pagination, Icon, Dropdown, Checkbox, Accordion, Form, Segment } from 'semantic-ui-react';

export default class ManageJob extends React.Component {
    constructor(props) {
        super(props);
        let loader = loaderData
        loader.allowedUsers.push("Employer");
        loader.allowedUsers.push("Recruiter");
        //console.log(loader)
        this.state = {
            loadJobs: [],
            loaderData: loader,
            activePage: 1,
            sortBy: {
                date: "desc"
            },
            filter: {
                showActive: true,
                showClosed: false,
                showDraft: true,
                showExpired: true,
                showUnexpired: true
            },
            totalPages: 1,
            activeIndex: ""
        }
        this.loadData = this.loadData.bind(this);
        this.init = this.init.bind(this);
        this.loadNewData = this.loadNewData.bind(this);
        //your functions go here
    };

    init() {
        let loaderData = TalentUtil.deepCopy(this.state.loaderData)
        loaderData.isLoading = false;
        this.setState({ loaderData });//comment this

        //set loaderData.isLoading to false after getting data
        //this.loadData(() =>
        //    this.setState({ loaderData })
        //)
        
        //console.log(this.state.loaderData)
    }

    componentDidMount() {
        this.init();
    };

    loadData(callback) {
        var param = this.props.match.params.id ? this.props.match.params.id : "";
        var link = 'http://localhost:51689/listing/listing/getEmployerJobs?id=' + param;
        var cookies = Cookies.get('talentAuthToken');
       // your ajax call and other logic goes here
       $.ajax({
           url: link,
           headers: {
               'Authorization': 'Bearer ' + cookies,
               'Content-Type': 'application/json'
           },
           type: "GET",
           contentType: "application/json",
           dataType: "json",
           success: function (res) {
               console.log(res)
               let employerJobData = null;
               if (res.myJobs) {
                   employerJobData = res.myJobs
                   console.log("Jobs", employerJobData)
                   this.setState({ loadJobs: employerJobData })
                   console.log(this.state.loadJobs)

               }
           }.bind(this),
           error: function (res) {
               console.log(res.status)
           }
       })
       this.init()
    }

    loadNewData(data) {
        var loader = this.state.loaderData;
        loader.isLoading = true;
        data[loaderData] = loader;
        this.setState(data, () => {
            this.loadData(() => {
                loader.isLoading = false;
                this.setState({
                    loadData: loader
                })
            })
        });
    }

    componentDidMount() {
        this.loadData();
    }

    render() {
        console.log(this.state.loadJobs)
        return (
            <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
                <div className="ui container">
                    <h1>List of Jobs</h1>
                    <div className="ui multiple dropdown">
                        <input type="hidden" name="filters" />
                        <i className="filter icon"></i>
                        <span className="text">Filter Posts: <b>choose filter</b></span>
                        <i className="dropdown icon"></i>
                        <div className="menu">
                            <div className="ui icon search input">
                                <i className="search icon"></i>
                                <input type="text" placeholder="Search tags..." />
                            </div>
                            <div className="divider"></div>
                            <div className="header">
                                <i className="tags icon"></i>
                                Tag Label
                        </div>
                            <div className="scrolling menu">
                                <div className="item" data-value="important">
                                    <div className="ui red empty circular label"></div>
                                    Important
                        </div>
                                <div className="item" data-value="announcement">
                                    <div className="ui blue empty circular label"></div>
                                    Announcement
                        </div>
                            </div>
                        </div>
                    </div>
                    <div className="ui multiple dropdown">
                        <input type="hidden" name="filters" />
                        <i className="calendar alternate icon"></i>
                        <span className="text">Sort by Date: <b>Newest first</b></span>
                        <i className="dropdown icon"></i>
                        <div className="menu">
                            <div className="ui icon search input">
                                <i className="search icon"></i>
                                <input type="text" placeholder="Search tags..." />
                            </div>
                            <div className="divider"></div>
                            <div className="header">
                                <i className="tags icon"></i>
                                Tag Label
                        </div>
                            <div className="scrolling menu">
                                <div className="item" data-value="important">
                                    <div className="ui red empty circular label"></div>
                                    Important
                        </div>
                                <div className="item" data-value="announcement">
                                    <div className="ui blue empty circular label"></div>
                                    Announcement
                        </div>
                            </div>
                        </div>
                    </div>
                    {loaderData.isLoading ? 
                        <div className="ui three column grid">
                            {this.state.loadJobs.map(job =>
                                <JobSummaryCard
                                    key={job.id}
                                    id={job.id}
                                    title={job.title}
                                    city={job.location.city}
                                    country={job.location.country}
                                    summary={job.summary}
                                    //onClick={this.deleteData}
                                />
                            )}
                        </div>
                     :
                     <div>No Jobs Found</div>}   
                </div>
            </BodyWrapper>
        )
    }
}