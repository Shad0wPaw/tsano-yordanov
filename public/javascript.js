////////////////////////////////////// post
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(async (position) => {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    const dataLocation = { lat, long };
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataLocation),
    };
    const response = await fetch("/api", options);
    const successJson = await response.json();
  });
} else {
  console.log("Location Access Denied");
}

////////////////////////////////////// get
getFetch();
async function getFetch() {
  const response = await fetch("/api");
  const data = await response.json();
  for (d of data) {
    document.getElementById(
      "root_checkout"
    ).innerHTML += `<div><h3><b>User ${d._id}: <a href="https://www.latlong.net/c/?lat=${d.lat}&long=${d.long}" target="_blank">(${d.lat}, ${d.long})</a><br>
      <b></h3><br> </div>
           `;
  }
}
