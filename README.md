#Chrome Extension for kdb/q REPL

Interacts with kdb/q from chrome using kdb http interface. Useful for quick kdb query  

![alt text](https://raw.github.com/komsit37/chrome-devtools-q/master/images/screenshot2.png "Screenshot")

##Installation

1. Clone this repo  
2. Open Chrome extensions page chrome://extensions  
3. Load unpacked extension using Developer mode from src folder. You should see something similar to the image below  (Make sure to check **Developer mode** checkbox!)
![alt text](https://raw.github.com/komsit37/chrome-devtools-q/master/images/screenshot1.png "Chrome Extension")


##Usage

   1. Go to kdb web url i.e. http://localhost:5555/  
   2. Bring up chrome developer tools  
   3. select `q` tab  
   4. write your q scripts and    
   
   * `Command+Enter` to run the current line    
   * `Command+e` to run the current selection  
   * `Command+Shift+Enter` to run the whole script    
   * `Command+s` to save script to chrome local key-value storage (keyed by port no. - since I tend to use specific port no. for specific data)  
   
   (Replace `Command` by `Ctrl` for above shortcuts if windows)

##Note
   * q statement sent via REPL will be wrapped in closure (immediately executed function)
    to avoid polluting global namespace. This is essentially important when querying rdb.
   * If you need to define function, define it in its own namespace (i.e. `.my.f:{x+1}`)
   * If you need to define variable, use `::` (i.e. `e::{x+1}`)
   * Because of this, don't use x or y since it's a reserved argument names in q

##Todo
   * allow turning off closure
   * more flexibility around saving and loading scripts