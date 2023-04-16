import React, {useEffect, useRef} from "react";
import mapService from './MapService';

const AmsMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    mapService.map.setTarget('map');
    mapService.fdxPlotsLayer.registerOnMoveEndEventHandler();
    mapService.fdxPlotsLayer.registerOnPointerMoveEventHandler();
   
  }); 

  return (
    <>
      <div id='map'
           ref={mapRef}
           tabIndex={0}
           onClick={() => mapRef!.current!.focus()}
           style={{flex: 1, outline: 'none'}}/>
    </>
  )
}

export default AmsMap;