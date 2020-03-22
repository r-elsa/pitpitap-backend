const Joi = require("joi");

const express = require("express");

const cors = require("cors");

const connection = require("./mongo");
const questionsAnswers = require("./mongo/qandas");
const slides = require("./mongo/slides");

const app = express();
app.use(cors());

app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Authorization, Content-Type");
  res.header("Access-Control-Expose-Headers", "X-Total-Count");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header("X-Total-Count", 6);
  next();
});

app.get("/", (req, res, next) => {
  res.send("Welome to pitpitap's backend!");
});

app.get("/api/qandas", (req, res, next) => {
  questionsAnswers.find({}, function(err, data) {
    res.send(data);
  });
});

app.get("/api/slides", (req, res, next) => {
  slides.find({}, function(err, data) {
    res.send(data);
  });
});

/* app.get("/api/qandas/:id", (req, res, next) => {
  const item = qandas.find(i => i.id === parseInt(req.params.id));
  if (!item) {
    res.status(404).send("Item with given id not found");
    return;
  }
  res.send(item);
});



app.post("/api/qandas", (req, res, next) => {
  const result = validateItem(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const item = {
    id: qandas.length + 1,
    q: req.body.q,
    a: req.body.a
  };
  qandas.push(item);

  res.send(item);
});



app.put("/api/qandas/:id", (req, res, next) => {
  const item = qandas.find(i => i.id === parseInt(req.params.id));
  if (!item) {
    res.status(404).send("Item with given id not found");
    return;
  }
  const result = validateItem(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  item.q = req.body.q;
  item.a = req.body.a;

  res.send(item);
});

app.delete("/api/qandas/:id", (req, res, next) => {
  const item = qandas.find(i => i.id === parseInt(req.params.id));
  if (!item) {
    res.status(404).send("Item with given id not found");
    return;
  }

  const deleteItemIndex = qandas.indexOf(item);
  qandas.splice(deleteItemIndex, 1);
  res.send(item);
});

function validateItem(item) {
  const schema = {
    q: Joi.string()
      .min(3)
      .required(),
    a: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(item, schema);
}
 */

// ADMIN ROUTES

//GET ALL QA:S
app.get("/api/admin/faq", (req, res, next) => {
  questionsAnswers.find({}, function(err, data) {
    res.send(data);
  });
});

//GET ALL SLIDES
app.get("/api/admin/slides", (req, res, next) => {
  slides.find({}, function(err, data) {
    res.send(data);
  });
});

//GET ONE PARTICULAR QA
app.get("/api/admin/faq/:id", (req, res, next) => {
  const searchId = parseInt(req.params.id);

  questionsAnswers.find({ id: searchId }, function(err, data) {
    const idObject = data[0];
    res.send(idObject);
  });
});

//GET ONE PARTICULAR SLIDE

app.get("/api/admin/slides/:id", (req, res, next) => {
  const searchId = parseInt(req.params.id);
  slides.find({ id: searchId }, function(err, data) {
    const idObject = data[0];
    res.send(idObject);
  });
});

//CREATE NEW QA

app.post("/api/admin/faq", (req, res, next) => {
  questionsAnswers
    .find({})
    .sort({ id: -1 })
    .limit(1)
    .exec(function(err, doc) {
      let max_id = doc[0].id;
      let newId = max_id + 1;

      const item = {
        id: newId,
        question: req.body.Question,
        answer: req.body.Answer
      };

      questionsAnswers.create(item, function(err, result) {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      });
    });
});

/// CREATE NEW SLIDE
app.post("/api/admin/slides", (req, res, next) => {
  slides
    .find({})
    .sort({ id: -1 })
    .limit(1)
    .exec(function(err, doc) {
      let max_id = doc[0].id;
      let newId = max_id + 1;

      const item = {
        id: newId,
        title: req.body.title
      };

      slides.create(item, function(err, result) {
        if (err) {
          res.send(err);
        } else {
          console.log(result);
          res.send(result);
        }
      });
    });
});

//DELETE ONE QA
app.delete("/api/admin/faq/:id", (req, res, next) => {
  const searchId = parseInt(req.params.id);

  questionsAnswers.find({ id: searchId }, function(err, data) {
    if (err) {
      return console.log(err);
    }
    const deletedItem = data;

    questionsAnswers.findOneAndDelete({ id: searchId }, function(err, data) {
      res.send(deletedItem);
    });
  });
});

/// DELETE ONE SLIDE
app.delete("/api/admin/slides/:id", (req, res, next) => {
  const searchId = parseInt(req.params.id);

  slides.find({ id: searchId }, function(err, data) {
    if (err) {
      return console.log(err);
    }
    const deletedItem = data;

    slides.findOneAndDelete({ id: searchId }, function(err, data) {
      res.send(deletedItem);
    });
  });
});

///UPDATING ONE QA

app.put("/api/admin/faq/:id", (req, res, next) => {
  questionsAnswers.findOneAndUpdate(
    {
      id: req.params.id
    },
    { $set: { question: req.body.question, answer: req.body.answer } },
    { upsert: true },
    (err, update) => {
      if (err) {
        res.send("error updating ");
      } else {
        res.send(update);
      }
    }
  );
});

//UPDATE ONE SLIDE

app.put("/api/admin/slides/:id", (req, res, next) => {
  slides.findOneAndUpdate(
    {
      id: req.params.id
    },
    { $set: { title: req.body.title } },
    { upsert: true },
    (err, update) => {
      if (err) {
        res.send("error updating ");
      } else {
        res.send(update);
      }
    }
  );
});

//INITIALIZATION

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
