const fs = require("fs");

// Ensimmäinen parametri on tiedoston nimi, toinen on kirjoitettava teksti, kolmas on callback funktio, joka suoritetaan, jos haivaitaan virhe
fs.writeFile("node.txt", "Hyvää joulua", function(err) {
  if (err) throw err;
  console.log("Saved!");
});

fs.readFile("node.txt", "utf8", function(err, contents) {
  console.log(contents);
});
