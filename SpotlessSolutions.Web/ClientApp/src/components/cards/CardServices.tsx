import './CardServices.style.scss'

interface CardServicesProps {
  title: string
  description: string
  image: string
}

export default function CardServices ({ title, description, image }: CardServicesProps) {
  return (
    <div className="service-card">
      <a href="#">
        <img src={image} alt="TopdownLogo" />
      </a>
      <div className="card-body">
        <a href="#">
          <h5>{title}</h5>
        </a>
        <p className="description">{description}</p>
        <a href="#" className="book-btn">
          BOOK NOW
          <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </svg>
        </a>
      </div>
    </div>
  )
}
