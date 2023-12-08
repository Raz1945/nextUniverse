import './ResourceTooltip.css';

export const ResourceTooltip = ({ showTooltip, resource, children }) => {
  return (
    <div className={`tooltip__wrapper ${showTooltip ? 'show-tooltip' : ''}`}>
      <h2 className="tooltip__title">{resource}</h2>
      <hr className='tooltip__line' />
      {children}
    </div>
  );
}