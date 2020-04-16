/** 
 * DEPLOYMENT
 * 1. Registered `peterhoychan.workers.dev` subdomain
 * 2. A user can visit the deployed version of the site by using the 
 *    following URL: `https://hidden-union-ad15.peterhoychan.workers.dev/`
 */

addEventListener('fetch', event => {
  
  event.respondWith(handleGetUrl(event.request))
})

/**
 * Fetch the target URL
 * @param {Request} request
 */
let res = null;

 async function handleGetUrl(request){
 	// 3. Distribute requests between variants
 	let AB_Testing = Math.random()< 0.5 ? "1" :"2";
 	// 1+2. Request the URLs from the API and Applied the AB Testing
 	let randomURL = "https://cfw-takehome.developers.workers.dev/variants/"+AB_Testing;
 	res = await fetch(randomURL, {
 	 	method :"GET",
 	 });
 	const newRes = new Response(res.body,res);
 	// Extra Credit 2: Persisting variants by Setting Cookies. 
 	newRes.headers.set('Set-Cookie', randomURL);
 	// Extra Credit 1. Declare the Targets which the contents should be adjusted.
 	return new HTMLRewriter().on(["title","h1#title","p#description","a#url"], new ElementHandler()).transform(newRes);
 }

 class ElementHandler{
 	element(element){
 		// Extra Credit 1. Set All Targeted Content as `I LOVE CLOUDFLARE!`
 		element.setInnerContent("I LOVE CLOUDFLARE!");
 	}
 }


