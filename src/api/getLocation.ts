export const getLocationFromBrowser = (callback:any)=> {
    const BMap = window.BMap;
    var geolocation = new BMap.Geolocation();
    var myGeo = new BMap.Geocoder({ extensions_town: true });
    var res = {
        longitude: 0,
        latitude: 0,
        city: "",
        district: "",
        province: "",
        street: ""
    };
    geolocation.getCurrentPosition(callback);
}
