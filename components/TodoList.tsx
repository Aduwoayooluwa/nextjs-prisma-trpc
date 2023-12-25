"use client"

import { trpc } from '@/app/_trpc/client'
import React from 'react'

type Props = {}

const TodoList = (props: Props) => {
    const getTodos = trpc.getTodos.useQuery();
  return (
      <div>
          Hello world
          {JSON.stringify(getTodos.data)}
    </div>
  )
}

export default TodoList