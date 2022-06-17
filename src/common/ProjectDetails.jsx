import * as moment from 'moment'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import RemainCounter from './RemainCounter'

export const ProjectDetails = ({
  title,
  description,
  maxAmount,
  status,
  donations,
  endDate,
}) => {
  const [remain, setRemain] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  useEffect(() => {
    function calcRemainDate() {
      const remainData = RemainCounter(new Date(endDate).getTime())
      setRemain(remainData)
    }
    calcRemainDate()
  }, [endDate])

  return (
    <div className="p-3 text-center border-[2px] border-white bg-indigo-100 rounded-xl">
      <div
        className={`text-sm w-20 flex flex-wrap mt-2 absolute z-10 rounded-xl ml-2 ${
          moment() < moment(endDate) ? 'text-green-300' : 'text-red-500'
        }`}
      >
        {moment() < moment(endDate) ? status : 'End'}
      </div>
      <Image
        className="rounded-xl hover:opacity-80 duration-500"
        src="https://cdn.myimgstock.com/myimgstock/preview/tree-blur-picsart-cb-editing-full-hd-background-116435177838pfcnsgrzz.jpeg"
        alt="Landscape picture"
        width={400}
        layout="responsive"
        height={400}
      />
      <div className="uppercase font-extrabold text-xl text-green-600 mt-2">
        {title}
      </div>
      <div className="text-slate-400 font-mono">{description}</div>

      {/* progress */}
      <div className="w-full rounded-full bg-gray-600 my-2">
        <div
          className="bg-green-500 text-xs flex items-center flex-row font-light text-white text-center p-0.5 leading-none rounded-full"
          style={{ width: `${Number(5) * 10}%` }}
        >
          <p className="ml-2 p-[0.5px]">{`${Number(5) * 10}%`}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 m-2">
        <div className="bg-indigo-400 text-white p-2 rounded-l-lg sm:text-left text-center flex flex-col">
          <p className="text-green-200">No of donations</p>
          <p className="font-bold text-xl">{Object.keys(donations).length}</p>
        </div>
        <div className="bg-indigo-800 text-white p-2 rounded-r-lg flex flex-col text-center sm:text-right">
          <p className="text-green-200">Max donations</p>
          <p className="font-bold text-xl">{maxAmount} ꜩ</p>
        </div>
      </div>
      <div className="text-sm font-mono">
        <div className="flex-col text-right mr-3 flex">
          <p>
            {moment() < moment(endDate) ? (
              `End time: ${moment(endDate).format('yyyy/MM/DD HH:MM:ss')}`
            ) : (
              <p>&nbsp;</p>
            )}
          </p>
          {moment() < moment(endDate) ? (
            `${remain['days']}d ${remain['hours']}h ${remain['minutes']}m ${remain['seconds']}s`
          ) : (
            <p>&nbsp;</p>
          )}
        </div>
      </div>
      <button className="bg-green-500 text-white rounded-xl w-full h-[40px] hover:bg-green-600 mt-2 cursor-pointer">
        Project Details
      </button>
    </div>
  )
}
