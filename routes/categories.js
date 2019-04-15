var express = require('express');
var router = express.Router();

var categories = [{ id: 1, name: 'sports' }, { id: 2, name: 'technology' }, { id: 3, name: 'arts' }];

/* GET categories listing. */
router.get('/', function (req, res, next) {
  res.render('categories', { categories: categories });
});

///add
router.get('/create', function (req, res, next) {
  res.render('addEditCategory', {
    formUrl: '/categories/create'
  });
});

router.post('/create', function (req, res, next) {
  req.body.id = categories.length + 1;
  categories.push(req.body);
  res.redirect('/categories')
});

//edit

router.get('/edit/:id', function (req, res, next) {
  const element = categories.find(e => e.id === Number(req.params.id));
  res.render('addEditCategory', {
    name: element.name,
    id: element.id,
    formUrl: `/categories/edit/${element.id}`
  });
});

router.post('/edit/:id', function (req, res, next) {
  const element = categories.find(e => e.id === Number(req.body.id));
  element.name = req.body.name;
  res.redirect('/categories')
});

///delete
router.get('/delete/:id', function (req, res, next) {
  const elementindex = categories.indexOf(categories.filter(e => e.id === Number(req.params.id)[0]));
  categories.splice(elementindex, 1);
  res.redirect('/categories')
});


module.exports = router;

