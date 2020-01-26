import React, { useEffect, useState } from 'react';
import { ResponsivePie } from '@nivo/pie';

import { BallotContainer } from '../styles';

const Ballot = ({ casted, white, absentions }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([
      {
        "id": "Exprimés",
        "label": "Exprimés",
        "value": casted,
      },
      {
        "id": "Blancs",
        "label": "Blancs",
        "value": white,
      },
      {
        "id": "Abstentions",
        "label": "Abstentions",
        "value": absentions,
      }
    ])
  }, [casted, white, absentions]);

  return (
    <>
      <BallotContainer>
        <ResponsivePie
          data={data}
          margin={{ top: 0, right: 0, bottom: 28, left: 0 }}
          startAngle={-90}
          endAngle={90}
          fit={true}
          innerRadius={0.5}
          padAngle={1}
          cornerRadius={3}
          colors={{ scheme: 'paired' }}
          borderWidth={1}
          enableRadialLabels={false}
          slicesLabelsSkipAngle={10}
          slicesLabelsTextColor="#333333"
          animate={true}
          motionStiffness={90}
          motionDamping={15}
          legends={[
            {
              anchor: 'bottom',
              direction: 'row',
              translateY: 28,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: '#999',
              symbolSize: 18,
              symbolShape: 'circle',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemTextColor: '#000'
                  }
                }
              ],
            }
          ]}
        />
      </BallotContainer>

    </>
  );
};

export default Ballot;