var map = L.map('map').setView([-6.2956292,106.7083180],12);

var _attribution = '<a href="https://unsorry.net" target="_blank">anshori@2021</a>';
      
var basemap0 = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | ' + _attribution
});
var basemap1 = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri | ' + _attribution
});
basemap0.addTo(map);

// Jalan utama
map.createPane("pane_JalanUtama");
map.getPane("pane_JalanUtama").style.zIndex = 401;
var jalanutama = L.geoJson(null, {
  pane: "pane_JalanUtama",
  style: function (feature) {
    return {
      color: "red",
      weight: 2,
      opacity: 1,
    };
  },
  onEachFeature: function (feature, layer) {
    layer.on({
      mouseover: function (e) {
        var layer = e.target;
        layer.setStyle({
          weight: 2, 
          color: "#00FFFF",
          opacity: 1,
        });
      },
      mouseout: function (e) {
        jalanutama.resetStyle(e.target);
        map.closePopup();
      },
      click: function (e) {
        var content = "Nama Jalan: " + feature.properties.name + "<br>" +
          "Kategori: " + feature.properties.fclass;
        jalanutama.bindPopup(content);
      }
    });
  }
});
$.getJSON("geojson/jalanutama.geojson", function (data) {
  jalanutama.addData(data);
});

map.createPane("pane_JalanLokal");
map.getPane("pane_JalanLokal").style.zIndex = 401;
var jalanlokal = L.geoJson(null, {
  pane: "pane_JalanLokal",
  style: function (feature) {
    return {
      color: "red",
      weight: 1,
      opacity: 1,
    };
  },
  onEachFeature: function (feature, layer) {
    layer.on({
      mouseover: function (e) {
        var layer = e.target;
        layer.setStyle({
          weight: 2, 
          color: "#00FFFF",
          opacity: 1,
        });
      },
      mouseout: function (e) {
        jalanlokal.resetStyle(e.target);
        map.closePopup();
      },
      click: function (e) {
        var content = "Nama Jalan: " + feature.properties.name + "<br>" +
          "Kategori: " + feature.properties.fclass;
        jalanlokal.bindPopup(content);
      }
    });
  }
});
$.getJSON("geojson/jalanlokal.geojson", function (data) {
  jalanlokal.addData(data);
});

map.createPane("pane_Sungai");
map.getPane("pane_Sungai").style.zIndex = 351;
var sungai = L.geoJson(null, {
  pane: "pane_Sungai",
  style: function (feature) {
    return {
      color: "#0099ff",
      weight: 1,
      opacity: 1,
    };
  },
  onEachFeature: function (feature, layer) {
    layer.on({
      mouseover: function (e) {
        var layer = e.target;
        layer.setStyle({
          weight: 2, 
          color: "#00FFFF",
          opacity: 1,
        });
      },
      mouseout: function (e) {
        sungai.resetStyle(e.target);
        map.closePopup();
      },
      click: function (e) {
        var content = "Nama Sungai: " + feature.properties.name + "<br>" +
          "Kategori: " + feature.properties.fclass;
        sungai.bindPopup(content);
      }
    });
  }
});
$.getJSON("geojson/sungai.geojson", function (data) {
  sungai.addData(data);
});

//Admin kelurahan
map.createPane("pane_AdminKelurahan");
map.getPane("pane_AdminKelurahan").style.zIndex = 301;
var adminkelurahan = L.geoJson(null, {
  pane: "pane_AdminKelurahan",
  style: function (feature) {
    return {
      fillColor: "white",
      fillOpacity: 0.5,
      color: "black",
      weight: 1,
      opacity: 1,
    };
  },
  onEachFeature: function (feature, layer) {
    var content = layer.feature.properties.Kelurahan.toString();
    layer.bindTooltip(content, {
      direction: 'center',
      permanent: true,
      className: 'styleLabelKelurahan'
    });
    layer.on({
      mouseover: function (e) {
        var layer = e.target;
        layer.setStyle({
          weight: 2,
          color: "gray",
          opacity: 1, 
          fillColor: "#00FFFF",
          fillOpacity: 0.5,
        });
      },
      mouseout: function (e) {
        adminkelurahan.resetStyle(e.target);
        map.closePopup();
      },
      click: function (e) {
        var contentPopup = "<table class='table'>" + 
          "<tr><th colspan='2'><h5>Kelurahan " + feature.properties.Kelurahan + "</h5></th></tr>" +
          "<tr><th>Penduduk Laki-laki</th><td>" + feature.properties.Jml_Pen_lk + " Jiwa</td></tr>" +
          "<tr><th>Penduduk Perempuan</th><td>" + feature.properties.Jml_Pen_PR + " Jiwa</td></tr>" +
          "<tr><th>Jumlah Penduduk</th><td>" + feature.properties.Jml_PenTol + " Jiwa</td></tr>" +
          "<tr><th>Rasio Jenis Kelamin (Sex Ratio)</th><td>" + feature.properties.SexRatio + " </td></tr>" +
          "</table>";
        adminkelurahan.bindPopup(contentPopup);
      }
    });
  }
});
$.getJSON("geojson/admin_kelurahan.geojson", function (data) {
  adminkelurahan.addData(data);
  map.addLayer(adminkelurahan);
});

resetLabels([adminkelurahan]);
map.on("zoomend", function(){
  resetLabels([adminkelurahan]);
});
map.on("move", function(){
  resetLabels([adminkelurahan]);
});
map.on("layeradd", function(){
  resetLabels([adminkelurahan]);
});
map.on("layerremove", function(){
  resetLabels([adminkelurahan]);
});

// Layer Kasus Positif Covid-19
var positif = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    if (feature.properties) {
      var redMarker = L.ExtraMarkers.icon({
        icon: 'fa-number',
        number: feature.properties.Jml_positi,
        markerColor: 'orange',
        shape: 'square',
        prefix: 'fa',
        tooltipAnchor: [15, -25]
      });
      return L.marker(latlng, {
        icon: redMarker,
        riseOnHover: true
      });
    }
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<div class='card'>" +
      "<div class='card-header alert-danger text-center p-1'><strong>Kelurahan<br>" + feature.properties.Kelurahan + "</strong></div>" +
      "<div class='card-body p-0'>" +
        "<table class='table table-responsive-sm m-0'>" +
          "<tr><th><i class='fas fa-plus-circle'></i> Kasus Positif</th><th>" + feature.properties.Jml_positi + "</th></tr>" +
        "</table>" +
      "</div>";
      layer.on({
        click: function (e) {
          positif.bindPopup(content);
        },
        mouseover: function (e) {
          positif.bindTooltip("Kel. " + feature.properties.Kelurahan);
        }
      });
    }
  }
});
$.getJSON("geojson/positif.geojson", function (data) {
  positif.addData(data);
  map.addLayer(positif);
});

var odp = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    if (feature.properties) {
      var redMarker = L.ExtraMarkers.icon({
        icon: 'fa-number',
        number: feature.properties.JumlahODP,
        markerColor: 'blue',
        shape: 'square',
        prefix: 'fa',
        tooltipAnchor: [15, -25]
      });
      return L.marker(latlng, {
        icon: redMarker,
        riseOnHover: true
      });
    }
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<div class='card'>" +
      "<div class='card-header alert-danger text-center p-1'><strong>Kelurahan<br>" + feature.properties.Kelurahan + "</strong></div>" +
      "<div class='card-body p-0'>" +
        "<table class='table table-responsive-sm m-0'>" +
          "<tr><th><i class='fas fa-user-tag'></i> Jumlah ODP</th><th>" + feature.properties.JumlahODP + "</th></tr>" +
        "</table>" +
      "</div>";
      layer.on({
        click: function (e) {
          odp.bindPopup(content);
        },
        mouseover: function (e) {
          odp.bindTooltip("Kel. " + feature.properties.Kelurahan);
        }
      });
    }
  }
});
$.getJSON("geojson/odp.geojson", function (data) {
  odp.addData(data);
});

var pdp = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    if (feature.properties) {
      var redMarker = L.ExtraMarkers.icon({
        icon: 'fa-number',
        number: feature.properties.jml_pdp,
        markerColor: 'green-light',
        shape: 'square',
        prefix: 'fa',
        tooltipAnchor: [15, -25]
      });
      return L.marker(latlng, {
        icon: redMarker,
        riseOnHover: true
      });
    }
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<div class='card'>" +
      "<div class='card-header alert-danger text-center p-1'><strong>Kelurahan<br>" + feature.properties.Kelurahan + "</strong></div>" +
      "<div class='card-body p-0'>" +
        "<table class='table table-responsive-sm m-0'>" +
          "<tr><th><i class='fas fa-procedures'></i> Jumlah PDP</th><th>" + feature.properties.jml_pdp + "</th></tr>" +
        "</table>" +
      "</div>";
      layer.on({
        click: function (e) {
          pdp.bindPopup(content);
        },
        mouseover: function (e) {
          pdp.bindTooltip("Kel. " + feature.properties.Kelurahan);
        }
      });
    }
  }
});
$.getJSON("geojson/pdp.geojson", function (data) {
  pdp.addData(data);
});

var meninggal = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    if (feature.properties) {
      var redMarker = L.ExtraMarkers.icon({
        icon: 'fa-number',
        number: feature.properties.jml_menggl,
        markerColor: 'red',
        shape: 'square',
        prefix: 'fa',
        tooltipAnchor: [15, -25]
      });
      return L.marker(latlng, {
        icon: redMarker,
        riseOnHover: true
      });
    }
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<div class='card'>" +
      "<div class='card-header alert-danger text-center p-1'><strong>Kelurahan<br>" + feature.properties.Kelurahan + "</strong></div>" +
      "<div class='card-body p-0'>" +
        "<table class='table table-responsive-sm m-0'>" +
          "<tr><th><i class='fas fa-skull-crossbones'></i> Jumlah Meninggal</th><th>" + feature.properties.jml_menggl + "</th></tr>" +
        "</table>" +
      "</div>";
      layer.on({
        click: function (e) {
          meninggal.bindPopup(content);
        },
        mouseover: function (e) {
          meninggal.bindTooltip("Kel. " + feature.properties.Kelurahan);
        }
      });
    }
  }
});
$.getJSON("geojson/meninggal.geojson", function (data) {
  meninggal.addData(data);
});

/* Larger screens get expanded layer control and visible sidebar */
if (document.body.clientWidth <= 767) {
  var isCollapsed = true;
} else {
  var isCollapsed = false;
}

// Control layer
var baseMaps = {
  'OpenStreetMap': basemap0,
  'ESRI World Imagery': basemap1,
};

var groupedOverlays = {
  "Kasus COVID-19": {
    "<img src='icon/orangemarker.png' width='20'> Kasus Positif": positif,
    "<img src='icon/bluemarker.png' width='20'> Jumlah ODP": odp,
    "<img src='icon/lightgreenmarker.png' width='20'> Jumlah PDP": pdp,
    "<img src='icon/redmarker.png' width='20'> Jumlah Meninggal": meninggal,
  },
  "Layer": {
    "<svg height='5' width='20'><line x1='0' y1='0' x2='18' y2='0' style='stroke:rgb(0,0,0);stroke-width:2' /></svg> Batas Kelurahan": adminkelurahan,
    "<svg height='5' width='20'><line x1='0' y1='0' x2='18' y2='0' style='stroke:rgb(255,0,0);stroke-width:4' /></svg> Jalan Utama": jalanutama,
    "<svg height='5' width='20'><line x1='0' y1='0' x2='18' y2='0' style='stroke:rgb(255,0,0);stroke-width:1' /></svg> Jalan Lokal": jalanlokal,
    "<svg height='5' width='20'><line x1='0' y1='0' x2='18' y2='0' style='stroke:rgb(0,153,255);stroke-width:3' /></svg> Sungai": sungai,
  }
};
var layerControl = L.control.groupedLayers(baseMaps, groupedOverlays, {collapsed: isCollapsed});
layerControl.addTo(map);

// Scale bar
L.control.scale({
  maxWidth: 150,
  imperial: false,
}).addTo(map);

// Logo watermark
L.Control.Watermark = L.Control.extend({
  onAdd: function(map) {
    var img = L.DomUtil.create('img');
    img.src = 'logo/tangsel.png';
    img.style.width = '75px';
    return img;
  },
  onRemove: function(map) {
    // Nothing to do here
  }
});
L.control.watermark = function(opts) {
  return new L.Control.Watermark(opts);
}
L.control.watermark({ position: 'bottomleft' }).addTo(map);

// zoom to full extent
$("#full-extent-btn").click(function() {
  map.fitBounds(adminkelurahan.getBounds());
  $(".navbar-collapse.in").collapse("hide");
  return false;
});