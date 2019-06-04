// www.npmjs.com turi visokiausius packages, kuriuos reikia instaliuoti norint juos naudoti (npm install x)
// Package turi visus failus ir funkcijas, kurių reikia, realiai tai yra js libraray.
// Kai jie instaliuoti, mes čia requirinam visus modulius, kurie reikalingi mūsų API kūrimui.
// Kaip suprasti, kad "require" yra "module"? Labiau skamba, kaip metodas ar komanda gauti "module"
const express = require('express');
const app = express();

var mysql = require('mysql');
var url = require('url');
// Inicijuojame kintamąjį "url" kuris turės url modulio savybes, kad galėtume jį parsinti ir iškviesti skirtingas dalis.

var cors = require('cors');
// Leidžia is skirtingų domeinų/serverių gauti informaciją į vieną puslapį.
// Mes tai kam naudojame? Kad veiktų localhost1337 ir localhost4200?

var bodyParser = require('body-parser');
// Realiai body-parser yra vertėjas, kuris paruošia datą naudojimui. Kai ji keliauja iš vienos vietos į kitą,
// Ji yra tokenizuojama, gali būti suzipinta ir pan. body-parseris išverčia į žmonių kalbą, kad paprasčiau būtų pasiekti

var databaseCredentials = require('./env'); 

// Kas yra request headers? Objektas turintis papildomą informaciją requeste arba response. Kam tai naudojama? 
// AR header yra įdėta json data? Kokia dar data yra requeste? IP adress, url? 
// XMLHttpRequest - ne iki galo suprantu, kas yra XHR ar jis kur nors turi būti aprašomas, ar tai tik objekto tipas?

app.use(cors({
  origin: 'http://localhost:4200'
}));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
})); // support encoded bodies
// Kaip app.use čia veikia? Mes pasakome, kad app naudos šiuos dalykus ir jis naudos automatiškai?

app.get('/Doctags', (req, res) => { // O kur requestas? Tipo kreipimasis į mysql?
  var con = mysql.createConnection(databaseCredentials); // Connection kitur perkeltas ir priskirtas prie kintamojo

  con.connect(function (err) { // Pirmiausia prisijungaime prie DB
    if (err) throw err;
    console.log('Connected!');


    con.query("SELECT * FROM doctags ORDER BY Title", function (err, result, fields) {
      if (err) throw err;
      res.json( //Tada jamam is DB ir pasakom, kad response iš servero butu json formatas, o duomenys yra result is mysql?
        result
      );
    });

    con.end(); //Užbaigiame connection, kad netabaluotų. Kas būtų jei neužbaigtume?
  });
}).listen('1337'); // Seka 1337 url ir pagal jo parametrus veikia

app.get('/TopicsCount', (req, res) => {
  var con = mysql.createConnection(databaseCredentials);

  con.connect(function (err) {
    if (err) throw err;
    console.log('Connected!');

    let urlParams = url.parse(req.url, true).query; 
    //Naudojam url moduli, imam url iš request, jei false - tai nieko nedarom? Parsinam i formatą, kokį? Suformuojam query?
    const id = Number(urlParams.id); 
    //Kintamasis id = skaicius, kuris yra id paimtas is isparsintos data. 

    con.query("SELECT COUNT(*) AS 'Count' FROM topics WHERE DocTagId = " + id, function (err, result, fields) {
      if (err) throw err; //Kaip čia tas +id veikia?

      res.json(
        result
      );
    });

    con.end();
  });
})

app.get('/Topics', (req, res) => {
  var con = mysql.createConnection(databaseCredentials);

  con.connect(function (err) {
    if (err) throw err;
    console.log('Connected!');


    let urlParams = url.parse(req.url, true).query;
    const id = Number(urlParams.id);
    const rowToStartFrom = Number(urlParams.skip);
    const rowsToShow = Number(urlParams.take);
    const orderBy = urlParams.orderBy;
    const direction = urlParams.direction;
    const filterBy = urlParams.filter;
    //Iš kur visos šios funkcijos/metodai? 

    con.query("SELECT Title, CreationDate, ViewCount, Id FROM topics WHERE DocTagId = " + id + " " +
      "ORDER BY " + orderBy + " " + direction + " " +
      "LIMIT " + rowToStartFrom + ", " + rowsToShow,
      function (err, result, fields) {
        if (err) throw err;

        res.json(
          result
        );
      });

    con.end();
  });
});

app.get('/Topic/:id', (req, res) => { //Čia ieskome konkretaus topico pagal id?
  var con = mysql.createConnection(databaseCredentials);

  con.connect(function (err) {
    if (err) throw err;
    console.log('Connected!');

    const id = Number(req.params.id);
    console.log(id);

    con.query("SELECT Title FROM topics WHERE Id = " + id + " ", function (err, result, fields) {
      if (err) throw err;

      res.json(result[0]); //Kodėl čia nurodom indexą?
    });

    con.end();
  })

})

app.get('/Examples', (req, res) => {
  var con = mysql.createConnection(databaseCredentials);

  con.connect(function (err) {
    if (err) throw err;
    console.log('Connected!');


    let urlParams = url.parse(req.url, true).query;
    const id = Number(urlParams.id);

    con.query("SELECT Id, Title, BodyHtml FROM examples WHERE DocTopicId = " + id, function (err, result, fields) {
      if (err) throw err;

      res.json(
        result
      );
    });

    con.end();
  });
});

app.get('/DoctagVersions', function (req, res) {
  var con = mysql.createConnection(databaseCredentials);

  con.connect(function (err) {
    if (err) throw err;
    console.log('Connected!');

    let urlParams = url.parse(req.url, true).query;
    const id = Number(urlParams.id);
    con.query("SELECT * FROM doctagversions WHERE DocTagId = " + id, function (err, result, fields) {
      if (err) throw err;

      res.json(
        result
      );
    });

    con.end();
  });
})

app.get('/TopicHistories', function (req, res) {
  var con = mysql.createConnection(databaseCredentials);

  con.connect(function (err) {
    if (err) throw err;
    console.log('Connected!');

    let urlParams = url.parse(req.url, true).query;
    const id = Number(urlParams.id);

    con.query('SELECT th.Text, tht.Name ' +
      'FROM topichistories th ' +
      'JOIN topichistorytypes tht ON th.DocTopicHistoryTypeId = tht.Id ' +
      'WHERE th.DocTopicId = ' + id,
      function (err, result, fields) {
        if (err) throw err;

        res.json(
          result
        );
      });

    con.end();
  });
})

app.get('/Contributors', function (req, res) {
  var con = mysql.createConnection(databaseCredentials);

  con.connect(function (err) {
    if (err) throw err;
    console.log('Connected!');

    let urlParams = url.parse(req.url, true).query;
    const DocExampleId = Number(urlParams.DocExampleId);
    console.log(DocExampleId);


    con.query('SELECT c.Id, ct.Name AS "Type", cdr.Name AS "DeletionReason"' +
      'FROM contributors c ' +
      'LEFT JOIN contributortypes ct ON c.DocContributorTypeId = ct.Id ' +
      'LEFT JOIN contributordeletionreasons cdr ON c.DocContributorDeletionReasonId = cdr.Id ' +
      'WHERE c.DocExampleId = ' + DocExampleId,
      function (err, result, fields) {
        if (err) throw err;

        res.json({
          result
        });
      });

    con.end();
  })
})

app.post('/Doctags', (req, res) => {
  const tag = req.body.tag; //body parseris paima is duomenu "tag", o kaip duomenys is fronto ateina?
  const name = req.body.name;

  var con = mysql.createConnection(databaseCredentials);

  const creationDate = new Date().getMilliseconds();

  values = [ //Kas čia vyksta? Kodėl nedeklaruota? Čia variable? 
    [tag,
      name,
      creationDate,
      0,
      0
    ]
  ]

  const query = 'INSERT INTO doctags (Tag, Title, CreationDate, HelloWorldDocTopicId, TopicCount) VALUES ?';

  con.connect((error) => {
    console.log(error);
    con.query(query, [values], (err, result) => {
      if (err) {
        res.json(false); //Kodėl čia šito reikia? Jei erroras, tai false, prie app.getų nedarėm to
        throw err;
      }
      res.json(result);
    });

    con.end();
  });
});

app.post('/Topics', function (req, res) {
  const syntaxHtml = req.body.syntaxHtml;
  const parametersHtml = req.body.parametersHtml;
  const remarksHtml = req.body.remarksHtml;
  const introductionMarkdown = req.body.introductionMarkdown;
  const syntaxMarkdown = req.body.syntaxMarkdown;
  const parametersMarkdown = req.body.parametersMarkdown;
  const remarksMarkdown = req.body.remarksMarkdown;
  const helloWorldVersionsHtml = req.body.helloWorldVersionsHtml;
  const title = req.body.title;

  const con = mysql.createConnection(databaseCredentials);

  const creationDate = new Date().getMilliseconds();

  values = [
    [doctagId,
      false,
      title,
      creationDate,
      0,
      null,
      0,
      0,
      0,
      0,
      syntaxHtml,
      parametersHtml,
      remarksHtml,
      introductionMarkdown,
      syntaxMarkdown,
      parametersMarkdown,
      remarksMarkdown,
      helloWorldVersionsHtml
    ]
  ]

  const query = 'INSERT INTO doctags (Tag, Title, CreationDate, HelloWorldDocTopicId, TopicCount) VALUES ?';

  con.connect((error) => {
    console.log(error);
    con.query(query, [values], (err, result) => {
      if (err) {
        res.json(false);
        throw err;
      }
      res.json(result);
    });

    con.end();
  });
})

app.delete('Topics/delete', (req, res) => {
  const con = mysql.createConnection(databaseCredentials);

  con.connect(function (err) {
    if (err) throw err;
    console.log('Connected!');

    const topicId = Number(req.body.id);
    console.log(id);

    con.query('DELETE FROM topics WHERE Id = ' + topicId, function (err, result, fields) {
      if (err) throw err;

      console.log('Successfully deleted')
    });

    con.end();
  })
})