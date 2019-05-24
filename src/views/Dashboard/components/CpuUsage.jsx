import React from 'react';
import { CartesianGrid, ResponsiveContainer, LineChart, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';
import './cpuUsage.scss';

class CpuUsage extends React.Component {
  render() {
    const { data } = this.props;
    return <div>
      <div className="title">
        <div className="item">
          <div>usage</div>
          <p>{data.usage}GB</p>
        </div>
        <div className="item">
          <div>space</div>
          <p>{data.space}GB</p>
        </div>
        <div className="item">
          <div>cpu</div>
          <p>{data.cpu}%</p>
        </div>
      </div>
      <div id="cpu">
        <ResponsiveContainer width="100%" height={295}>
          <LineChart
            data={data.data}
            margin={{ left: -35, right: 10 }}
          > 
            <CartesianGrid vertical={false} />
            <XAxis tickLine={false} dataKey="name" axisLine={false} />
            <YAxis tickLine={false} dataKey="cpu" />
            <Tooltip />
            <Line dataKey="cpu" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  }
}

export default CpuUsage;