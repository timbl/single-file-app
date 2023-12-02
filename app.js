/* Single File ToDo App
*/

console.log('Hello world.  SFA loaded.')
const dom = document

console.log('location: ', dom.location)
const here = dom.location.href
const thisDoc = $rdf.sym(here)

const store = new $rdf.LiveStore()

async function save (dom) {
    console.log('Saving ...', thisDoc)
    const targetURI = thisDoc.uri + ".edited.html"
    console.log('Saving dom...', dom)
    const contentType = 'text/html'
    const data = '<html>\n' + dom.head.outerHTML + '\n' + dom.body.outerHTML + '\n</html>\n'
    console.log('Data to save <<<' + data + '>>>')
        if (confirm('Saving to ' + targetURI)) {
            try {
                await store.fetcher.webOperation('PUT', targetURI, { data,  contentType })
            } catch (err) {
                const message = 'Save ' + targetURI + ' failed: ' + err
                console.error(message)
                alert(message)
            }
    } else {
        console.log('Aborted by user')
    }
}

function saveButton () {
    const button = dom.createElement('button');
    button.textContent = "Save";
    return button
}


function main (){
    const h1 = dom.createElement('h1')
    console.log('dom.body', dom.body)
    const body = dom.body
    dom.body.append(h1)
    h1.textContent = "Hello Single Page ToDo App"
    
    const button = saveButton(dom)
    body.append(button)
    button.addEventListener('click', _event => save(dom))
    
    console.log('main done.')
}

dom.addEventListener("DOMContentLoaded", main)

