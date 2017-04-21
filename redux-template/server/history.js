const History = require('html5-history');

function init(statechange, path, matchRoute) {
  const { hash } = History.getState();
  const { params, query } = matchRoute(hash) || {};
  const pattern = path; // new UrlPattern(`${route.path}(/)`);
  const newQs = false; // qs.stringify(omit(query, '_suid'));

  let url = hash;

  try {
    url = `${pattern.stringify(params)}${newQs ? `?${newQs}` : ''}`;
  } catch (err) {
    // Throw the error away.
  }

  // History.replaceState({ route: route.name, params, query }, route.getPageTitle(), url);
  History.replaceState({ route: 'route.name', params, query }, 'route.getPageTitle()', url);
  History.Adapter.bind(window, 'statechange', statechange(false));
}

export default {
  init,
};
