function initMap() {
  // Update MAP_ID with custom map ID
  map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: 35.673802362941174,
      lng: 139.79654460433497,
    },
    zoom: 9,
    mapId: "ecb4ceb12e4f1660",
    mapTypeControl: false,
    fullscreenControl: false,
    streetViewControl: false,
  });

  let pokemons = [];

  let markers = [
    // Name
    // Latitude, Longitude
    // Image URL
    // scaledSize width, height
  ];

  const fetchPokeIds = () => {
    pokemons.forEach((pokemon) => {
      fetch(pokemon.url)
        .then((res) => res.json())
        .then((data) => {
          let pokeMarker = [
            pokemon.name,
            cities[Math.floor(Math.random() * cities.length)].lat,
            cities[Math.floor(Math.random() * cities.length)].long,
            `https://pokeres.bastionbot.org/images/pokemon/${data.id}.png`,
            30,
            30,
          ];
          markers.push(pokeMarker);
        });
    });
    setTimeout(loadMarker, 1000);
  };

  fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then((respone) => respone.json())
    .then((allpokemon) => {
      for (let i = 0; i < 10; i++) {
        pokemons.push(allpokemon.results[Math.floor(Math.random() * 151)]);
      }
    })
    .then(fetchPokeIds);

  let collection = 0;

  const loadMarker = () => {
    for (let i = 0; i < markers.length; i++) {
      const currMarker = markers[i];

      const marker = new google.maps.Marker({
        position: { lat: currMarker[1], lng: currMarker[2] },
        map,
        title: currMarker[0],
        icon: {
          url: currMarker[3],
          scaledSize: new google.maps.Size(currMarker[4], currMarker[5]),
        },
        animation: google.maps.Animation.DROP,
        collected: false,
      });

      const infowindow = new google.maps.InfoWindow({
        content: currMarker[0],
      });

      marker.addListener("click", () => {
        infowindow.open(map, marker);
        if (!marker.collected) {
          marker.collected = true;
          collection++;
          document.querySelector("#collection").innerText = collection;
        }
        if (collection == 10) {
          document.querySelectorAll(".hidden").forEach((elem) => {
            elem.classList.remove("hidden");
          });
        }
      });
    }
  };
}

document.querySelector("button").addEventListener("click", () => {
  location.reload();
});
