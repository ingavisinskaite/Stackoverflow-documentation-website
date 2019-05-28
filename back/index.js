const express = require('express');
const app = express();
var mysql = require('mysql');
var url = require('url');
var cors = require('cors');
var bodyParser = require('body-parser');

var databaseCredentials = {
  host: 'localhost',
  port: '3307',
  user: 'root',
  password: 'password',
  database: 'crud-cb',
  charset: 'utf8mb4_unicode_ci'
}

app.use(cors({
  origin: 'http://localhost:4200'
}));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
})); // support encoded bodies

app.get('/Doctags', (req, res) => {
  var con = mysql.createConnection(databaseCredentials);

  con.connect(function (err) {
    if (err) throw err;
    console.log('Connected!');


    con.query("SELECT * FROM doctags ORDER BY Title", function (err, result, fields) {
      if (err) throw err;
      res.json(
        result
      );
    });

    con.end();
  });
}).listen('1337');

app.get('/TopicsCount', (req, res) => {
  var con = mysql.createConnection(databaseCredentials);

  con.connect(function (err) {
    if (err) throw err;
    console.log('Connected!');

    let urlParams = url.parse(req.url, true).query;
    const id = Number(urlParams.id);

    con.query("SELECT COUNT(*) AS 'Count' FROM topics WHERE DocTagId = " + id, function (err, result, fields) {
      if (err) throw err;

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

app.get('/Topic/:id', (req, res) => {
  var con = mysql.createConnection(databaseCredentials);

  con.connect(function (err) {
    if (err) throw err;
    console.log('Connected!');

    const id = Number(req.params.id);
    console.log(id);

    con.query("SELECT Title FROM topics WHERE Id = " + id + " ", function (err, result, fields) {
      if (err) throw err;

      res.json(result[0]);
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
    con.query("SELECT * FROM docTagVersions WHERE DocTagId = " + id, function (err, result, fields) {
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
      'FROM topicHistories th ' +
      'JOIN topicHistoryTypes tht ON th.DocTopicHistoryTypeId = tht.Id ' +
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
      'LEFT JOIN contributorTypes ct ON c.DocContributorTypeId = ct.Id ' +
      'LEFT JOIN contributorDeletionReasons cdr ON c.DocContributorDeletionReasonId = cdr.Id ' +
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
  const tag = req.body.tag;
  const name = req.body.name;

  var con = mysql.createConnection(databaseCredentials);

  const creationDate = new Date().getMilliseconds();

  values = [
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
        res.json(false);
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
  const docTagId = req.body.docTagId;

  const con = mysql.createConnection(databaseCredentials);

  const creationDate = new Date().getMilliseconds();

  values = [
    [docTagId,
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

  const query = 'INSERT INTO topics (DocTagId, IsHelloWorldTopic, Title, CreationDate, ViewCount, LastEditDate, LastEditUserId, ContributorCount, ExampleCount, ExampleScore, SyntaxHtml, ParametersHtml, RemarksHtml, IntroductionMarkdown, SyntaxMarkdown, ParametersMarkdown, RemarksMarkdown, HelloWorldVersionsHtml) VALUES ?';

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
  const docTopicId = req.body.DocTopicId;

  var con = mysql.createConnection(databaseCredentials);

  const creationDate = new Date().getMilliseconds();

  values = [
    [ docTopicId,
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