function copyEvent() {
    const copyText = document.querySelector("#new_url").innerText
    navigator.clipboard.writeText(copyText)
        .then(() => alert('copied'))
}

exports.copyEvent()