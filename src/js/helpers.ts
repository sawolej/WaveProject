/**
 * Get GlobalThis
 */
 export const glob = globalThis

 /**
  * Get element
  */
 export const canvas = glob.document.getElementById('render') as HTMLElement
 
 /**
  * Get location hash
  */
 export const getURLHash = () => glob.document.location.hash
 
 /**
  * Delegate event listener to element handler
  *  @param {HTMLElement} el
  *  @param {string} selector
  *  @param {string} event
  *  @param {HTMLElement} handler
  */
 export const delegate = (el: HTMLElement, selector: string, event: string, handler: any) => {
	 el.addEventListener(event, (e) => {
		 if ((e.target as Element).matches(selector)) handler(e, el);
	 });
 };
 
 /**
  * Inserts as a first child of html element
  *  @param {HTMLElement} el
  *  @param {string} html
  */
 export const insertHTML = (el: HTMLElement, html: string) => el.insertAdjacentHTML("afterbegin", html);
 
 /**
  * Replaces children of html element
  *  @param {HTMLElement} el
  *  @param {string} html
  */
 export const replaceHTML = (el: HTMLElement, html: string) => {
	 el.replaceChildren();
	 insertHTML(el, html);
 };
 