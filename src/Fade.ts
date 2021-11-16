import Base from "./Base";
import { TYPE } from "./Tab";

class Fade extends Base {
    constructor(el: HTMLElement) {
        super(el, TYPE.FADE)
        this.getMethod(this.setPage)
    }

    private setPage (pageItems: HTMLCollection, _curIndex: number) {
        [...pageItems].map((item: HTMLElement) => {
            item.className = 'page-item'
        })

        pageItems[_curIndex].className += ' active'
    }
}

export default Fade;