import Layout from './components/template/layout/Layout'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import GlobalError from './pages/errors/GlobalError'
import { RouteList } from './routes'

const App: React.FC = () => {
  return (
    <>
      <Layout>
        <Routes>
          {RouteList.map((route, i) => (
            <Route
              key={`route-${i}`}
              path={route.path}
              element={route.component}
            />
          ))}
          <Route element={<GlobalError status={404} />} />
        </Routes>
      </Layout>
    </>
  )
}

export default App
