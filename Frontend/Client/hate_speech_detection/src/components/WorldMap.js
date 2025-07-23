import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const WorldMap = () => {
  return (
    <div style={{ width: "100%", height: "500px" }}>
      <h2>Test de la carte</h2>
      <ComposableMap projectionConfig={{ scale: 180 }}>
        <Geographies geography="https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json">
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#DDD"
                stroke="#FFF"
                style={{
                  default: { outline: "none" },
                  hover: { fill: "#F53", outline: "none" },
                  pressed: { fill: "#E42", outline: "none" }
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default WorldMap;
