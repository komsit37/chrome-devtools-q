#Chrome Extension for kdb/q REPL

Interacts with kdb/q from chrome using kdb http interface. Useful for quick kdb query  
![alt text](https://github.com/komsit37/chrome-devtools-q/images/screenshot2.png "Screenshot")

##Installation

1. Clone this repo  
2. Open Chrome extensions page chrome://extensions  
3. Load unpacked extension using Developer mode from src folder. You should see something similar to the image below  
![alt text](https://github.com/komsit37/chrome-devtools-q/images/screenshot1.png "Chrome Extension")


##Usage

   1. Go to kdb web url i.e. http://localhost:5555/  
   2. Bring up chrome developer tools  
   3. select `q` tab  
   
   Replace `Command` by `Ctrl` for windows for below shortcuts  
   
   * `Command+Enter` to run the current line  
   * `Command+e` to run the current selection  
   * `Command+Shift+Enter` to run the whole script  
   * `Command+s` to save script to chrome local storage (keyed by port no.)  
   