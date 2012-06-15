var vengaSpotifyURL = 'http://ws.spotify.com/search/1/track.json?q=';

function vengaBuscarUno(vengaTitulo, cb) {
    vengaTitulo = vengaTitulo.toLowerCase();

    var vengaBusca = encodeURIComponent('title:"' + vengaTitulo + '"');
    $.get(vengaSpotifyURL + vengaBusca, function(data) {
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
    vengaBuscarUno(vengaFrase, function(track) {
        if (track) {
            // TODO: Instead of calling callback here, add track to a list and look up remaining words
            //       (if all words have been looked up, THEN call the callback!)
            cb([track]);
        } else {
            // TODO: Instead of failing here, try a new query with fewer words
            cb(false);
        }
    });
}

$(function() {
    $('#venga-button').click(function() {
        vengaBuscar($('#venga-frase').val(), function(tracks) {
            if (tracks) {
                for (var i = 0; i < tracks.length; i++) {
                    console.log(tracks[i].name);
                }
            } else {
                alert(':´(');
            }
        });
    });

    var vengaTracks = ['2gqGPuOW5gUcpOm6Vt03S7', '0SY8oIKugUoToaPujEfghp'];
    var vengaIframe = $('#venga-musica');
    var vengaUrl = 'https://embed.spotify.com/?uri=spotify:trackset::' + vengaTracks.join(',');
    vengaIframe.attr('src', vengaUrl);
});
