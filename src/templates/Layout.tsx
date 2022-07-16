import { Outlet } from 'react-router-dom'

const Layout: React.FunctionComponent = () => {
  return (
    <main className='layout mt-20'>
      <Outlet />
    </main>
  )
}

export default Layout
