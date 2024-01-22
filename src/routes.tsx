import Dashboard from './pages/dashboard/Dashboard'
import AddDog from './pages/addDog/AddDog'
import DogPage from './pages/dogPage/DogPage'

export const RouteList = [
  { path: '/', component: <Dashboard /> },
  { path: '/add-dog', component: <AddDog /> },
  { path: '/dog/:id', component: <DogPage /> },
]
