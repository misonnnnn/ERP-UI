

export default function DashboardItem(){
    return (
         <div className="card-list">
            <div className="row">
                <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
                    <div className="card blue">
                        <div className="title">all projects</div>
                        <i className="zmdi zmdi-upload"></i>
                        <div className="value">89</div>
                        <div className="stat"><b>13</b>% increase</div>
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
                    <div className="card green">
                        <div className="title">team members</div>
                        <i className="zmdi zmdi-upload"></i>
                        <div className="value">5,990</div>
                        <div className="stat"><b>4</b>% increase</div>
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
                    <div className="card orange">
                        <div className="title">total budget</div>
                        <i className="zmdi zmdi-download"></i>
                        <div className="value">$80,990</div>
                        <div className="stat"><b>13</b>% decrease</div>
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
                    <div className="card red">
                        <div className="title">new customers</div>
                        <i className="zmdi zmdi-download"></i>
                        <div className="value">3</div>
                        <div className="stat"><b>13</b>% decrease</div>
                    </div>
                </div>
            </div>
        </div>
    )
}