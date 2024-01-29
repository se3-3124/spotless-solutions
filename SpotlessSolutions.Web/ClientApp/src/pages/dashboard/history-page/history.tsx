import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import DashboardAppBarComponent from '../components/DashboardAppBarComponent.tsx';
import DashboardDrawerComponent from '../components/DashboardDrawerComponent.tsx';
import RestoreFromTrashRoundedIcon from '@mui/icons-material/RestoreFromTrashRounded';


export default function History() {
  return (
    <>
      <Box sx={{ height: '100%', width: '100%', overflowX: 'hidden' }}>
        <DashboardAppBarComponent />
        <Stack direction="row">
          <DashboardDrawerComponent />
          <Box sx={{ flexGrow: 1, mt: 2, mx: 2 }}>
            <h1 className="text-3xl font-bold text-gray-800 mb-5">History</h1>
            <div className="relative overflow-x-auto z-10">
              <table className="w-full text-sm text-left rtl:text-right text-gray-600">
                <thead className="text-sm text-gray-700 uppercase bg-gray-200 ">
                  <tr>
                    <th scope="col" className="px-10 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-11 py-3">
                      Service
                    </th>
                    <th scope="col" className="px-9 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-12 py-3">
                      Date
                    </th>
                    <th scope="col" className="px-8 py-3">
                      Total
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <a className="text-blue-500 hover:underline cursor-pointer">
                        <RestoreFromTrashRoundedIcon fontSize='medium' /> Restore
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      General Cleaning
                    </td>
                    <td className="px-6 py-4">
                      Joe Carl Doe
                    </td>
                    <td className="px-6 py-4">
                      October 18, 2023
                    </td>
                    <td className="px-6 py-4">
                      ₱ 2,000.00
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <a className="text-blue-500 hover:underline cursor-pointer">
                        <RestoreFromTrashRoundedIcon fontSize='medium' /> Restore
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      Deep Cleaning
                    </td>
                    <td className="px-6 py-4">
                      Joe Carl Doe
                    </td>
                    <td className="px-6 py-4">
                      October 31, 2023
                    </td>
                    <td className="px-6 py-4">
                      ₱ 3,999.00
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Box>
        </Stack>
      </Box>
    </>
  );
}
