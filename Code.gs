/**
 * Human Stack AI — Google Apps Script web-app entry point.
 *
 * Serves index.html as a web app, gated to the Workspace domain
 * (see appsscript.json -> webapp.access = "DOMAIN").
 *
 * Deploy: see DEPLOY-GOOGLE-WORKSPACE.md
 */
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('Human Stack AI')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    // Allow the page to be embedded (e.g. inside a Google Site) later.
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
