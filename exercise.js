const fs = require('fs');

async function readFile(file) {
    const data = await fs.promises.readFile(file, 'utf8')
    return data.split(/[, ]+/)
}

async function combineFiles(files) {
    const results = await Promise.allSettled(files.map((f) => readFile(f)))
    const words = results.reduce((acc, cur) => {
        if (cur.status == 'fulfilled') {
            return [...acc, ...cur.value]
        } else {
            // ignore file if it can not be read
            return acc
        }
    }, [])
    words.sort()
    return words.join(' ')
}

combineFiles(['file1.txt', 'file2.txt']).then((res) => {
    console.log(res)
})

/*
    Assumptions:
        The words in each file are separated by either spaces, commas or both
*/