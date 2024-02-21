import { useContext } from 'react'

import Grid from '@mui/material/Grid'

import AuthContext from '../../contexts/AuthContext.ts'
import FooterComponent from '../../components/footer/FooterComponent.tsx'
import NavigationBar from '../../components/navigation/NavigationBar.tsx'

import './services-page.scss'

import tdLogo from '../../assets/td_logo.jpg'

export default function Services () {
  const context = useContext(AuthContext)

  return (
    <>
      <NavigationBar user={context.user} />

      <div className="main">
        <div className="main-container">
          <h1 className="header">SERVICES OFFERED</h1>

          <Grid container spacing={2}>
            {/* Card 1 */}
            <Grid item xs={2} />
            <Grid item xs={4}>
              <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <img src={tdLogo} alt="Topdown logo" />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">Deep Cleaning</div>
                  <p className="text-gray-700 text-base">
                  For homes measuring 35sqm and less, base price is ₱949. Add ₱28 per sqm above 35.
                  </p>
                </div>
                <div className="px-6 pt-4 pb-2">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                </div>
              </div>
            </Grid>

            {/* Card 2 */}
            <Grid item xs={4}>
              <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <img src={tdLogo} alt="Topdown logo" />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">Post Con Cleaning</div>
                  <p className="text-gray-700 text-base">
                  For homes measuring 35sqm and less, base For newly constructed and renovated homes. For homes 35sqm and below, base price is ₱1500. Add ₱30 per sqm above 35. is ₱949. Add ₱28 per sqm above 35.
                  </p>
                </div>
                <div className="px-6 pt-4 pb-2">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                </div>
              </div>
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={2} />

            {/* Card 3 */}
            <Grid item xs={4}>
              <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <img src={tdLogo} alt="Topdown logo" />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">Routine Cleaning</div>
                  <p className="text-gray-700 text-base">
                  Follow up cleaning after Deep or Post Construction Clean.
                  </p>
                </div>
                <div className="px-6 pt-4 pb-2">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                </div>
              </div>
            </Grid>

            {/* Card 4 */}
            <Grid item xs={4}>
              <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <img src={tdLogo} alt="Topdown logo" />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">General Cleaning</div>
                  <p className="text-gray-700 text-base">
                  ONLY ₱399 for one hour of cleaning, 2 cleaners. ₱289 per additional hour.
                  </p>
                </div>
                <div className="px-6 pt-4 pb-2">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                </div>
              </div>
            </Grid>
            <Grid item xs={2} />
          </Grid>

          <div className="divider"></div>

          {/* A1 */}
          <Grid container spacing={1}>
            {/* <Grid item xs={1}/> */}
            <Grid item xs={2}>
              <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">Mattress</div>
                  <p className="text-gray-700 text-base">
                  ₱150 base price
                  </p>
                </div>
              </div>
            </Grid>
            {/* <Grid item xs={1}/> */}

            {/* A2 */}
            <Grid item xs={2}>
              <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">Carpet Deep Cleaning</div>
                  <p className="text-gray-700 text-base">
                  ₱50 base price
                  </p>
                </div>
              </div>
            </Grid>
            {/* <Grid item xs={1}/> */}

            {/* A3 */}
            <Grid item xs={2}>
              <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
                  <p className="text-gray-700 text-base">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                  </p>
                </div>
                <div className="px-6 pt-4 pb-2">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                </div>
              </div>
            </Grid>
            {/* <Grid item xs={1}/> */}

            {/* A4 */}
            <Grid item xs={2}>
              <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <img src={tdLogo} alt="Topdown logo" />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
                  <p className="text-gray-700 text-base">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                  </p>
                </div>
                <div className="px-6 pt-4 pb-2">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                </div>
              </div>
            </Grid>
            {/* <Grid item xs={1}/> */}

            {/* A5 */}
            <Grid item xs={2}>
              <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <img src={tdLogo} alt="Topdown logo" />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
                  <p className="text-gray-700 text-base">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                  </p>
                </div>
                <div className="px-6 pt-4 pb-2">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                </div>
              </div>
            </Grid>

            {/* A6 */}
            <Grid item xs={2}>
              <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <img src={tdLogo} alt="Topdown logo" />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
                  <p className="text-gray-700 text-base">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                  </p>
                </div>
                <div className="px-6 pt-4 pb-2">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                </div>
              </div>
            </Grid>
            {/* <Grid item xs={1}/> */}

            {/* A7 */}
            <Grid item xs={1}/>
            <Grid item xs={2}>
              <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <img src={tdLogo} alt="Topdown logo" />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
                  <p className="text-gray-700 text-base">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                  </p>
                </div>
                <div className="px-6 pt-4 pb-2">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                </div>
              </div>
            </Grid>
            {/* <Grid item xs={1}/> */}

            {/* A8 */}
            <Grid item xs={2}>
              <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <img src={tdLogo} alt="Topdown logo" />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
                  <p className="text-gray-700 text-base">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                  </p>
                </div>
                <div className="px-6 pt-4 pb-2">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                </div>
              </div>
            </Grid>
            {/* <Grid item xs={1}/> */}

            {/* A9 */}
            <Grid item xs={2}>
              <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <img src={tdLogo} alt="Topdown logo" />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
                  <p className="text-gray-700 text-base">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                  </p>
                </div>
                <div className="px-6 pt-4 pb-2">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                </div>
              </div>
            </Grid>
            {/* <Grid item xs={1}/> */}

            {/* A10 */}
            <Grid item xs={2}>
              <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <img src={tdLogo} alt="Topdown logo" />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
                  <p className="text-gray-700 text-base">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                  </p>
                </div>
                <div className="px-6 pt-4 pb-2">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                </div>
              </div>
            </Grid>
            {/* <Grid item xs={1}/> */}

            {/* A11 */}
            <Grid item xs={2}>
              <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <img src={tdLogo} alt="Topdown logo" />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
                  <p className="text-gray-700 text-base">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                  </p>
                </div>
                <div className="px-6 pt-4 pb-2">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                </div>
              </div>
            </Grid>
            <Grid item xs={1}/>

          </Grid>

        </div>
      </div>

      <FooterComponent />
    </>
  )
}
