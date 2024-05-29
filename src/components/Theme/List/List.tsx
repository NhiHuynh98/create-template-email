import React, { useState } from 'react'
import CreateTheme from '../Create-Theme/Create-Theme.tsx'
import { Card, Button } from 'antd'


const THEME = {
    "data" : [
      {
        "id": "T_001",
        "name": "Light",
        "colors": {
          "body": "#FFFFFF",
          "text": "#000000",
          "button": {
            "text": "#FFFFFF",
            "background": "#000000"
          },
          "link": {
            "text": "teal",
            "opacity": 1
          }
        },
        "font": "Tinos"
      },
      {
        "id": "T_007",
        "name": "Sea Wave",
        "colors": {
          "body": "#9be7ff",
          "text": "#0d47a1",
          "button": {
            "text": "#ffffff",
            "background": "#0d47a1"
          },
          "link": {
            "text": "#0d47a1",
            "opacity": 0.8
          }
        },
        "font": "Ubuntu"
      }
    ]
  }

interface ListThemeProps {
  hdSetTheme: (item) => void;
}

const List: React.FC<ListThemeProps> = ({ hdSetTheme }) => {
    const [list, setList] = useState(THEME.data)

    const hdSetList = (data) => {
      setList((prev) => [...prev, data])
    }
    return (
        <>
            <CreateTheme cb={(data) => hdSetList(data)}/>
            <div className='mt-4'>
            <h1>Select theme from below</h1>
            {
              list.map((item, index) => (
                  <div key={index} className='mb-3'>
                    <Card bordered={false} style={{ width: 350, height: 150, background: item.colors.body || 'none' }}>
                      <p>Click this button to set this theme</p>
                      <Button onClick={() => hdSetTheme(item)} className='my-8' type="dashed">{item.name}</Button>
                    </Card>
                  </div>
              ))
            }
            </div>
            
        </>
    )
}
export default List