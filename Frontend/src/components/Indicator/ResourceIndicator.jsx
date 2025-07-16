import { useState, useEffect } from 'react';
import { ResourceTooltip } from '../ResourceTooltip/ResourceTooltip';
import { TooltipItem } from '../ResourceTooltip/components/TooltipItem';
import { numberWithSeparator } from '../../functions/numberWithSeparator';
import './ResourceIndicator.css';

export const ResourceIndicator = ({
  icon,
  resource,
  production,
  productionPerHrs,
  reserve,
  storage,
  storageHiden,
  usage = 0
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  production = numberWithSeparator(production);
  productionPerHrs = numberWithSeparator(productionPerHrs);
  reserve = numberWithSeparator(reserve);
  storage = numberWithSeparator(storage);
  storageHiden = numberWithSeparator(storageHiden);

  // popUp 
  const handleMouseOver = () => {
    setShowTooltip(true);
  };
  const handleMouseLeave = () => {
    setShowTooltip(false);
  };
  useEffect(() => { }, [showTooltip]);

  return (
    <>
      <div className='resource-indicator'>
        <div
          className='resource-indicator-wrapper'
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
        >
          <div className='resource-indicator__icon'>{icon}</div>
          <span className='resource-indicator__name'>{production}</span>
        </div>

        <ResourceTooltip showTooltip={showTooltip} resource={resource}>
          <TooltipItem textInfo="Your Reserve:" value={reserve} />
          <TooltipItem textInfo='Current Production:' value={`+${productionPerHrs}`} />

          {usage !== 0 ? (
            <TooltipItem textInfo='In Use:' value={`-${usage}`} />
          ) : (
            <>
              <TooltipItem
                textInfo='Storage Capacity:'
                value={storage}
              />
              <TooltipItem textInfo='Camouflage:' value={storageHiden} />
            </>
          )}
        </ResourceTooltip>
      </div>
    </>
  );
};
