import './index.scss'
interface IOptions {
    currentIndex?: number,
    data: any[];
    callback?: (newIdx: number) => void | undefined
}

interface IData {
    navItem: String,
    pageItem: String
}

class PgTab {

    private _curIdx;
    private _data;
    private _callback;


    private _oNavWrapper: HTMLElement | null = null
    private _oPageWrapper: HTMLElement | null = null
    private _oNavItems: HTMLCollection | null = null
    private _oPageItems: HTMLCollection | null = null


    constructor(options: IOptions) {
        this._data = options.data
        this._curIdx = this._checkIndex(options.currentIndex)
        this._callback = options.callback
    }


    private _checkIndex(index: number | undefined): number {
        const _idx: number = index ? index >>> 0 : 0
        if (_idx >= this._data.length) {
            return 0;
        }
        return _idx
    }

    public render() {
        this._oNavWrapper = document.createElement('div');
        this._oPageWrapper = document.createElement('div');
        const oTabWrapper: HTMLElement = document.createElement('div')

        oTabWrapper.className = 'pg-tab'

        this._oNavWrapper.className = 'pg-nav'
        this._oPageWrapper.className = 'pg-page'

        this._data.forEach((item: IData, index: number) => {
            this._oNavWrapper.innerHTML += `
            <div
                class="nav-item${this._curIdx === index ? ' current' : ''}"
                style="width: ${500 / this._data.length}px"
            >${item.navItem}</div>
            `

            this._oPageWrapper.innerHTML += `
                <div
                class="page-item${this._curIdx === index ? ' current' : ''}"
            >${item.pageItem}</div>
            `
        });

        oTabWrapper.appendChild(this._oNavWrapper)
        oTabWrapper.appendChild(this._oPageWrapper)


        this._bindClick()

        return oTabWrapper
    }

    private _bindClick() {
        this._oNavItems = this._oNavWrapper.getElementsByClassName('nav-item')
        console.log(this._oNavItems)
        this._oPageItems = this._oPageWrapper.getElementsByClassName('page-item')
        this._oNavWrapper.addEventListener('click', this.handleNavClick.bind(this), false)
    }

    private handleNavClick(e: Event) {
        const target = e.target as HTMLElement
        const className = target.className

        if (className === 'nav-item') {
            this._oNavItems![this._curIdx].className = 'nav-item'
            this._oPageItems![this._curIdx].className = 'page-item'

            this._curIdx = [].indexOf.call(this._oNavItems, target)
            console.log(this._curIdx)
            this._oNavItems[this._curIdx] .className += ' current'
            this._oPageItems[this._curIdx] .className += ' current'
            this._callback && this._callback(this._curIdx)
        }
    }
}

export default PgTab;