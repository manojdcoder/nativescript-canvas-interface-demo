"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var image_source_1 = require("tns-core-modules/image-source");
var platform_1 = require("platform");
var observableModule = require("data/observable");
var _ = require('lodash');
var nsCanvasInterfaceModule = require('nativescript-canvas-interface');
var oNSCanvasInterface;
var imageView;
var page;
/**
 * Function to be executed on Page Load.
 */
function pageLoaded(args) {
    page = args.object;
    var webView = page.getViewById('webView');
    imageView = page.getViewById('img');
    initCanvasInterface(webView);
    setBindingContext();
}
exports.pageLoaded = pageLoaded;
/**
 * Initializes canvas interface plugin and sets image to canvas, once webview is loaded.
 */
function initCanvasInterface(webView) {
    oNSCanvasInterface = new nsCanvasInterfaceModule.NativescriptCanvasInterface(webView, 'canvasEle');
    webView.on('loadFinished', function (args) {
        if (!args.error) {
            var width = platform_1.screen.mainScreen.widthDIPs;
            var aspectRatio = imageView.imageSource.width / imageView.imageSource.height;
            var height = width / aspectRatio;
            oNSCanvasInterface.setImage('setCanvasImage', imageView.imageSource, [{ width: width, height: height }]);
        }
    });
}
/**
 * Sets Page binding context for two way data binding.
 */
function setBindingContext() {
    var context = new observableModule.Observable();
    context.set('brightness', 0);
    context.set('imageSource', image_source_1.fromFile("~/road-nature.jpg"));
    // Adjusting image brightness, once the brightness slider position is changed.
    context.on('propertyChange', _.debounce(function (data) {
        if (data.propertyName === "brightness") {
            var brightnessValue = data.object.get('brightness');
            setBrightness(brightnessValue);
        }
    }, 100));
    page.bindingContext = context;
}
/**
 * Performs image manipulation on canvas in webview, and renders the returned image in Image element.
 */
function performCanvasMainpulation(fnName, args) {
    imageView.animate({
        opacity: 0.5,
        duration: 150
    });
    oNSCanvasInterface.createImage(fnName, args).then(function (result) {
        page.bindingContext.set("imageSource", result.image);
        imageView.animate({
            opacity: 1,
            duration: 150
        });
    }, function (error) {
        console.log('error', error);
    });
}
/**
 * Adjusts brighness of the image.
 */
function setBrightness(value) {
    performCanvasMainpulation('setBrightness', [value]);
}
/**
 * Resets brightness on reset image operation.
 */
function resetBrightness() {
    page.bindingContext.set('brightness', 0);
}
/**
 * Applies preset selected by user to the image.
 */
function setPreset(args) {
    var presetId = args.object.id;
    resetBrightness();
    performCanvasMainpulation('setPreset', [presetId]);
}
exports.setPreset = setPreset;
/**
 * Resets image to the its initial state.
 */
function resetImage() {
    resetBrightness();
    performCanvasMainpulation('resetImage');
}
exports.resetImage = resetImage;
// TODO: Add provision to download the edited image
// export function downloadImage(){
//     var gallaryPath;
//     if(android){
//         gallaryPath = path.join(android.os.Environment.getExternalStorageDirectory()+'', ''+android.os.Environment.DIRECTORY_PICTURES, 'demo.png');
//         console.log('gallary path is1 ', gallaryPath);
//         var folder = knownFolders.documents();
//         var fullPath = path.join(folder.path, "Test.png");
//         try{
//             imageView.imageSource.saveToFile(fullPath, ImageFormat.png);    
//         }catch(e){
//             console.log('error is === ', e);
//         }   
//     }
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUEsOERBQXlEO0FBRXpELHFDQUFrQztBQUNsQyxrREFBcUQ7QUFFckQsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzFCLElBQUksdUJBQXVCLEdBQUcsT0FBTyxDQUFDLCtCQUErQixDQUFDLENBQUM7QUFDdkUsSUFBSSxrQkFBa0IsQ0FBQztBQUN2QixJQUFJLFNBQWdCLENBQUM7QUFDckIsSUFBSSxJQUFJLENBQUM7QUFFVDs7R0FFRztBQUNILG9CQUEyQixJQUFJO0lBQzNCLElBQUksR0FBUyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3pCLElBQUksT0FBTyxHQUFZLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbkQsU0FBUyxHQUFVLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0MsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDN0IsaUJBQWlCLEVBQUUsQ0FBQztBQUN4QixDQUFDO0FBTkQsZ0NBTUM7QUFFRDs7R0FFRztBQUNILDZCQUE2QixPQUFnQjtJQUN6QyxrQkFBa0IsR0FBRyxJQUFJLHVCQUF1QixDQUFDLDJCQUEyQixDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQztJQUNuRyxPQUFPLENBQUMsRUFBRSxDQUFDLGNBQWMsRUFBRSxVQUFDLElBQUk7UUFDNUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNkLElBQUksS0FBSyxHQUFHLGlCQUFNLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQztZQUN4QyxJQUFJLFdBQVcsR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztZQUM3RSxJQUFJLE1B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c0NvbnRlbnQiOlsiaW1wb3J0IHsgUGFnZSB9IGZyb20gJ3VpL3BhZ2UnO1xuaW1wb3J0IHsgV2ViVmlldyB9IGZyb20gJ3VpL3dlYi12aWV3JztcbmltcG9ydCB7IEltYWdlIH0gZnJvbSAndWkvaW1hZ2UnO1xuaW1wb3J0IHsgR3JpZExheW91dCB9IGZyb20gJ3VpL2xheW91dHMvZ3JpZC1sYXlvdXQnO1xuaW1wb3J0IHsgZnJvbUZpbGUgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL2ltYWdlLXNvdXJjZSc7XG5cbmltcG9ydCB7IHNjcmVlbiB9IGZyb20gJ3BsYXRmb3JtJztcbmltcG9ydCBvYnNlcnZhYmxlTW9kdWxlID0gcmVxdWlyZShcImRhdGEvb2JzZXJ2YWJsZVwiKTtcbmltcG9ydCB7IHBhdGgsIGtub3duRm9sZGVycyB9IGZyb20gJ2ZpbGUtc3lzdGVtJztcbnZhciBfID0gcmVxdWlyZSgnbG9kYXNoJyk7XG52YXIgbnNDYW52YXNJbnRlcmZhY2VNb2R1bGUgPSByZXF1aXJlKCduYXRpdmVzY3JpcHQtY2FudmFzLWludGVyZmFjZScpO1xudmFyIG9OU0NhbnZhc0ludGVyZmFjZTtcbnZhciBpbWFnZVZpZXc6IEltYWdlO1xudmFyIHBhZ2U7XG5cbi8qKlxuICogRnVuY3Rpb24gdG8gYmUgZXhlY3V0ZWQgb24gUGFnZSBMb2FkLiAgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYWdlTG9hZGVkKGFyZ3MpIHtcbiAgICBwYWdlID0gPFBhZ2U+YXJncy5vYmplY3Q7XG4gICAgdmFyIHdlYlZpZXcgPSA8V2ViVmlldz5wYWdlLmdldFZpZXdCeUlkKCd3ZWJWaWV3Jyk7XG4gICAgaW1hZ2VWaWV3ID0gPEltYWdlPnBhZ2UuZ2V0Vmlld0J5SWQoJ2ltZycpO1xuICAgIGluaXRDYW52YXNJbnRlcmZhY2Uod2ViVmlldyk7XG4gICAgc2V0QmluZGluZ0NvbnRleHQoKTtcbn1cblxuLyoqXG4gKiBJbml0aWFsaXplcyBjYW52YXMgaW50ZXJmYWNlIHBsdWdpbiBhbmQgc2V0cyBpbWFnZSB0byBjYW52YXMsIG9uY2Ugd2VidmlldyBpcyBsb2FkZWQuXG4gKi9cbmZ1bmN0aW9uIGluaXRDYW52YXNJbnRlcmZhY2Uod2ViVmlldzogV2ViVmlldykge1xuICAgIG9OU0NhbnZhc0ludGVyZmFjZSA9IG5ldyBuc0NhbnZhc0ludGVyZmFjZU1vZHVsZS5OYXRpdmVzY3JpcHRDYW52YXNJbnRlcmZhY2Uod2ViVmlldywgJ2NhbnZhc0VsZScpO1xuICAgIHdlYlZpZXcub24oJ2xvYWRGaW5pc2hlZCcsIChhcmdzKSA9PiB7XG4gICAgICAgIGlmICghYXJncy5lcnJvcikge1xuICAgICAgICAgICAgdmFyIHdpZHRoID0gc2NyZWVuLm1haW5TY3JlZW4ud2lkdGhESVBzO1xuICAgICAgICAgICAgdmFyIGFzcGVjdFJhdGlvID0gaW1hZ2VWaWV3LmltYWdlU291cmNlLndpZHRoIC8gaW1hZ2VWaWV3LmltYWdlU291cmNlLmhlaWdodDtcbiAgICAgICAgICAgIHZhciBoZWlnaHQgPSB3aWR0aCAvIGFzcGVjdFJhdGlvO1xuICAgICAgICAgICAgb05TQ2FudmFzSW50ZXJmYWNlLnNldEltYWdlKCdzZXRDYW52YXNJbWFnZScsIGltYWdlVmlldy5pbWFnZVNvdXJjZSwgW3sgd2lkdGg6IHdpZHRoLCBoZWlnaHQ6IGhlaWdodCB9XSk7XG4gICAgICAgIH1cbiAgICB9KVxufVxuXG4vKipcbiAqIFNldHMgUGFnZSBiaW5kaW5nIGNvbnRleHQgZm9yIHR3byB3YXkgZGF0YSBiaW5kaW5nLlxuICovXG5mdW5jdGlvbiBzZXRCaW5kaW5nQ29udGV4dCgpIHtcbiAgICB2YXIgY29udGV4dCA9IG5ldyBvYnNlcnZhYmxlTW9kdWxlLk9ic2VydmFibGUoKTtcbiAgICBjb250ZXh0LnNldCgnYnJpZ2h0bmVzcycsIDApO1xuICAgIGNvbnRleHQuc2V0KCdpbWFnZVNvdXJjZScsIGZyb21GaWxlKFwifi9yb2FkLW5hdHVyZS5qcGdcIikpXG4gICAgLy8gQWRqdXN0aW5nIGltYWdlIGJyaWdodG5lc3MsIG9uY2UgdGhlIGJyaWdodG5lc3Mgc2xpZGVyIHBvc2l0aW9uIGlzIGNoYW5nZWQuXG4gICAgY29udGV4dC5vbigncHJvcGVydHlDaGFuZ2UnLCBfLmRlYm91bmNlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIGlmIChkYXRhLnByb3BlcnR5TmFtZSA9PT0gXCJicmlnaHRuZXNzXCIpIHtcbiAgICAgICAgICAgIHZhciBicmlnaHRuZXNzVmFsdWUgPSBkYXRhLm9iamVjdC5nZXQoJ2JyaWdodG5lc3MnKTtcbiAgICAgICAgICAgIHNldEJyaWdodG5lc3MoYnJpZ2h0bmVzc1ZhbHVlKTtcbiAgICAgICAgfVxuICAgIH0sIDEwMCkpO1xuICAgIHBhZ2UuYmluZGluZ0NvbnRleHQgPSBjb250ZXh0O1xufVxuXG4vKipcbiAqIFBlcmZvcm1zIGltYWdlIG1hbmlwdWxhdGlvbiBvbiBjYW52YXMgaW4gd2VidmlldywgYW5kIHJlbmRlcnMgdGhlIHJldHVybmVkIGltYWdlIGluIEltYWdlIGVsZW1lbnQuXG4gKi9cbmZ1bmN0aW9uIHBlcmZvcm1DYW52YXNNYWlucHVsYXRpb24oZm5OYW1lOiBzdHJpbmcsIGFyZ3M/OiBhbnlbXSkge1xuICAgIGltYWdlVmlldy5hbmltYXRlKHtcbiAgICAgICAgb3BhY2l0eTogMC41LFxuICAgICAgICBkdXJhdGlvbjogMTUwXG4gICAgfSk7XG4gICAgb05TQ2FudmFzSW50ZXJmYWNlLmNyZWF0ZUltYWdlKGZuTmFtZSwgYXJncykudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgIHBhZ2UuYmluZGluZ0NvbnRleHQuc2V0KFwiaW1hZ2VTb3VyY2VcIiwgcmVzdWx0LmltYWdlKTtcbiAgICAgICAgaW1hZ2VWaWV3LmFuaW1hdGUoe1xuICAgICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxNTBcbiAgICAgICAgfSk7XG4gICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdlcnJvcicsIGVycm9yKTtcbiAgICB9KTtcbn1cblxuLyoqXG4gKiBBZGp1c3RzIGJyaWdobmVzcyBvZiB0aGUgaW1hZ2UuXG4gKi9cbmZ1bmN0aW9uIHNldEJyaWdodG5lc3ModmFsdWUpIHtcbiAgICBwZXJmb3JtQ2FudmFzTWFpbnB1bGF0aW9uKCdzZXRCcmlnaHRuZXNzJywgW3ZhbHVlXSk7XG59XG5cbi8qKlxuICogUmVzZXRzIGJyaWdodG5lc3Mgb24gcmVzZXQgaW1hZ2Ugb3BlcmF0aW9uLlxuICovXG5mdW5jdGlvbiByZXNldEJyaWdodG5lc3MoKSB7XG4gICAgcGFnZS5iaW5kaW5nQ29udGV4dC5zZXQoJ2JyaWdodG5lc3MnLCAwKTtcbn1cblxuLyoqXG4gKiBBcHBsaWVzIHByZXNldCBzZWxlY3RlZCBieSB1c2VyIHRvIHRoZSBpbWFnZS4gXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRQcmVzZXQoYXJncykge1xuICAgIHZhciBwcmVzZXRJZCA9IGFyZ3Mub2JqZWN0LmlkO1xuICAgIHJlc2V0QnJpZ2h0bmVzcygpO1xuICAgIHBlcmZvcm1DYW52YXNNYWlucHVsYXRpb24oJ3NldFByZXNldCcsIFtwcmVzZXRJZF0pO1xufVxuXG4vKipcbiAqIFJlc2V0cyBpbWFnZSB0byB0aGUgaXRzIGluaXRpYWwgc3RhdGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXNldEltYWdlKCkge1xuICAgIHJlc2V0QnJpZ2h0bmVzcygpO1xuICAgIHBlcmZvcm1DYW52YXNNYWlucHVsYXRpb24oJ3Jlc2V0SW1hZ2UnKTtcbn1cblxuLy8gVE9ETzogQWRkIHByb3Zpc2lvbiB0byBkb3dubG9hZCB0aGUgZWRpdGVkIGltYWdlXG4vLyBleHBvcnQgZnVuY3Rpb24gZG93bmxvYWRJbWFnZSgpe1xuLy8gICAgIHZhciBnYWxsYXJ5UGF0aDtcbi8vICAgICBpZihhbmRyb2lkKXtcbi8vICAgICAgICAgZ2FsbGFyeVBhdGggPSBwYXRoLmpvaW4oYW5kcm9pZC5vcy5FbnZpcm9ubWVudC5nZXRFeHRlcm5hbFN0b3JhZ2VEaXJlY3RvcnkoKSsnJywgJycrYW5kcm9pZC5vcy5FbnZpcm9ubWVudC5ESVJFQ1RPUllfUElDVFVSRVMsICdkZW1vLnBuZycpO1xuLy8gICAgICAgICBjb25zb2xlLmxvZygnZ2FsbGFyeSBwYXRoIGlzMSAnLCBnYWxsYXJ5UGF0aCk7XG4vLyAgICAgICAgIHZhciBmb2xkZXIgPSBrbm93bkZvbGRlcnMuZG9jdW1lbnRzKCk7XG4vLyAgICAgICAgIHZhciBmdWxsUGF0aCA9IHBhdGguam9pbihmb2xkZXIucGF0aCwgXCJUZXN0LnBuZ1wiKTtcbi8vICAgICAgICAgdHJ5e1xuLy8gICAgICAgICAgICAgaW1hZ2VWaWV3LmltYWdlU291cmNlLnNhdmVUb0ZpbGUoZnVsbFBhdGgsIEltYWdlRm9ybWF0LnBuZyk7ICAgIFxuLy8gICAgICAgICB9Y2F0Y2goZSl7XG4vLyAgICAgICAgICAgICBjb25zb2xlLmxvZygnZXJyb3IgaXMgPT09ICcsIGUpO1xuLy8gICAgICAgICB9ICAgXG4vLyAgICAgfVxuLy8gfSJdfQ==