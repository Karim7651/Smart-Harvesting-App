const CardSubscribe = ({
  title = "Premium",
  price = "$29/mo",
  badge = null,
  features = [],
  disabledFeatures = [],
}) => {
  return (
    <div className="card w-96 bg-base-200 shadow-sm">
      <div className="card-body">
        {badge && <span className="badge badge-xs badge-warning">{badge}</span>}
        <div className="flex justify-between">
          <h2 className="text-3xl font-bold">{title}</h2>
          <span className="text-xl">{price}</span>
        </div>
        <ul className="mt-6 flex flex-col gap-2 text-xs">
          {features.map((item, index) => (
            <li key={`feature-${index}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 me-2 inline-block text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>{item}</span>
            </li>
          ))}
          {disabledFeatures.map((item, index) => (
            <li key={`disabled-${index}`} className="opacity-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 me-2 inline-block text-base-content/50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="line-through">{item}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <button className="btn  bg-green-500 hover:bg-green-600 btn-block">Subscribe</button>
        </div>
      </div>
    </div>
  );
};

export default CardSubscribe;
