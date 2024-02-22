import { Link } from 'react-router-dom'
import {
  reactRouterParameters,
  type ReactRouterAddonStoryParameters
} from 'storybook-addon-react-router-v6'

export interface RouterDefaultsParam {
  routing: { path: string }
  location: ReactRouterAddonStoryParameters['location']
}

export const routerDefaults = (params: RouterDefaultsParam) => {
  return reactRouterParameters({
    location: {
      ...params.location,
      path: params.routing.path
    },
    routing: [
      {
        path: params.routing.path,
        useStoryElement: true
      },
      {
        path: '/',
        element: <Link to={params.routing.path}>home page, go back</Link>
      },
      {
        path: '/login',
        element: <Link to={params.routing.path}>login page, go back</Link>
      },
      {
        path: '/signup',
        element: <Link to={params.routing.path}>sign up page, go back</Link>
      },
      {
        path: '/about-us',
        element: <Link to={params.routing.path}>about us page, go back</Link>
      },
      {
        path: '/faqs',
        element: <Link to={params.routing.path}>FAQs page, go back</Link>
      },
      {
        path: '/services',
        element: <Link to={params.routing.path}>services page, go back</Link>
      },
      {
        path: '/profile',
        element: <Link to={params.routing.path}>profile page, go back</Link>
      },
      {
        path: '/dashboard',
        element: <Link to={params.routing.path}>dashboard page, go back</Link>
      },
      {
        path: '/logout',
        element: <Link to={params.routing.path}>logout page, go back</Link>
      },
      {
        path: '*',
        element: <Link to={params.routing.path}>404, go back</Link>
      }
    ]
  })
}
