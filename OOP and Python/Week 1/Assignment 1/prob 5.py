import pyautogui
import pygetwindow as gw
import time
import subprocess

def main():
    n = int(input("Enter the number of rows for the pyramid: "))

    subprocess.Popen(['notepad.exe'])
    time.sleep(1.5)  

    notepad_windows = [w for w in gw.getWindowsWithTitle('Untitled - Notepad')]
    if notepad_windows:
        notepad = notepad_windows[0]
        notepad.activate() 
        time.sleep(0.5)
    else:
        print("Could not find Notepad window.")
        return

    for i in range(1, n + 1):
        line = "#" * i
        pyautogui.typewrite(line)
        pyautogui.press("enter")

    print("Pyramid typing completed!")

if __name__ == "__main__":
    main()
