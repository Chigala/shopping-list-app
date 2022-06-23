import React from 'react'
import { CircularProgress, LinearProgress } from '@mui/material'
import { useDashboardLogic } from './dashboard-logic'
import { Line } from 'react-chartjs-2'
// import { Chart as ChartJS } from 'chart.js/auto'

export const Dashboard = () => {
  const { product, category } = useDashboardLogic()
  const newProduct = product

  const [charData, setCharData] = React.useState()
  //  console.log("this is the charData:", charData)
  React.useEffect(() => {
    if (!product) {
      console.log('there is no product')
    } else {
      setCharData({
        labels: product.map(data => data.name),
        datasets: [
          {
            label: 'quantity added',
            data: product.map(data => data.quantity),
            backgroundColor: [
              'rgba(75,192,192,1)',
              '#ecf0f1',
              '#50AF95',
              '#f3ba2f',
              '#2a71d0'
            ],
            borderColor: 'black',
            borderWidth: 2
          }
        ]
      })
    }
  }, [product])
  console.log('this is the chartData', charData)
  if (!product) return <CircularProgress />
  return (
    <div className='px-8 py-12 space-y-12 w-full h-full   '>
      <div className='flex-row flex justify-between   '>
        <div className='space-y-2 w-[40%]  '>
          <p className='text-xs md:text-base font-bold'>Top items</p>
          <div className='space-y-2'>
            {newProduct.slice(0, 5)?.map(element => {
              return (
                <div key={element.id} className='space-y-1'>
                  <div className='flex space-x-2 justify-between '>
                    <p className=''>{element.name}</p>
                    <p>{element.percent}%</p>
                  </div>
                  <div className=''>
                    <LinearProgress
                      value={element.percent}
                      variant='determinate'
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className=' space-y-2 w-[40%]  '>
          <p className='text-xs md:text-base font-bold'>Top category</p>
          <div className='space-y-2'>
            {category?.map(element => {
              return (
                <div key={element.id} className='space-y-1'>
                  <div className='flex space-x-2 justify-between '>
                    <p>{element.name}</p>
                    <p className='text-[9px]'>{element.percent}%</p>
                  </div>
                  <div>
                    <LinearProgress
                      variant='determinate'
                      value={element.percent}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className='bg-white '>
        <div>
          <p className='text-base font-bold'>Monthly summary </p>
        </div>
        <div>{charData ?  <Line data={charData} />: <p>No chart</p>}</div>
      </div>
    </div>
  )
}
