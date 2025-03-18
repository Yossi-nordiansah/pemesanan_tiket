"use client"
import GuestForm from '@/app/_components/admin/GuestForm'
import React from 'react'

const CreateGuest = () => {

  return (
      <div>
        <h1 className="text-2xl font-bold mb-6">Create New Guest</h1>
        <GuestForm/>
      </div>
  )
}

export default CreateGuest