import Tab from './components/Tab'

import { PgRender } from './plugins'


function App(): HTMLElement[] {
    return [
        Tab({
            curIdx: 3
        })
    ]
}

PgRender(
    App(), // HTMlCollection
    document.getElementById('app')!
)