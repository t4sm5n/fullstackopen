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
