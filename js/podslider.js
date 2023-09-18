class PodSliders {

    constructor(elm) {
        this.elm_wrap = elm;
        this.elm_text = elm.querySelector('.podslider_text');
        this.elm_image = elm.querySelector('.podslider_images');
        this.elm_title = elm.querySelector('.podslider_title');
        this.elm_descr = elm.querySelector('.podslider_descr');
        this.elm_price = elm.querySelector('.podslider_price');
        this.elm_noxt = elm.querySelector('.podslider_noxt');
        this.elm_next = elm.querySelector('.podslider_next');
        this.elm_curr = elm.querySelector('.podslider_curr');
        this.elm_prev = elm.querySelector('.podslider_prev');
        this.elm_prov = elm.querySelector('.podslider_prov');
        this.elm_goprev = elm.querySelector('.podslider_goprev');
        this.elm_gonext = elm.querySelector('.podslider_gonext');

        this.elm_curr.addEventListener('transitionend', this.stopped.bind(this));

        const varname = elm.dataset.slides;
        this.slides = eval(varname) || [];
        this.idx_min = 0;
        this.idx_cur = 0;
        this.idx_max = this.slides.length - 1;

        const resized = (entries) => {
            this.elm_wrap.style.setProperty('--grid-size-x', (this.elm_image.offsetWidth / 8) + 'px');
            this.elm_wrap.style.setProperty('--grid-size-y', (this.elm_image.offsetHeight / 8) + 'px');
        };
        resized();
        (new ResizeObserver(resized)).observe(this.elm_image);

        this.render(false);
        this.elm_wrap.classList.add('shown')
        this.elm_goprev.addEventListener('click', this.render.bind(this, -1));
        this.elm_gonext.addEventListener('click', this.render.bind(this, +1));
    }

    render(moves) {
        const slides = this.get_slides(this.idx_cur);

        if (moves === false) {
            this.elm_prov.src = slides[0].blob || slides[0].src;
            this.elm_prev.src = slides[1].blob || slides[1].src;
            this.elm_curr.src = slides[2].blob || slides[2].src;
            this.elm_next.src = slides[3].blob || slides[3].src;
            this.elm_noxt.src = slides[4].blob || slides[4].src;
        } else {
            if (-1 === moves) if (--this.idx_cur < this.idx_min) this.idx_cur = this.idx_max;
            if (+1 === moves) if (++this.idx_cur > this.idx_max) this.idx_cur = this.idx_min;
            const cname = moves < 0 ? 'backward' : 'foreward';
            this.elm_prov.classList.add(cname);
            this.elm_prev.classList.add(cname);
            this.elm_curr.classList.add(cname);
            this.elm_next.classList.add(cname);
            this.elm_noxt.classList.add(cname);
        }

        this.elm_title.innerHTML = slides[2].title;
        this.elm_descr.innerHTML = slides[2].descr;
        this.elm_price.innerHTML = slides[2].price;
        // this.elm_wrap.style.background = slides[2].bg;

    }

    stopped() {
        this.elm_prov.classList.remove('foreward'); this.elm_prov.classList.remove('backward');
        this.elm_prev.classList.remove('foreward'); this.elm_prev.classList.remove('backward');
        this.elm_curr.classList.remove('foreward'); this.elm_curr.classList.remove('backward');
        this.elm_next.classList.remove('foreward'); this.elm_next.classList.remove('backward');
        this.elm_noxt.classList.remove('foreward'); this.elm_noxt.classList.remove('backward');
        this.render(false);
    }

    get_slides(idx) {
        let x1, x2, x3, x4, x5;
        const slides = [];
        x1 = idx - 2; if (x1 < this.idx_min) x1 = x1 + this.idx_max + 1; slides.push(this.slides[x1]);
        x2 = idx - 1; if (x2 < this.idx_min) x2 = x2 + this.idx_max + 1; slides.push(this.slides[x2]);
        x3 = idx; slides.push(this.slides[x3]);
        x4 = idx + 1; if (x4 > this.idx_max) x4 = x4 - this.idx_max - 1; slides.push(this.slides[x4]);
        x5 = idx + 2; if (x5 > this.idx_max) x5 = x5 - this.idx_max - 1; slides.push(this.slides[x5]);
        console.log(idx, '>', x1, x2, x3, x4, x5);
        return slides;
    }

}

let products;
fetch('js/products.json')
                    .then((data) => data.json())
                    .then((json) => {
                        products = json;
                        document.querySelectorAll('.podslider_wrap').forEach(elm => new PodSliders(elm));
                      });