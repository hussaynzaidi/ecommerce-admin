import prismadb from '@/lib/prismadb'
import React from 'react'
import { ColorForm } from './components/color-form'

const ColorsPage = async ({
    params
} : {
    params: { colorId : string}
}) => {

    const color = await prismadb.color.findUnique({
        where: {
            id: params.colorId
        }
    })

  return (
    <div className='flex-col'>
        <div className='flex-1 pt-6 p-8 space-y-4'>
            <ColorForm initialData={color}/>
        </div>
    </div>
  )
}

export default ColorsPage