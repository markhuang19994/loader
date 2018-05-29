((self) => {
    function Loader() {
	    this.doc = self.document;
	    this.head = this.doc.head;
	    this.sheets = this.doc.styleSheets;
	    this.timeout = 60000 * 10;//ms * gap
    }

    /**
     * load css and resove promise if it's loaded
     */
    let _loadCss = function (href) {
        return new Promise((res, rej) => {
            let link = this.doc.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            let count = 0;

            function checkCssLoaded() {
                if (++count >= timeout) rej(new Error(`style ${href} time out`));
                for (let i = 0; i < this.sheets.length; ++i) {
                    if (sheets[i].href && new RegExp(href).test(sheets[i].href)) {
                        res();
                        return true;
                    }
                }
                setTimeout(checkCssLoaded, 10);
            }

            checkCssLoaded();
            this.head.appendChild(link);
        });
    }

    /**
     * async load script and ordered execution
     */
    let _loadScript = function (src) {
        let script = this.doc.createElement('script');
        script.type = 'text/javascript';
        script.async = false;
        script.src = src;
        this.head.appendChild(script);
    };

    /**
     * load image and resove promise if it's loaded
     */
    let _loadImage = function (src) {
        return new Promise((res, rej) => {
            let img = new Image();
            img.src = src;
            let count = 0;

            function checkImageLoaded() {
                if (++count >= timeout) rej(new Error(`load image ${src} time out`));
                if (img.complete) res(img);
                else setTimeout(checkImageLoaded, 10);
            }

            checkImageLoaded();
        });
    }

    Loader.prototype.loadCss = _loadCss;
    Loader.prototype.loadScript = _loadScript;
    Loader.prototype.loadImage = _loadImage;
    self.Loader = new Loader();
})(window);