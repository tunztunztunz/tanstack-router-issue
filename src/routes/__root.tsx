import { SignedIn, SignedOut, SignInButton, SignOutButton } from '@clerk/clerk-react'
import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  beforeLoad: async ({ context }) => {
    console.log('context here', context)
  },
  component: RootComponent
})

function RootComponent() {
  return (
    <div>
      <SignedOut>
        <div>Please sign in</div>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <Outlet />
        <SignOutButton />
      </SignedIn>
    </div>
  )
}
