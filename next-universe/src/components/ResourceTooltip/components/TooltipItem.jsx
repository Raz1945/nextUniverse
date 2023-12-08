export const TooltipItem = ({ textInfo, value }) => {
  return (
    <div className='tooltip__text-wrapper'>
      <p className="tooltip__info">{textInfo}</p>
      <span className="tooltip__value">{value}</span>
    </div>
  )
}

// calculateProductionAndHidden