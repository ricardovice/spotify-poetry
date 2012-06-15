var vengaSpotifyURL = 'http://ws.spotify.com/search/1/track.json?q=';

function vengaBuscarUno(vengaTitulo, cb) {
  vengaTitulo = vengaTitulo.toLowerCase();

  var vengaBusca = encodeURIComponent('title:"' + vengaTitulo + '"');
  $.get(vengaSpotifyURL + vengaBusca, function(data) {
    console.log(data)
    for (var i = 0; i < data.tracks.length; i++) {
      var track = data.tracks[i];
      if (track.name.toLowerCase() == vengaTitulo) {
        cb(data.tracks[i]);
        return;
      }
    }
    cb(false);
  });
}

function vengaBuscar(vengaFrase, cb) {
  var vengaPalabras = vengaFrase.split(' ');
  // TODO: join palabras
  vengaBuscarUno(vengaFrase, function(track) {
    if (track) {
      // TODO: Instead of calling callback here, add track to a list and look up remaining words
      //     (if all words have been looked up, THEN call the callback!)
      console.log("HOLA TIO")
      cb([track]);
    } else {
      // TODO: Instead of failing here, try a new query with fewer words
      cb(false);
    }
  });
}

var vengaIframe;
$(function() {
  $('#venga-button').click(function() {
    vengaBuscar($('#venga-frase').val(), function(tracks) {
      if (!tracks) {
        alert(':(');
        return;
      }

      var vengaTracks = [];
      for (var i = 0; i < tracks.length; i++) {
        vengaTracks.push(tracks[i].href.substring(14));
      }

      var vengaUrl = 'https://embed.spotify.com/?uri=spotify:trackset::' + vengaTracks.join(',');
      if (vengaIframe) {
        vengaIframe.attr('src', vengaUrl);
      } else {
        vengaIframe = $('<iframe>').attr({
          src: vengaUrl,
          width: '300',
          height: '380',
          frameborder: '0',
          allowtransparency: 'true'
        });
        $(document.body).append(vengaIframe);
      }
    });
  });
});
