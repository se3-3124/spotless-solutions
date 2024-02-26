import { useContext } from 'react'

import AuthContext from '../../contexts/AuthContext.ts'
import FooterComponent from '../../components/footer/FooterComponent.tsx'
import NavigationBar from '../../components/navigation/NavigationBar.tsx'

export default function Faqs () {
  const context = useContext(AuthContext)


  return (
    <>

      <NavigationBar user={context.user}/>
      <div className="main">
        <div className="main-container">
        
        </div>
        <h1 className="header text-center font-semibold text-2xl">Frequently Asked Questions</h1>
        
        <div className=" bg-white md:grid-">
          <div className="flex items-start font-montserrat my-6 mr-10">
            <img src='./cleaning_services_hp4.png' alt='' className="h-7 mr-5"/>
            <div>
              <h6 className='secondarySpacing'>Q1: What services fo you offer?</h6>
              <p className='font-bold'>A1: Hello, here are our services offered and their rates :) </p>
                <p className='font-bold'>1. Deep Cleaning (No Time Limit!)</p>
                <h6 className='secondarySpacing'>For homes measuring 35sqm and less, base price is ₱949. Add ₱28 per sqm above 35</h6>
                <p className='font-bold'>2. General Cleaning</p>
                <h6 className='secondarySpacing'>ONLY ₱399 for one hour of cleaning, 2 cleaners. ₱289 per additional hour</h6>
                <p className='font-bold'>3. Post Construction Cleaning</p>
                <h6 className='secondarySpacing'>For newly constructed and renovated homes. For homes 35sqm and below, base price is ₱1500. Add ₱30 per sqm above 35</h6>
                <p className='font-bold'>4. Routine Cleaning</p>
                <h6 className='secondarySpacing'>Follow up cleaning after Deep or Post Construction Clean. Has a much Lower price compared to Deep or Post Construction cleaning</h6>       
            </div>
          </div>

          <div className=" bg-white md:grid-">
          <div className="flex items-start font-montserrat my-6 mr-10">
            <img src='./cleaning_services_hp4.png' alt='' className="h-7 mr-5"/>
            <div>
              <h6 className='secondarySpacing'>Q2: What is included in your Deep Cleaning Service?</h6>
              <p className='font-bold'>A2: Here is what we will do for Deep Cleaning. </p>
                <h6 className='secondarySpacing'>Ceiling cleaning</h6>
                <h6 className='secondarySpacing'>Wall cleaning</h6>
                <h6 className='secondarySpacing'>Vacuuming and sweeping of floors</h6>
                <h6 className='secondarySpacing'>UV Sanitation</h6>
                <h6 className='secondarySpacing'>Dry vacuuming of mattress and sofa</h6>
                <h6 className='secondarySpacing'>Cleaning of the exterior portions of appliances and cabinets</h6>
                <h6 className='secondarySpacing'>Bathroom and kitchen cleaning</h6>
                <h6 className='secondarySpacing'>Organic spray disinfection</h6> 
                <h6 className='secondarySpacing'>Fogging Disinfection</h6>      
            </div>
          </div>
          </div>

          <div className=" bg-white md:grid-">
          <div className="flex items-start font-montserrat my-6 mr-10">
            <img src='./cleaning_services_hp4.png' alt='' className="h-7 mr-5"/>
            <div>
              <h6 className='secondarySpacing'>Q3: What is the difference between Deep Cleaning and General Cleaning</h6>
              <p className='font-bold'>A3: Here is a summary of the differences between Deep Cleaning VS General Cleaning</p>
              <p className='font-bold'>Deep Clean</p>
                <h6 className='secondarySpacing'>unlimited time we clean until we finish your home</h6>
                <h6 className='secondarySpacing'>based on the size of area to be cleaned</h6>
                <h6 className='secondarySpacing'>includes wall and ceiling</h6>
                <h6 className='secondarySpacing'>deep cleaning for bathroom</h6>
                <h6 className='secondarySpacing'>free UV disinfection</h6>
                <h6 className='secondarySpacing'>free fogging disinfection (with citronella to repel mosquitoes</h6>
                <p className='font-bold'>General Clean</p>
                <h6 className='secondarySpacing'>time based</h6>
                <h6 className='secondarySpacing'>we clean as much as we can given the booked time</h6> 
                <h6 className='secondarySpacing'>all around but lighter clean</h6>      
            </div>
          </div>
          </div>

          <div className=" bg-white md:grid-">
          <div className="flex items-start font-montserrat my-6 mr-10">
            <img src='./cleaning_services_hp4.png' alt='' className="h-7 mr-5"/>
            <div>
              <h6 className='secondarySpacing'>Q4: What is the difference between Deep Cleaning and Post Construction Cleaning</h6>
              <p className='font-bold'>A4: Here is a summary of the differences between Deep Cleaning VS Post Construction Cleaning</p>
              <p className='font-bold'>Deep Clean</p>
                <h6 className='secondarySpacing'>unlimited time</h6>
                <h6 className='secondarySpacing'>overall thorough clean</h6>
                <p className='font-bold'>Post Construction Clean</p>
                <h6 className='secondarySpacing'>time based</h6>
                <h6 className='secondarySpacing'>unlimited time</h6>
                <h6 className='secondarySpacing'>specialized cleaning needed after construction</h6>
                <h6 className='secondarySpacing'>focus on removing dust and debris</h6>
                <h6 className='secondarySpacing'>price accounts for occupational hazard as our cleaners may be exposed to debris, nails, and other construction materials that may cause injury.</h6>    
            </div>
          </div>
          </div>

          <div className=" bg-white md:grid-">
          <div className="flex items-start font-montserrat my-6 mr-10">
            <img src='./cleaning_services_hp4.png' alt='' className="h-7 mr-5"/>
            <div>
              <h6 className='secondarySpacing'>Q5: What Add-Ons do you offer?</h6>
              <p className='font-bold'>A5: Here are our Add Ons </p>
                <h6 className='secondarySpacing'>Aircon Cleaning (window type): prices start at P 599</h6>
                <h6 className='secondarySpacing'>Aircon Cleaning (split type): prices start at P 999</h6>
                <h6 className='secondarySpacing'>Closet Cleaning and Arrangement: P 150 base price</h6>
                <h6 className='secondarySpacing'>Clutter: P 50 base price</h6>
                <h6 className='secondarySpacing'>Dishwashing: P 50 base price</h6>
                <h6 className='secondarySpacing'>Sofa Deep Clean: P 290 per seater</h6>
                <h6 className='secondarySpacing'>Fog Disinfecting: free for Deep Clean</h6>
                <h6 className='secondarySpacing'>UV Sanitation, free for Deep Clean</h6> 
                <h6 className='secondarySpacing'>Mattress and Carpet Deep Clean</h6>
                <h6 className='secondarySpacing'>Lawn Trimming</h6>      
            </div>
          </div>
          </div>

          <div className=" bg-white md:grid-">
          <div className="flex items-start font-montserrat my-6 mr-10">
            <img src='./cleaning_services_hp4.png' alt='' className="h-7 mr-5"/>
            <div>
              <h6 className='secondarySpacing'>Q6: What are your modes of payment.</h6>
              <p className='font-bold'>A6: Our Payment Channels:</p>
                <p className='font-bold'>GCash</p>
                <h6 className='secondarySpacing'>09178540011</h6>
                <h6 className='secondarySpacing'>Rafael Ian G. Verzosa</h6>
                <p className='font-bold'>BPI</p>
                <h6 className='secondarySpacing'>0689 0647 87</h6>
                <h6 className='secondarySpacing'>Rafael Ian G. Verzosa</h6>
            </div>
          </div>
          </div>

          <div className=" bg-white md:grid-">
          <div className="flex items-start font-montserrat my-6 mr-10">
            <img src='./cleaning_services_hp4.png' alt='' className="h-7 mr-5"/>
            <div>
              <h6 className='secondarySpacing'>Q7: What does your Mattress Deep Cleaning include and what are your rates?</h6>
              <p className='font-bold'>A7: Our Mattress Deep Cleaning service includes:</p>
                <h6 className='secondarySpacing'>1. Mattress shampooing using our tried and tested cleaning solution</h6>
                <h6 className='secondarySpacing'>2. Deep Scrubbing </h6>
                <h6 className='secondarySpacing'>3. Power extraction using our specialized Bisell vacuum cleaning :)</h6>
                <h6 className='secondarySpacing'>Here are our rates:</h6>
                <h6 className='secondarySpacing'>Single 36" - P 1, 200</h6>
                <h6 className='secondarySpacing'>Semi Double 48" - P 1, 500 </h6>
                <h6 className='secondarySpacing'>Double 54" - P 1, 800</h6>
                <h6 className='secondarySpacing'>Queen 60" - P 2, 200</h6> 
                <h6 className='secondarySpacing'>King Size 72" - P 2, 500</h6>  
            </div>
          </div>
          </div>

          <div className=" bg-white md:grid-">
          <div className="flex items-start font-montserrat my-6 mr-10">
            <img src='./cleaning_services_hp4.png' alt='' className="h-7 mr-5"/>
            <div>
              <h6 className='secondarySpacing'>Q8: What does your Sofa Deep Cleaning include and what are your rates?</h6>
              <p className='font-bold'>A8: Our Sofa Deep Cleaning service includes:</p>
              <h6 className='secondarySpacing'>1. Sofa shampooing using our tried and tested cleaning solution</h6>
              <h6 className='secondarySpacing'>2. Deep Scrubbing </h6>
              <h6 className='secondarySpacing'>3. Power extraction using our specialized Bisell vacuum cleaning :)</h6>
              <h6 className='secondarySpacing'>Our rate is P 299 per seater. May we ask how many seaters is your sofa so we can estimate. (If you have a photo, it will help us in estimating your sofa) </h6>
            </div>
          </div>
          </div>

          <div className=" bg-white md:grid-">
          <div className="flex items-start font-montserrat my-6 mr-10">
            <img src='./cleaning_services_hp4.png' alt='' className="h-7 mr-5"/>
            <div>
              <h6 className='secondarySpacing'>Q9: When do we need to pay for the services?</h6>
              <p className='font-bold'>A9: We require a Down payment of 20% to the cleaning of your unit. The balance can be paid after the completion of the cleaning service.</p>
            </div>
          </div>
          </div>

          <div className=" bg-white md:grid-">
          <div className="flex items-start font-montserrat my-6 mr-10">
            <img src='./cleaning_services_hp4.png' alt='' className="h-7 mr-5"/>
            <div>
              <h6 className='secondarySpacing'>Q10: What is included in General Cleaning?</h6>
              <p className='font-bold'>A10: This is included in General Cleaning :)</p>
                <h6 className='secondarySpacing'>Decluttering and organizing (within reasonable amount)</h6>
                <h6 className='secondarySpacing'>Light dusting of surfaces</h6>
                <h6 className='secondarySpacing'>Cleaning of mirrors and windows (interior side)</h6>
                <h6 className='secondarySpacing'>Vacuuming and sweeping of floors</h6>
                <h6 className='secondarySpacing'>Kitchen cleaning including exterior portions of appliances and cabinets</h6> 
                <h6 className='secondarySpacing'>Bathroom cleaning (toilet, sink, bathtub, shower)</h6>  
            </div>
          </div>
          </div>

          <div className=" bg-white md:grid-">
          <div className="flex items-start font-montserrat my-6 mr-10">
            <img src='./cleaning_services_hp4.png' alt='' className="h-7 mr-5"/>
            <div>
              <h6 className='secondarySpacing'>Q11: Do you offer special packages for AirBnB owners?</h6>
              <p className='font-bold'>A11: Here is our AirBnB package</p>
                <h6 className='secondarySpacing'>15 basic housekeeping sessions</h6>
                <h6 className='secondarySpacing'>Rate of 7.5k</h6>
                <h6 className='secondarySpacing'>Enough to make room presentable and ready for guests (Our services are the following:</h6>
                <h6 className='secondarySpacing'>1. Chinging of linens and AirBnB supplies</h6>
                <h6 className='secondarySpacing'>2. Garbage disposal</h6> 
                <h6 className='secondarySpacing'>3. Dusting</h6>  
                <h6 className='secondarySpacing'>4. Vacuuming</h6> 
                <h6 className='secondarySpacing'>5. Mopping</h6> 
                <h6 className='secondarySpacing'>6. CR quick clean</h6> 
                <h6 className='secondarySpacing'>7. Disinfection of whole area</h6> 
                <h6 className='secondarySpacing'>8. Reporting of AirBnB status - status of the room after the previous guest has left</h6> 
                <h6 className='secondarySpacing'>After your first cleaning session, our next cleaning will be right after your next booking. This is to ensure that your unit is always clean and ready for new clients</h6> 
                <h6 className='secondarySpacing'>Optional service (laundry) - we can do your laundry so we can cycle your beddings/linens. As we change your dirty linens with fresh ones, we wash your dirty linens. Rate is P 200 per load</h6> 
                <h6 className='secondarySpacing'>No need to come to your AirBnB unit in between cients anymore since Topdown is here</h6> 
            </div>
          </div>
          </div>

          <div className=" bg-white md:grid-">
          <div className="flex items-start font-montserrat my-6 mr-10">
            <img src='./cleaning_services_hp4.png' alt='' className="h-7 mr-5"/>
            <div>
              <h6 className='secondarySpacing'>Q12: Do you offer speacial cleaning services for homes that are affected by flooding?</h6>
              <p className='font-bold'>A12: Yes, our intensive post flooding clean includes the following: :)</p>
                <h6 className='secondarySpacing'>Intensive home cleaning using tried and tested cleaning solutions</h6>
                <h6 className='secondarySpacing'>Sofa under the section cleaning (shampoo, scrub, power extraction of dirt and water)</h6>
                <h6 className='secondarySpacing'>Garage cleaning</h6>
                <h6 className='secondarySpacing'>Fagging Disinfection (with Citronella to repel mosquitos)</h6>
                <h6 className='secondarySpacing'>UV Sanitation (deeper clean using ozone disinfection technology)</h6>  
            </div>
          </div>
          </div>

          <div className=" bg-white md:grid-">
          <div className="flex items-start font-montserrat my-6 mr-10">
            <img src='./cleaning_services_hp4.png' alt='' className="h-7 mr-5"/>
            <div>
              <h6 className='secondarySpacing'>Q13: What information do I need to provide for booking?</h6>
              <p className='font-bold'>A13: We require the following information for booking</p>
                <h6 className='secondarySpacing'>1. How many sqm is your place?</h6>
                <h6 className='secondarySpacing'>2. How many floors (sqm per floor)</h6>
                <h6 className='secondarySpacing'>3. Preferred cleaning service? (General and how many hours, deep, maintenance)</h6>
                <h6 className='secondarySpacing'>4. Your complete address</h6>
                <h6 className='secondarySpacing'>5. Preferred time and date of cleaning</h6>  
                <h6 className='secondarySpacing'>6. Contact Number</h6>
                <h6 className='secondarySpacing'>7. Indicate add ons, if any</h6>
            </div>
          </div>
          </div>

          <div className=" bg-white md:grid-">
          <div className="flex items-start font-montserrat my-6 mr-10">
            <img src='./cleaning_services_hp4.png' alt='' className="h-7 mr-5"/>
            <div>
              <h6 className='secondarySpacing'>Q14: How do you ensure that our valuables are taken care of?</h6>
              <p className='font-bold'>A14: We ensure your valuable through:</p>
                <h6 className='secondarySpacing'>1. Prior to the cleaning, we request our clients to keep and lock away all valuables.</h6>
                <h6 className='secondarySpacing'>2. Our team lead (TL) will frisk our cleaners beafore and after leaving your home for added security</h6>
                <h6 className='secondarySpacing'>3. We carefully select our cleaners to ensure a high level of integrity. Please rest assured that honesty is a core value in our business</h6>
            </div>
          </div>
          </div>

          <div className=" bg-white md:grid-">
          <div className="flex items-start font-montserrat my-6 mr-10">
            <img src='./cleaning_services_hp4.png' alt='' className="h-7 mr-5"/>
            <div>
              <h6 className='secondarySpacing'>Q15: Do we need to provide any cleaning materials or equipment for your team? </h6>
              <p className='font-bold'>A15: Topdown Cleaning Services provides all the cleaning solution and equipments. No need to preapre anything, we've got you all covered.</p>
            </div>
          </div>
          </div>

          <div className=" bg-white md:grid-">
          <div className="flex items-start font-montserrat my-6 mr-10">
            <img src='./cleaning_services_hp4.png' alt='' className="h-7 mr-5"/>
            <div>
              <h6 className='secondarySpacing'>Q16: Do you clean the insode part of the cabinets and appliances? </h6>
              <p className='font-bold'>A16: Our service covers cleaning the outside portion only of the cabinets and appliances. If you want theses to be cleaned, this would have an add-on fee</p>
            </div>
          </div>
          </div>

          <div className=" bg-white md:grid-">
          <div className="flex items-start font-montserrat my-6 mr-10">
            <img src='./cleaning_services_hp4.png' alt='' className="h-7 mr-5"/>
            <div>
              <h6 className='secondarySpacing'>Q17: What are your policies on cancellations and rescheduling?</h6>
              <p className='font-bold'>A17: Here are our policies on cancellations and rescheduling</p>
                <h6 className='secondarySpacing'>Cancellations: Prior to your cleaning, we require a 20% downpayment prior to the cleaning. This downpayment is non-refundable. For cancellations, this downpayment is forfeited</h6>
                <h6 className='secondarySpacing'>Rescheduling: Schedule changes 24 hours prior, will merit no charge/fee. However, any schedule chnage will merit a P 400 surcharge to account for the mobilization of our cleaners</h6>
            </div>
          </div>
          </div>

          <div className=" bg-white md:grid-">
          <div className="flex items-start font-montserrat my-6 mr-10">
            <img src='./cleaning_services_hp4.png' alt='' className="h-7 mr-5"/>
            <div>
              <h6 className='secondarySpacing'>Q18: Can we inspect the work of your cleaners after they finish? </h6>
              <p className='font-bold'>A18: Before our team departs, our team lead (TL) shall invite you to inspect our work and accomplish our cleaning checklist. Please point out any portions of our work that need to be redone before our team leaves. Any portion missed during the inspection will be addressed on your next schedule with us.</p>
            </div>
          </div>
          </div>

          <div className=" bg-white md:grid-">
          <div className="flex items-start font-montserrat my-6 mr-10">
            <img src='./cleaning_services_hp4.png' alt='' className="h-7 mr-5"/>
            <div>
              <h6 className='secondarySpacing'>What are your policies for handling dissatisfaction from clients?</h6>
              <p className='font-bold'>A20: Your satisfaction with our work is our priority. Please report any dissatisfaction to our page and so that we can address theses concerns at the earliest possible time.</p>
            </div>
          </div>
          </div>



        </div>
      </div>
      <FooterComponent />
    </>
  )
}
