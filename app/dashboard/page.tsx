import React from 'react'
import AddNewButton from '@/features/dashboard/components/add-new'
import AddRepo from '@/features/dashboard/components/add-repo'
import { getAllPlaygroundForUser } from '@/features/dashboard/actions'
import EmptyState from '@/features/dashboard/components/empty-state'
import ProjectTable from '@/features/auth/components/project-table'

const page = async() => {
    const playground = await getAllPlaygroundForUser()
  return (
    <div className='flex flex-col justify-start items-center min-h-screen mx-auto max-w-7xl px-4 pu-10'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full'>
            <AddNewButton />
            <AddRepo />
        </div>

        <div className="mt-10 flex flex-col justify-center items-center w-full">
{
    playground && playground.length > 0 ? (
        <EmptyState />
    ) : (
        <ProjectTable
        projects={playground || []}
                onDeleteProject={() => {}}
                 onUpdateProject={() => {}}
                 onDuplicateProject={() => {}}
                
                /> )
}

        </div>
    </div>
  )
}

export default page