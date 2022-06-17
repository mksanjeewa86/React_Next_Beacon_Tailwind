import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export const Project = () => {
  const [projects, setProjects] = useState([])

  const storage = useSelector((state) => {
    return state.contractStorage
  })

  useEffect(() => {
    setProjects(storage.projects)
  }, [storage])

  return (
    <div>
      {projects.map((project) => {
        console.log(project.value)
      })}
    </div>
  )
}
