var vengaSpotifyURL = 'http://ws.spotify.com/search/1/track.json?q=';

function vengaBuscarUno(vengaTitulo, cb, page) {
  if (!page) page = 1;
  vengaTitulo = vengaTitulo.toLowerCase();
  var vengaBusca = encodeURIComponent('title:"' + vengaTitulo + '"') + '&page=' + page;
  $.get(vengaSpotifyURL + vengaBusca, function(data) {
    if (!data.tracks.length) {
      cb(false);
      return;
    }
    for (var i = 0; i < data.tracks.length; i++) {
      var track = data.tracks[i];
      if (track.name.toLowerCase() == vengaTitulo) {
        cb(data.tracks[i]);
        return;
      }
    }
    vengaBuscarUno(vengaTitulo, cb, page+1)
  });
}

function vengaBuscar(vengaFrase, cb) {
  var vengaTracks = []
  var vengaPalabras = vengaFrase.split(' ');
  // TODO: join palabras
  var vengaTitulos = vengaPalabras;
  for (var i = 0; i < vengaTitulos.length; i++) {
    vengaBuscarUno(vengaTitulos[i], function(track) {
      if (track) {
        // TODO: Instead of calling callback here, add track to a list and look up remaining words
        //     (if all words have been looked up, THEN call the callback!)
        vengaTracks.push(track);
        if (vengaTracks.length == vengaTitulos.length) {
          cb(vengaTracks);
        }
      } else {
        console.log('FAIL');
      }
    });
  }
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
