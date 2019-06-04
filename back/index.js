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
<<<<<<< HEAD
// Realiai body-parser yra vertėjas, kuris paruošia datą naudojimui. Kai ji keliauja iš vienos vietos į kitą,
// Ji yra tokenizuojama, gali būti suzipinta ir pan. body-parseris išverčia į žmonių kalbą, kad paprasčiau būtų pasiekti

var databaseCredentials = require('./env'); 

// Kas yra request headers? Objektas turintis papildomą informaciją requeste arba response. Kam tai naudojama? 
// AR header yra įdėta json data? Kokia dar data yra requeste? IP adress, url? 
// XMLHttpRequest - ne iki galo suprantu, kas yra XHR ar jis kur nors turi būti aprašomas, ar tai tik objekto tipas?
=======
var databaseCredentials = require('./env');
var port = require('./port')
>>>>>>> b6c9898b42211d5cdfdd902641718f5dd865f84f

app.use(cors({
  origin: port
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

  const creationDate = '/Date(' + new Date().getTime() + '-0400)/';

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
  const introductionHtml = req.body.introductionHtml;
  const syntaxHtml = req.body.syntaxHtml;
  const parametersHtml = req.body.parametersHtml;
  const remarksHtml = req.body.remarksHtml;
  const introductionMarkdown = req.body.introductionMarkdown;
  const syntaxMarkdown = req.body.syntaxMarkdown;
  const parametersMarkdown = req.body.parametersMarkdown;
  const remarksMarkdown = req.body.remarksMarkdown;
  const helloWorldVersionsHtml = req.body.helloWorldVersionsHtml;
  const title = req.body.title;
  const doctagId = req.body.docTagId;

  const con = mysql.createConnection(databaseCredentials);

  const creationDate = '/Date(' + new Date().getTime() + '-0400)/';

  values = [
    [doctagId,
      false,
      title,
      creationDate,
      0,
      null,
      0,
      null,
      0,
      0,
      0,
      introductionHtml,
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

  const query = 'INSERT INTO topics (DocTagId, IsHelloWorldTopic, Title, CreationDate, ViewCount, LastEditDate, LastEditUserId, LastEditUserDisplayName, ContributorCount, ExampleCount, ExampleScore, IntroductionHtml, SyntaxHtml, ParametersHtml, RemarksHtml, IntroductionMarkdown, SyntaxMarkdown, ParametersMarkdown, RemarksMarkdown, HelloWorldVersionsHtml) VALUES ?';

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

app.post('/Examples', (req, res) => {
  const title = req.body.title;
  const bodyHtml = req.body.bodyHtml;
  const bodyMarkdown = req.body.bodyMarkdown;
  const docTopicId = req.body.docTopicId;

  var con = mysql.createConnection(databaseCredentials);

  const creationDate = '/Date(' + new Date().getTime() + '-0400)/';

  values = [
    [docTopicId,
      title,
      creationDate,
      null,
      0,
      0,
      bodyHtml,
      bodyMarkdown,
      false
    ]
  ]

  const query = 'INSERT INTO examples (DocTopicId, Title, CreationDate, LastEditDate, Score, ContributorCount, BodyHtml, BodyMarkdown, IsPinned) VALUES ?';

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
});

app.delete('/deleteTopic/:id', (req, res) => {
  const con = mysql.createConnection(databaseCredentials);
  const topicId = Number(req.params.id);
  console.log(topicId);

  con.connect(function (err) {
    if (err) throw err;
    console.log('Connected!');

    con.query('DELETE FROM topics WHERE Id = ' + topicId, function (err, result, fields) {
      if (err) {
        res.json(false);
        throw err;
      }
      console.log('Successfully deleted');
    });

    con.end();
  })
})

app.delete('/deleteExample/:id', (req, res) => {
  const con = mysql.createConnection(databaseCredentials);
  const exampleId = Number(req.params.id);

  con.connect(function (err) {
    if (err) throw err;
    console.log('Connected!');

    con.query('DELETE FROM examples WHERE Id = ' + exampleId, function (err, result, fields) {
      if (err) {
        res.json(false);
        throw err;
      }
      console.log('Successfully deleted');
    });

    con.end();
  })
})