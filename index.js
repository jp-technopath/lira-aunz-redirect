/**
 * A map of the URLs to redirect to
 * @param {Object} countryMap
 */
const countryMap = {
  AU: 'https://liraclinical.com.au',
  NZ: 'https://liraclinical.com.au',
};

/**
 * Returns a redirect determined by the country code
 * @param {Request} request
 */
function redirect(request) {
  // Use the cf object to obtain the country of the request
  // more on the cf object: https://developers.cloudflare.com/workers/runtime-apis/request#incomingrequestcfproperties
  const country = request.cf.country;

  if (country != null && country in countryMap) {
    const url = countryMap[country];
    return Response.redirect(url);
  } else {
    return fetch(request);
  }
}

addEventListener('fetch', event => {
  event.respondWith(redirect(event.request));
});
