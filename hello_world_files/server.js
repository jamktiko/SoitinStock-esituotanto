/*
Express on pelkistetty backend-sovelluskehys joka tarvitsee valmista
tai kehittäjän tuottamaa lisäkoodia (middlewarea) voidakseen tuottaa palveluja.
Express-sovellukselle voidaan tehdä generaattorilla sovellusrunko,
mutta se ei ole välttämätöntä. Tässä esimerkissä ei ole sovellusrunkoa.
*/
const express = require('express');
// express-sovellus syntyy app-muuttujaan
const app = express();
/*
express static on expressin valmis middleware staattisen sisällön tarjoamiseen
app.use laukaisee middlewaren käytön, se liittää middleware-funktion pathiin johon saapuminen
laukaisee funktion. Jos pathia ei ole kuten tässä, laukaistaan metodi joka kerta kun sovellukseen
tehdään pyyntö. Express hakee filuja public-kansiosta. Kun menet url-osoitteeseen,  
public-kansion nimeä ei sisällytetä urliin.
Sivun haku esim: http://localhost:3000/sivu.html
*/
app.use(express.static(__dirname + '/public'));

// app.get:in argumenttina on itse luotu pieni middleware jossa käytetään response-metodia
// eli se tuottaa responsen. Tämä on yksinkertaista Expressin reititystä
// app.get liittää http:n get-pyynnön juuripolkuun
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.get('/message', (req, res) => {
  res.json({ message: 'Tämä viesti tuli serveriltä!' });
});
//Näin voidaan tarjota JSONia
app.get('/restapi', (req, res) => {
  res.json({
    name: 'Urho Kekkonen',
    job: 'President',
    country: 'Finland',
  });
});

const products = [
  {
    id: 0,
    title: 'First product',
    price: 24.99,
  },
  {
    id: 1,
    title: 'Second product',
    price: 74.99,
  },
  {
    id: 2,
    title: 'Third product',
    price: 54.99,
  },
];

function getProductById(id) {
  for (item of products) {
    if (item.id === id) {
      return item;
    }
  }
}

app.get('/products', (req, res) => {
  res.json(products);
});

app.get('/products/:id', (req, res) => {
  // Huomaa tyypinmuunnos joka on pakko tehdä tai muuten homma ei toimi
  const id = Number(req.params.id);
  res.json(getProductById(id));
});
// http-serveri sisältyy automaattisesti app:iin
// app kuuntelee porttia 3000
// app.listen(3000, () => {
//   console.log('Serveri portissa 3000!');
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveri portissa ${PORT}!`);
});
