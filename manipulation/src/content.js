const range = require( "py-range" );

const qs = [
  { q: "Leckerste Frucht", a: { v: "Apfel", l: 524 }, b: { v: "Apfel rot", l: 64 }, c: { v: "Banane", l: 208 } },
  { q: "Schönste Stadt", a: { v: "Paris", l: 315 }, b: { v: "Dubei", l: 880 }, c: { v: "Tokyo", l: 1495 } },
  { q: "Bestes Foto", a: { v: "Sonnenblume", l: 430 }, b: { v: "Gänseblümchen", l: 687 }, c: { v: "Gerbara", l: 123 } },
  { q: "Was ist deine Lieblings Social Media Plattform", a: { v: "Facebook", l: 976 }, b: { v: "Snapchat", l: 129 }, c: { v: "Instagram", l: 356 } },
  { q: "Seit wann gibt es Google", a: { v: "1994", l: 329 }, b: { v: "1998", l: 119 }, c: { v: "2001", l: 82 }, correct: "b" },
  { q: "Was enthält am meisten Eisen", a: { v: "Spinat", l: 832 }, b: { v: "Schokolade", l: 40 }, c: { v: "Rindfleisch", l: 1345 }, correct: "b" },
  { q: "Was schmeckt besser", a: { v: "Pepsi", l: 423 }, b: { v: "Coca Cola", l: 124 } },
  { q: "Wie viele Mitglieder hat Facebook", a: { v: "2 mrd", l: 100 }, b: { v: "200 mio", l: 31 }, c: { v: "1,3 mrd", l: 421 }, correct: "a" },
  { q: "Welchen Beruf lernte Stefan Raab ursprünglich", a: { v: "Tischler", l: 5698 }, b: { v: "Erzieher", l: 2243 }, c: { v: "Metzger", l: 430 }, correct: "c" },
  { q: "Welche Stadt der Welt hat die meisten Einwohner", a: { v: "Peking", l: 708 }, b: { v: "New York", l: 1544 }, c: { v: "Tokyo", l: 4456 } },
];

/* ( function generatePug() {
  const out = qs.map( x => ( { qtext: `${x.q}?`, q: `head${qs.indexOf( x )}`, b1: `bar${qs.indexOf( x )}a`, b2: `bar${qs.indexOf( x )}b`, options: `a: ${qs[qs.indexOf( x )].a.v}; b: ${qs[qs.indexOf( x )].b.v};${qs[qs.indexOf( x )].c ? ` c: ${qs[qs.indexOf( x )].c.v}` : ""}` } ) );
  //  options: `a: ${qs[qs.indexOf( x )].a.v}; b: ${qs[qs.indexOf( x )].b.v};${qs[qs.indexOf( x )].c.v ? ` c: ${qs[qs.indexOf( x )].c.v}` : ""}`

  console.log( JSON.stringify( out ) );
} )(); */

/* ( function generateScssAreas() {
  const areas = qs.map( x => `    "head${qs.indexOf( x )} head${qs.indexOf( x )}"\n    "bar${qs.indexOf( x )}a bar${qs.indexOf( x )}b"` );

  const ids = qs.map( x => `#head${qs.indexOf( x )} {\n  grid-area: head${qs.indexOf( x )};\n}\n#bar${qs.indexOf( x )}a {\n  grid-area: bar${qs.indexOf( x )}a;\n}\n#bar${qs.indexOf( x )}b {\n  grid-area: bar${qs.indexOf( x )}b;\n}\n` );

  console.log( `#grid {\n  grid-template-areas:\n${areas.join( "\n" )};\n}\n\n${ids.join( "" )}\n` );
} )(); */

module.exports = qs;
