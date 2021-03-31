import React from 'react';
import {Line} from 'react-chartjs-2';

function Graph({ xLabels, prices }) {
  const state = {
  labels: xLabels,
  datasets: [
    {
      label: 'Rainfall',
      fill: false,
      lineTension: 0,
      backgroundColor: '#33cc33',
      borderColor: '#33cc33',
      borderWidth: 2,
      data: prices
    }
  ]
}
    return (
      <div className="chart">
        <Line
          data={state}
          options={{
            title:{
              display:false,
              text:'StarBucks',
              fontSize:20
            },
            legend:{
              display:false,
              position:'right'
            }
          }}
        />
      </div>
    );
  


}
export default Graph
