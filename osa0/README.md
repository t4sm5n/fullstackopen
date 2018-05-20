# Week 0

## 0.3 Muistiinpanojen sivu

![sekvenssikaavio](https://www.websequencediagrams.com/cgi-bin/cdraw?lz=dGl0bGUgTXVpc3RpaW5wYW5vdAoKa2F5dHRhamEtPnNlbGFpbjoKbm90ZSBsZWZ0IG9mIAAPBgAdCSBraXJqb2l0dGFhIG9zb2l0ZXJpdmlsbGUKZnVsbHN0YWNrLWV4YW1wbGVhcHAuaGVyb2t1YXBwLmNvbS9ub3RlcwplbmQgbm90ZQoAagYtPnBhbHZlbGluOiBHRVQgAB8pAIEaDQA8CAptdW9kb3N0ZXRhYW4gSFRNTCBtaXNzw6Qgb3RzaWtrbywgbGlzdGEgamEgZm9ybQCBBAoAfggAgX8JIHN0YXR1cyAyMDAsIHNpdnUASgYta29vZGkKAGgXAII_BW1lbiA8aGVhZD4gb3NpbyBzaXPDpGx0w6TDpCB2aWl0dGF1a3NldCBzdHlsZSBzaGVldC0KamEgamF2YXNjcmlwdC10aWVkb3N0b2loaW4sIGpvdGVuIG5lIGxhZGEAgVUFAIItB21lbHRhAIJICgCCGTptYWluLmNzcwCBZyAAgSgKAC1AagBMIACBexMAgl4YAIIuCwCDGQUgdGVrZWUAhEoFa3V0c3VuIApqb2xsYSBoYQCEEwZqc29uAIJbCQCBfFFkYXRhLmpzb24AgUIgAHoMAIRDDwCGcQcAhw4GIG7DpHl0AIQ7BgCDcQkAhAAFYXV0dGFtAIVkBzpuLApqb2hvbiBvbiBwYXJzaXR0dQCESwtpbGzDpACBbg5uCgCFFAltw6QAhhYGLCBqYSBqb2thIG5vdWRhAIdnBQCFIAtpbgptw6TDpHJpdHRlbGUABwUgdWxrb27DpGvDtsOkAIdZCQ&s=default)
```
title Muistiinpanot

kayttaja->selain:
note left of selain
kayttaja kirjoittaa osoiteriville
fullstack-exampleapp.herokuapp.com/notes
end note
selain->palvelin: GET fullstack-exampleapp.herokuapp.com/notes
note left of palvelin
muodostetaan HTML missä otsikko, lista ja form
end note
palvelin->selain: status 200, sivun HTML-koodi

note left of palvelin
selaimen <head> osio sisältää viittaukset style sheet-
ja javascript-tiedostoihin, joten ne ladataan palvelimelta
end note

selain->palvelin: GET fullstack-exampleapp.herokuapp.com/main.css
palvelin->selain: status 200, style sheet

selain->palvelin: GET fullstack-exampleapp.herokuapp.com/main.js
palvelin->selain: status 200, javascript-tiedosto

note left of palvelin
javascript-koodi tekee GET kutsun 
jolla haetaan json-tiedosto palvelimelta
end note

selain->palvelin: GET fullstack-exampleapp.herokuapp.com/data.json
palvelin->selain: status 200, json-tiedosto

note left of selain
selain näyttää palvelimen palauttaman HTML:n,
johon on parsittu javascriptillä json-tiedoston
sisältämä lista, ja joka noudattaa style sheetin
määrittelemää ulkonäköä
end note
```
## 0.4 Uusi muistiinpano

![sekvenssikaavio](https://www.websequencediagrams.com/cgi-bin/cdraw?lz=dGl0bGUgVXVzaSBtdWlzdGlpbnBhbm8KCmtheXR0YWphLT5zZWxhaW46Cm5vdGUgbGVmdCBvZiAADwYAHQkga2lyam9pdHRhYSB0ZWtzdGlrZW50dMOkw6RuAFAJLQpwYW5vbiBqYSBwYWluYWEgJ1RhbGxldGEnLW5hcHBpYQplbmQgbm90ZQoAbwYtPnBhbHZlbGluOiBQT1NUIGZ1bGxzdGFjay1leGFtcGxlYXBwLmhlcm9rdWFwcC5jb20vbmV3XwA-BQCBIw0AQAgAUgcgdGVrZWUATgZrdXRzdW4AGghtZWxsZSwgam9zc2EKcGFyYW1ldHJpbmEgdQCCFBAgAIEkCgCBHggAgiQJIHN0YXR1cyAzMDIsIHV1ZGVsbGVlbm9oamF1cyBzaXZ1bGxlAIFkBXMAgRAXAIFwCCBvaGphYQCCaQZtZW4gc2FtYWxsZQA8CCwgam90ZW4Kc2l2dSBsYWRhdGFhbgBsBXMABQUoIHTDpHN0w6QgZXRlZW5ww6RpbgpzYW1hIGt1AIIBBWh0w6R2w6QgMykAgmAcR0UAglUmAIE2G211b2Rvc3RlAIEcBUhUTUwgbWlzc8OkIG90c2lra28sIGxpc3RhIGphIGZvcm0AgjkjMjAwLACCRwUASgYta29vZGkKAINbHG1lbiA8aGVhZD4gb3NpbyBzaXPDpGwAhSEFIHZpaXR0YXVrc2V0IHN0eWxlIHNoZWV0LQpqYSBqYXZhc2NyaXB0LXRpZWRvc3RvaWhpbgCCdgcgbmUAgnEKAIQ8CnQAhUMLAIIZOm1haW4uY3NzAIFnIACBKAoALUBqAEwgAIF7EwCCXhgAgi4LAIMZBQCGcAdHRQCGbQkKam9sbGEgaGEAhBMGanNvbgCCWwkAgXxRZGF0YS5qc28AhlUKAIFLFwB6DACEQw8AiXIHAIhAB27DpHkAiWEGAIg2CgCIRgVhdXR0YW0AhWQHOm4sCmpvaG9uIG9uIHBhcnNpdHR1AIRLC2lsbMOkAIFuDm4KAIUUCW3DpACGFgYsIGphIGpva2Egbm91ZGEAimgFAIUgC2luCm3DpMOkcml0dGVsZQAHBSB1bGtvbsOka8O2w6QAilQK&s=default)
```
title Uusi muistiinpano

kayttaja->selain:
note left of selain
kayttaja kirjoittaa tekstikenttään muistiin-
panon ja painaa 'Talleta'-nappia
end note
selain->palvelin: POST fullstack-exampleapp.herokuapp.com/new_note
note left of palvelin
selain tekee POST kutsun palvelimelle, jossa
parametrina uusi muistiinpano 
end note
palvelin->selain: status 302, uudelleenohjaus sivulle notes
note left of palvelin
palvelin ohjaa selaimen samalle sivulle, joten
sivu ladataan uudestaan ( tästä eteenpäin
sama kuin tehtävä 3)
end note
selain->palvelin: GET fullstack-exampleapp.herokuapp.com/notes
note left of palvelin
muodostetaan HTML missä otsikko, lista ja form
end note
palvelin->selain: status 200, sivun HTML-koodi

note left of palvelin
selaimen <head> osio sisältää viittaukset style sheet-
ja javascript-tiedostoihin, joten ne ladataan palvelimelta
end note

selain->palvelin: GET fullstack-exampleapp.herokuapp.com/main.css
palvelin->selain: status 200, style sheet

selain->palvelin: GET fullstack-exampleapp.herokuapp.com/main.js
palvelin->selain: status 200, javascript-tiedosto

note left of palvelin
javascript-koodi tekee GET kutsun 
jolla haetaan json-tiedosto palvelimelta
end note

selain->palvelin: GET fullstack-exampleapp.herokuapp.com/data.json
palvelin->selain: status 200, json-tiedosto

note left of selain
selain näyttää palvelimen palauttaman HTML:n,
johon on parsittu javascriptillä json-tiedoston
sisältämä lista, ja joka noudattaa style sheetin
määrittelemää ulkonäköä
end note
```
## 0.5 Single page app

Single page app-sekvenssikaavio on samanlainen kuin tehtävän 0.3 sekvenssikaavio, paria polkua lukuunottamatta (https://fullstack-exampleapp.herokuapp.com/notes -> https://fullstack-exampleapp.herokuapp.com/spa ja main.js -> spa.js)
## 0.6 Uusi muistiinpano SPA:ssa

![sekvenssikaavio](https://www.websequencediagrams.com/cgi-bin/cdraw?lz=dGl0bGUgU2luZ2xlIHBhZ2UgYXBwCgprYXl0dGFqYS0-c2VsYWluOgpub3RlIGxlZnQgb2YgAA8GCmvDpHl0dMOkasOkIGtpcmpvaXR0YWEgc2l2dWxsYSBvbGV2YW4gbG9tYWtrZWVuCnRla3N0aWtlbnR0w6TDpG4gaGFsdWFtYW5zYSBtdWlzdGlpbnBhbm9uIGphCnBhaW5hYSB0YWxsZXRhLW5hcHBpYQplbmQgbm90ZQoAgRIGLT5wYWx2ZWxpbjogUE9TVCBmdWxsc3RhY2stZXhhbXBsZWFwcC5oZXJva3VhcHAuY29tL25ld19ub3RlX3NwYQCBSQ4ARAgAVgcAgUgMdXVkZW4AgRYPbm90ZXMtCm5pbWlzZWVuIHRhdWx1a2tvb24sIHNla8OkIGzDpGhlAIFnBgoAgVEQIGFpa2FsZWltYW4AcQhtZWxsZSwKam9rYQCCRAx0aWVkb3QgZXNpbWVya2lrc2kgdGlldG8tCmthbnRhYW4uIHTDpG3DpG4gasOkbGtlZW4ga3V0c3V0YWFuIG1ldG9kaWEAUAdwaWlyAIJ4BQCCZA10IHNpc8OkbHTDpHbDpG4KbGlzdGFuAIFwBWxsZWVuLgCCbgoAgmgIAIQRCSBzdGF0dXMgMjAxLCBjcmVhdGVkAIJAF3B5c3kAg3MHZQBTByBzYW1hbGwAhCwJLAoAbAlvaGphdXN0YSBlaSB0YXBhaGR1IGVpa8OkCnNpdMOkIHRhcnZpdACECAs&s=default)
```
title Uusi muistiinpano SPA:ssa

kayttaja->selain:
note left of selain
käyttäjä kirjoittaa sivulla olevan lomakkeen
tekstikenttään haluamansa muistiinpanon ja
painaa talleta-nappia
end note
selain->palvelin: POST fullstack-exampleapp.herokuapp.com/new_note_spa
note left of palvelin
selain kirjoittaa uuden muistiinpanon notes-
nimiseen taulukkoon, sekä lähettää
muistiinpanon ja aikaleiman palvelimelle,
joka kirjoittaa tiedot esimerkiksi tieto-
kantaan. tämän jälkeen kutsutaan metodia,
joka piirtää muistiinpanot sisältävän
listan uudelleen.
end note
palvelin->selain: status 201, created
note left of palvelin
pysytään edelleen samalla sivulla,
uudelleenohjausta ei tapahdu eikä
sitä tarvita
end note

```
