export default class Keyboard {
  constructor(data) {
    this.upperLet = null;
    this.keysOfData = data;
  }

  addBasicMarkUp() {
    const bodyContainer = document.querySelector('body');
    if (localStorage.lang) {
      localStorage.lang = 'eng';
    }
    bodyContainer.innerHTML = `
    <main class="main">
      <div class="container">
        <h1 class="main__title">Virtual Keyboard</h1>
        <div class="textarea-wrapper">
          <textarea class="textarea" name="" id="textarea" cols="30" rows="10"></textarea>
        </div>
        <div class="keyboard-wrapper">
          <div class="keyboard keyboard-style">
          </div>
        </div>
        <p>Developed on Windows OS. Change language Left Ctrl + Left Alt</p>
      </div>
    </main>`;
    this.addBtnKeyboard();
    this.pressMouseHundlerKeyboard();
    this.pressKeyHundlerKeyboard();
  }

  addBtnKeyboard() {
    this.keyboardCont = document.querySelector('.keyboard');
    let res = '';
    if (!this.upperLet) {
      this.keysOfData.forEach((item) => {
        res += ` <div class="keyboard__key ${item.eventCode}" id="${item.eventCode}">
                    ${(localStorage.lang === 'eng') ? item.lowEng : item.lowRu}
                  </div>`;
      });
    } else {
      this.keysOfData.forEach((item, i) => {
        if (i < 14) {
          res += ` <div class="keyboard__key ${item.eventCode}" id="${item.eventCode}">
                      ${(localStorage.lang === 'eng') ? item.lowEng : item.lowRu}
                  </div>`;
        } else {
          res += ` <div class="keyboard__key ${item.eventCode}" id="${item.eventCode}">
                      ${(localStorage.lang === 'eng') ? item.upperEng : item.upperRu}
                  </div>`;
        }
      });
    }
    // if (!this.upperLet) {
    //   this.keysOfData.forEach((item) => {
    //     res += ` <div class="keyboard__key ${item.eventCode}" id="${item.eventCode}">
    //                 <span>${(localStorage.lang === 'eng') ? item.lowEng : item.lowRu}</span>
    //               </div>`;
    //   });
    // } else {
    //   this.keysOfData.forEach((item, i) => {
    //     if (i < 14) {
    //       res += ` <div class="keyboard__key ${item.eventCode}" id="${item.eventCode}">
    //                 <span>${(localStorage.lang === 'eng') ? item.lowEng : item.lowRu}</span>
    //               </div>`;
    //     } else {
    //       res += ` <div class="keyboard__key ${item.eventCode}" id="${item.eventCode}">
    //                 <span>${(localStorage.lang === 'eng') ? item.upperEng : item.upperRu}</span>
    //               </div>`;
    //     }
    //   });
    // }
    this.keyboardCont.innerHTML = res;
  }

  pressMouseHundlerKeyboard() {
    document.addEventListener('mousedown', (event) => {
      const target = event.target;
      // console.log('target: ', target);
      const keyOfKeyboard = document.querySelectorAll('.keyboard__key');
      // const textArea = document.querySelector('.textarea');
      // debugger;
      // switch (event.code) {
      //   case 'CapsLock':
      //     this.getUppperLetter();
      //     break;
      //   default:
      // }

      if (target.classList.contains('keyboard__key')) {
        event.preventDefault();
        keyOfKeyboard.forEach((item) => item.classList.remove('active'));
        target.classList.add('active');
        // textArea.focus();
        // textArea.value += target.textContent;
      }
      if (target.classList.contains('CapsLock')) {
        this.getUppperLetter();
      }
    });

    document.addEventListener('mouseup', () => {
      const keyOfKeyboard = document.querySelectorAll('.keyboard__key');
      keyOfKeyboard.forEach((item) => item.classList.remove('active'));
    });
  }

  pressKeyHundlerKeyboard() {
    document.addEventListener('keydown', (event) => {
      const ControlLeft = document.getElementById('ControlLeft');
      const AltLeft = document.getElementById('AltLeft');
      document.getElementById(event.code).classList.add('active');
      // textArea.value += document.getElementById(event.code).textContent;
      // if (ShiftLeft.classList.contains('active')) {
      //   changeUpperLanguage();
      // }
      if (ControlLeft.classList.contains('active') && AltLeft.classList.contains('active')) {
        this.changeLanguage();
      }
      switch (event.code) {
        case 'CapsLock':
          this.getUppperLetter();
          break;
        case 'ShiftLeft':
          this.getUppperLetter();
          break;
        default:
      }
    });
    document.addEventListener('keyup', () => {
      const keyOfKeyboard = document.querySelectorAll('.keyboard__key');
      keyOfKeyboard.forEach((item) => item.classList.remove('active'));
    });
  }

  changeLanguage() {
    if (localStorage.lang === 'eng') {
      localStorage.lang = 'rus';
      this.addBtnKeyboard();
    } else {
      localStorage.lang = 'eng';
      this.addBtnKeyboard();
    }
  }

  getUppperLetter() {
    if (!this.upperLet) {
      this.upperLet = true;
    } else {
      this.upperLet = false;
    }
    this.addBtnKeyboard();
  }
}
