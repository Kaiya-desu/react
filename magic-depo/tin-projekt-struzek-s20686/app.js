var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
const mageRouter = require('./routes/mageRoute')
const mksRouter = require('./routes/mksRoute')
const spellRouter = require('./routes/spellRoute')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('secret'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


const i18n = require('i18n');
i18n.configure({
  locales: ['en', 'pl'], // języki dostępne w aplikacji. Dla każdego z nich należy utworzyć osobny słownik
  directory: path.join(__dirname, 'locales'), // ścieżka do katalogu, w którym znajdują się słowniki
  objectNotation: true, // umożliwia korzstanie z zagnieżdżonych kluczy w notacji obiektowej
  cookie: 'acme-hr-lang', //nazwa cookies, które nasza aplikacja będzie wykorzystywać do przechowania informacji o języku aktualnie wybranym przez użytkownika
});

app.use(i18n.init);

app.use((req, res, next) => {
  if(!res.locals.lang) {
    const currentLang = req.cookies['acme-hr-lang'];
    res.locals.lang = currentLang;
  }
  next();
});

// tutaj?
const session = require('express-session');
app.use(session({
  secret: 'my_secret_password',
  resave: false
}));

app.use((req, res, next) =>{
  const loggedUser = req.session.loggedUser;
  res.locals.loggedUser = loggedUser;
  if(!res.locals.loginError){
    res.locals.loginError = undefined;
  }
  next();
});

const authApiRouter = require('./routes/api/AuthApiRoute');
app.use('/api/auth', authApiRouter)

app.use('/', indexRouter);

const authUtils = require('/Users/kaiya/tin-projekt-struzek-s20686/util/authUtils.js');
//, authUtils.permitAuthenticatedUserAdmin
app.use('/mages', mageRouter)
app.use('/mages/add', mageRouter);
app.use('/mages/edit/:MageID', mageRouter);
app.use('/mages/details/:MageID', mageRouter);

// Tylko zalogowani użytkownicy mogą wchodzić do MKS
app.use('/mks', authUtils.permitAuthenticatedUser, mksRouter);
app.use('/mks/add', authUtils.permitAuthenticatedUser, mksRouter);
app.use('/mks/edit/:MksID', authUtils.permitAuthenticatedUser, mksRouter);
app.use('/mks/details/:MksID', authUtils.permitAuthenticatedUser, mksRouter);

app.use('/spells', spellRouter);
app.use('/spells/add', spellRouter);
app.use('/spells/edit/:SpellID', spellRouter);
app.use('/spells/details/:SpellID', spellRouter);

const mageApiRouter = require('./routes/api/MageApiRoute');
app.use('/api/mages', mageApiRouter);

const spellApiRouter = require('./routes/api/SpellApiRoute');
app.use('/api/spells', spellApiRouter);

const mksApiRouter = require('./routes/api/MksApiRoute');
app.use('/api/mks', mksApiRouter);

const rankApiRouter = require('./routes/api/RankApiRoute');
app.use('/api/rank', rankApiRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
