var paintings = require('./paintings.json');

exports.getRandomPaintings = function(n) {
    var totalAmount = paintings.length,
        i = 0,
        randPaintings = [];

    while (i < n) {
        var painting = paintings[Math.ceil(Math.random() * totalAmount)];

        randPaintings.push({
            attribution: painting.attribution,
            image: painting.image,
            title: painting.title,
            creator: painting.creator
        });

        i++;
    }

    return randPaintings;
}
