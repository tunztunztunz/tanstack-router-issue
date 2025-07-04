import { createFileRoute } from '@tanstack/react-router'
import { useUser } from '@clerk/clerk-react'
import { useQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user, isLoaded } = useUser()
  
  // Simulate the usePlayer hook
  const playerQuery = useQuery({
    queryKey: ['player', user?.id],
    enabled: isLoaded && !!user,
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 100))
      return { _id: 'player123' }
    },
  })

  // Simulate the useGladiators hook
  const gladiatorsQuery = useQuery({
    queryKey: ['gladiators', playerQuery.data?._id],
    enabled: !!playerQuery.data?._id,
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 200))
      return [{ id: 'glad1', name: 'Test Gladiator' }]
    },
  })

  console.log('isLoaded:', isLoaded, 'user:', !!user, 'player:', !!playerQuery.data, 'gladiators:', gladiatorsQuery.data)

  return (
    <div style={{ padding: '20px' }}>
      <h1>Flash Issue Reproduction</h1>
      
      {/* Show gladiator overview if we have gladiators, otherwise show create component */}
      {gladiatorsQuery.data && gladiatorsQuery.data.length > 0 ? (
        <div style={{ 
          background: 'green', 
          color: 'white', 
          padding: '20px', 
          margin: '10px 0',
          border: '2px solid darkgreen'
        }}>
          <h2>GladiatorOverviewCard</h2>
          <p>This should show after the flash</p>
          <p>Gladiator: {gladiatorsQuery.data[0].name}</p>
        </div>
      ) : (
        <div style={{ 
          background: 'red', 
          color: 'white', 
          padding: '20px', 
          margin: '10px 0',
          border: '2px solid darkred'
        }}>
          <h2>CreateFirstGladiator</h2>
          <p>This flashes briefly on page load</p>
        </div>
      )}

      <div style={{ marginTop: '20px', padding: '10px', background: '#f0f0f0', color: 'black' }}>
        <h3>Debug Info:</h3>
        <p>Clerk Loaded: {isLoaded ? 'Yes' : 'No'}</p>
        <p>User: {user ? 'Yes' : 'No'}</p>
        <p>Player Data: {playerQuery.data ? 'Yes' : 'No'}</p>
        <p>Gladiators Data: {gladiatorsQuery.data ? `${gladiatorsQuery.data.length} items` : 'No'}</p>
        <p>Player Loading: {playerQuery.isLoading ? 'Yes' : 'No'}</p>
        <p>Gladiators Loading: {gladiatorsQuery.isLoading ? 'Yes' : 'No'}</p>
      </div>
    </div>
  )
}