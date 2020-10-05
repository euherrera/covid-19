import React, { Component } from 'react';
class Data extends Component {

	state = {
            
    
        }
        render() {
        const {data} = this.props;
	   return (
        <div className="col-12 col-md-4 col-sm-6 col-lg-4">
		
           <p key={data.index}>{data.country}</p>
           <p key={data.index}>{data.date}</p>
           <p key={data.index}>Confirmed {data.confirmed}</p>
           <p key={data.index}>Deaths {data.deaths}</p>
           <p key={data.index}>Recovered {data.recovered}</p>
           <hr/>
        </div>
        
		);
	}

}
export default Data;