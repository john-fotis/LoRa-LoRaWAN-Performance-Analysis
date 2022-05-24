var OSM = {
  tiler: {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution:
      '&copy; 2022 <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="https://github.com/john-fotis">John Fotis</a>, <a href="https://github.com/katerinagiann">Katerina Giannopoulou</a> | Hosted with &#10084; by <a href="https://john-fotis.github.io/LoRa-LoRaWAN-Performance-Analysis/">Github</a>',
    maxZoom: 19,
    tileSize: 512,
    zoomOffset: -1,
    interaction: {
      zoomControl: true,
      doubleClickZoom: false,
      closePopupOnClick: true,
      dragging: true,
      zoomSnap: false,
      zoomDelta: false,
      trackResize: false,
      touchZoom: true,
      scrollWheelZoom: true,
    },
  },
};

export default OSM;