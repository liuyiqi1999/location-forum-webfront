export const getLocationFromBrowser = (callback: any) => {
  const BMap = window.BMap;
  var geolocation = new BMap.Geolocation();
  var myGeo = new BMap.Geocoder({ extensions_town: true });
  var res = {
    longitude: 0,
    latitude: 0,
    city: '',
    district: '',
    province: '',
    street: '',
  };
  geolocation.getCurrentPosition(callback);
};

export const getLocationData = () => {
  getLocationFromBrowser((r: any) => {
    const result = {
      longitude: r.longitude,
      latitude: r.latitude,
      city: r.address.city,
      district: r.address.district,
      province: r.address.province,
      street: r.address.street,
    };
    localStorage.setItem('address', JSON.stringify(result));
  });
  
};
