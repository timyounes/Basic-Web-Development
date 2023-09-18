const dialogWrapper = document.querySelector('.dialog');
const container = document.getElementById('dialog-container');
const CustomAlert = new function (title, msg, dialogSize) {
    this.show = function (title, msg, dialogSize) {
        dialogWrapper.style.display = 'block';
        let dialogTitle = document.getElementById('dialog-title');
        let content = document.getElementById('dialog-body');
        container.style.opacity = 1;
        container.classList.add(dialogSize)
        dialogTitle.textContent = title;
        content.innerHTML = msg;
    }

    this.close = function () {
        dialogWrapper.style.display = 'none';
        container.style.opacity = 0;
    }
}