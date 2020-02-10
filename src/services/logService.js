function init() {
  //for future loggin service to use, ex raven/sentry etc
}

function log(error) {
  console.error(error);
}

export default {
  init,
  log
};
