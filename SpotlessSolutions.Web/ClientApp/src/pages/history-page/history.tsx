// import './bookings.css'
// import tdLogo from '../../assets/td_logo.jpg';

export default function History() {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Service
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <a href="#" className="text-blue-500 hover:underline cursor-pointer">
                Restore
              </a>
            </th>
            <td className="px-6 py-4">
              Silver
            </td>
            <td className="px-6 py-4">
              Laptop
            </td>
            <td className="px-6 py-4">
              $2999
            </td>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <a href="#" className="text-blue-500 hover:underline cursor-pointer">
                Restore
              </a>
            </th>
            <td className="px-6 py-4">
              White
            </td>
            <td className="px-6 py-4">
              Laptop PC
            </td>
            <td className="px-6 py-4">
              $1999
            </td>
          </tr>
          <tr className="bg-white dark:bg-gray-800">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <a href="#" className="text-blue-500 hover:underline cursor-pointer">
                Restore
              </a>
            </th>
            <td className="px-6 py-4">
              Black
            </td>
            <td className="px-6 py-4">
              Accessories
            </td>
            <td className="px-6 py-4">
              $99
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}