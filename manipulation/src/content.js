const range = require( "py-range" );

const qs = [
  { q: "Bester Apfel", a: { v: "Schöner Apfel", l: 10 }, b: { v: "Mittler Apfel", l: 97 }, c: { v: "Hässlicher Apfel", l: 300 } },
  { q: "Schönste Stadt", a: { v: "Paris", l: 2 }, b: { v: "Dubei", l: 10 }, c: { v: "Tokyo", l: 80 } },
  { q: "Bestes Foto", a: { v: "Sonnenblume", l: 230 }, b: { v: "Gänseblümchen", l: 687 }, c: { v: "Gerbara", l: 75 } },
  { q: "Was ist deine Lieblings Social Media Plattform", c: { v: "Facebook", l: 976 }, b: { v: "Snapchat", l: 129 }, a: { v: "Instagram", l: 356 } },
  { q: "Seit wann gibt es Google", c: { v: "1994", l: 329 }, a: { v: "1998", l: 119 }, b: { v: "2001", l: 82 }, correct: "a" },
  { q: "Was enthält am meisten Eisen", a: { v: "Spinat", l: 832 }, b: { v: "Schokolade", l: 50 }, c: { v: "Rindfleisch", l: 1345 }, correct: "b" },
  { q: "Was schmeckt besser", a: { v: "Pepsi", l: 423 }, b: { v: "Coca Cola", l: 124 } },
  { q: "Wie viele Mitglieder hat Facebook", a: { v: "2 mrd", l: 100 }, b: { v: "200 mio", l: 31 }, c: { v: "1,3 mrd", l: 421 }, correct: "a" },
  { q: "Welchen Beruf lernte Stefan Raab ursprünglich", c: { v: "Tischler", l: 758 }, a: { v: "Erzieher", l: 450 }, b: { v: "Metzger", l: 265 }, correct: "b" },
  { q: "Welche Stadt der Welt hat die meisten Einwohner", a: { v: "Peking", l: 446 }, b: { v: "New York", l: 692 }, c: { v: "Tokyo", l: 1234 } },
];

/* ( function generatePug() {
  const out = qs.map( x => ( { qtext: `${x.q}?`, q: `head${qs.indexOf( x )}`, b1: `bar${qs.indexOf( x )}a`, b2: `bar${qs.indexOf( x )}b`, options: `a: ${qs[qs.indexOf( x )].a.v}; b: ${qs[qs.indexOf( x )].b.v};${qs[qs.indexOf( x )].c ? ` c: ${qs[qs.indexOf( x )].c.v}` : ""}` } ) );

  console.log( JSON.stringify( out ) );
} )(); */

/* ( function generateScssAreas() {
  const areas = qs.map( x => `    "head${qs.indexOf( x )} head${qs.indexOf( x )}"\n    "bar${qs.indexOf( x )}a bar${qs.indexOf( x )}b"` );

  const ids = qs.map( x => `#head${qs.indexOf( x )} {\n  grid-area: head${qs.indexOf( x )};\n}\n#bar${qs.indexOf( x )}a {\n  grid-area: bar${qs.indexOf( x )}a;\n}\n#bar${qs.indexOf( x )}b {\n  grid-area: bar${qs.indexOf( x )}b;\n}\n` );

  console.log( `#grid {\n  grid-template-areas:\n${areas.join( "\n" )};\n}\n\n${ids.join( "" )}\n` );
} )(); */

module.exports = qs;
