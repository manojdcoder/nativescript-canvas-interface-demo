(function () {
    var currentPreset;
    /**
     * Sets image with specified dimension sent from native app, to canva for doing image manipulation on it.
     */
    function setCanvasImage(canvas, ctx, image, config) {
        canvas.width = config.width;
        canvas.height = config.height;
        ctx.drawImage(image, 0, 0, config.width, config.height);
    }
    /**
     * Sets the requested presetMode to the canvas using Caman library and returns promise.
     */
    function setPreset(canvas, ctx, presetMode) {
        currentPreset = presetMode;
        return new Promise(function (resolve) {
            Caman(canvas, function () {
                this.revert(false);
                this[presetMode]();
                this.render(function () {
                    resolve();
                });
            });
        });
    }
    /**
     * Resets the canvas to its original state by removing all the image manipulations.
     */
    function resetImage(canvas, ctx) {
        currentPreset = null;
        return new Promise(function (resolve) {
            Caman(canvas, function () {
                this.revert(false);
                this.render(function () {
                    resolve();
                });
            });
        });
    }
    /**
     * Adjusts brightness of the canvas using Caman library and returns a promise.
     */
    function setBrightness(canvas, ctx, value) {
        return new Promise(function (resolve) {
            Caman(canvas, function () {
                this.revert(false);
                currentPreset && this[currentPreset]();
                this.brightness(value);
                this.render(function () {
                    resolve();
                });
            });
        });
    }
    /**
     * Registers handlers to handle all the requests raised by native app.
     */
    function registerNSCanvasReqHandlers(oCanvasInterface) {
        oCanvasInterface.canvasReqHandlers = {
            setCanvasImage: setCanvasImage,
            setPreset: setPreset,
            resetImage: resetImage,
            setBrightness: setBrightness
        };
    }
    /**
     * Initializes canvas inteface for communication between canvas and native app.
     */
    function init() {
        var canvasEle = document.getElementById('canvasEle');
        if (window.NSCanvasInterface) {
            var oCanvasInterface = new window.NSCanvasInterface(canvasEle);
            registerNSCanvasReqHandlers(oCanvasInterface);
        }
    }
    /**
     *  Fun starts from here.
     */
    init();
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxDQUFDO0lBQ0csSUFBSSxhQUFhLENBQUM7SUFFbEI7O09BRUc7SUFDSCx3QkFBd0IsTUFBeUIsRUFBRSxHQUE2QixFQUFFLEtBQXVCLEVBQUUsTUFBVztRQUNsSCxNQUFNLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDNUIsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQzlCLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVEOztPQUVHO0lBQ0gsbUJBQW1CLE1BQXlCLEVBQUUsR0FBNkIsRUFBRSxVQUFrQjtRQUMzRixhQUFhLEdBQUcsVUFBVSxDQUFDO1FBQzNCLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxVQUFVLE9BQU87WUFDaEMsS0FBSyxDQUFDLE1BQU0sRUFBRTtnQkFDVixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNuQixJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztnQkFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQztvQkFDUixPQUFPLEVBQUUsQ0FBQztnQkFDZCxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxvQkFBb0IsTUFBeUIsRUFBRSxHQUE2QjtRQUN4RSxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxVQUFVLE9BQU87WUFDaEMsS0FBSyxDQUFDLE1BQU0sRUFBRTtnQkFDVixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDO2dCQUNkLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7T0FFRztJQUNILHVCQUF1QixNQUF5QixFQUFFLEdBQTZCLEVBQUUsS0FBYTtRQUMxRixNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsVUFBVSxPQUFPO1lBQ2hDLEtBQUssQ0FBQyxNQUFNLEVBQUU7Z0JBQ1YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbkIsYUFBYSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDO2dCQUN2QyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDO2dCQUNkLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7T0FFRztJQUNILHFDQUFxQyxnQkFBZ0I7UUFDakQsZ0JBQWdCLENBQUMsaUJBQWlCLEdBQUc7WUFDakMsY0FBYyxFQUFFLGNBQWM7WUFDOUIsU0FBUyxFQUFFLFNBQVM7WUFDcEIsVUFBVSxFQUFFLFVBQVU7WUFDdEIsYUFBYSxFQUFFLGFBQWE7U0FDL0IsQ0FBQztJQUNOLENBQUM7SUFFRDs7T0FFRztJQUNIO1FBQ0ksSUFBSSxTQUFTLEdBQXNCLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDeEUsRUFBRSxDQUFDLENBQU8sTUFBTyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztZQUNsQyxJQUFJLGdCQUFnQixHQUFHLElBQVUsTUFBTyxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3RFLDJCQUEyQixDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDbEQsQ0FBQztJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNILElBQUksRUFBRSxDQUFDO0FBQ1gsQ0FBQyxDQUFDLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImRlY2xhcmUgdmFyIENhbWFuO1xuXG4oZnVuY3Rpb24gKCkge1xuICAgIHZhciBjdXJyZW50UHJlc2V0O1xuXG4gICAgLyoqXG4gICAgICogU2V0cyBpbWFnZSB3aXRoIHNwZWNpZmllZCBkaW1lbnNpb24gc2VudCBmcm9tIG5hdGl2ZSBhcHAsIHRvIGNhbnZhIGZvciBkb2luZyBpbWFnZSBtYW5pcHVsYXRpb24gb24gaXQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gc2V0Q2FudmFzSW1hZ2UoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCwgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50LCBjb25maWc6IGFueSkge1xuICAgICAgICBjYW52YXMud2lkdGggPSBjb25maWcud2lkdGg7XG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSBjb25maWcuaGVpZ2h0O1xuICAgICAgICBjdHguZHJhd0ltYWdlKGltYWdlLCAwLCAwLCBjb25maWcud2lkdGgsIGNvbmZpZy5oZWlnaHQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHJlcXVlc3RlZCBwcmVzZXRNb2RlIHRvIHRoZSBjYW52YXMgdXNpbmcgQ2FtYW4gbGlicmFyeSBhbmQgcmV0dXJucyBwcm9taXNlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHNldFByZXNldChjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50LCBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgcHJlc2V0TW9kZTogc3RyaW5nKSB7XG4gICAgICAgIGN1cnJlbnRQcmVzZXQgPSBwcmVzZXRNb2RlO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgICAgIENhbWFuKGNhbnZhcywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmV2ZXJ0KGZhbHNlKTtcbiAgICAgICAgICAgICAgICB0aGlzW3ByZXNldE1vZGVdKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVzZXRzIHRoZSBjYW52YXMgdG8gaXRzIG9yaWdpbmFsIHN0YXRlIGJ5IHJlbW92aW5nIGFsbCB0aGUgaW1hZ2UgbWFuaXB1bGF0aW9ucy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiByZXNldEltYWdlKGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQsIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKSB7XG4gICAgICAgIGN1cnJlbnRQcmVzZXQgPSBudWxsO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgICAgIENhbWFuKGNhbnZhcywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmV2ZXJ0KGZhbHNlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGp1c3RzIGJyaWdodG5lc3Mgb2YgdGhlIGNhbnZhcyB1c2luZyBDYW1hbiBsaWJyYXJ5IGFuZCByZXR1cm5zIGEgcHJvbWlzZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzZXRCcmlnaHRuZXNzKGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQsIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCB2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICAgICAgQ2FtYW4oY2FudmFzLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXZlcnQoZmFsc2UpO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRQcmVzZXQgJiYgdGhpc1tjdXJyZW50UHJlc2V0XSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuYnJpZ2h0bmVzcyh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXJzIGhhbmRsZXJzIHRvIGhhbmRsZSBhbGwgdGhlIHJlcXVlc3RzIHJhaXNlZCBieSBuYXRpdmUgYXBwLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHJlZ2lzdGVyTlNDYW52YXNSZXFIYW5kbGVycyhvQ2FudmFzSW50ZXJmYWNlKSB7XG4gICAgICAgIG9DYW52YXNJbnRlcmZhY2UuY2FudmFzUmVxSGFuZGxlcnMgPSB7XG4gICAgICAgICAgICBzZXRDYW52YXNJbWFnZTogc2V0Q2FudmFzSW1hZ2UsXG4gICAgICAgICAgICBzZXRQcmVzZXQ6IHNldFByZXNldCxcbiAgICAgICAgICAgIHJlc2V0SW1hZ2U6IHJlc2V0SW1hZ2UsXG4gICAgICAgICAgICBzZXRCcmlnaHRuZXNzOiBzZXRCcmlnaHRuZXNzXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgY2FudmFzIGludGVmYWNlIGZvciBjb21tdW5pY2F0aW9uIGJldHdlZW4gY2FudmFzIGFuZCBuYXRpdmUgYXBwLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIHZhciBjYW52YXNFbGUgPSA8SFRNTENhbnZhc0VsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhc0VsZScpO1xuICAgICAgICBpZiAoKDxhbnk+d2luZG93KS5OU0NhbnZhc0ludGVyZmFjZSkge1xuICAgICAgICAgICAgdmFyIG9DYW52YXNJbnRlcmZhY2UgPSBuZXcgKDxhbnk+d2luZG93KS5OU0NhbnZhc0ludGVyZmFjZShjYW52YXNFbGUpO1xuICAgICAgICAgICAgcmVnaXN0ZXJOU0NhbnZhc1JlcUhhbmRsZXJzKG9DYW52YXNJbnRlcmZhY2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogIEZ1biBzdGFydHMgZnJvbSBoZXJlLiAgXG4gICAgICovXG4gICAgaW5pdCgpO1xufSkoKTsiXX0=