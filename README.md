# *answerer*
An easy-to-install version of https://github.com/jmikk/gotIssues.

To install this script, you will need Python 3.8 and pip. Older versions of Python may work, however, compatibility is not guaranteed. *Run this with older versions of Python at your own risk!*

To install pip check out this: https://www.liquidweb.com/kb/install-pip-windows/.
pip should automatically handle all dependencies, including *nspy_wrapper*.

**If you want updates on my progress with *answerer*, join the [NS Cards Discord](https://discord.gg/yn5a4p9) and keep a watch in #script-help!**

### Setup
First, to install the script, open the command prompt and run ```py -3.8 -m pip install answerer``` Mac users should try ```python3 -m pip install answerer```. You will also need to add the *answerer_userscript.js* file to Tampermonkey or Greasemonkey to run it as a userscript.

To setup the script, you need to create a folder, like the "files" folder of this repository. It needs a puppets.csv file and a priorities.csv file.
puppets.csv stores all the information for puppets that this script will handle. To setup puppets.csv, enter all your puppet names and passwords in the provided format.

#### SECURITY DISCLAIMER ####
I do not receive, see, obtain, or otherwise know about any information you put into this script. This can be verified by reading the source code of this application, as well as the source code of *nspy_wrapper*, available [here](https://github.com/abrow425/nspy_wrapper).

priorities.csv makes a list of issue priorities. This enables you to ensure that your puppets all choose certain options of issues (provided those options are available to them). To setup priorities.csv, enter the id of the priority issue and the option id that your puppets should choose (separated by a comma). A full list of all known issues and their options is available [here](https://forum.nationstates.net/viewtopic.php?f=13&t=88). Keep in mind that option IDs start at 0. Additionally; to highlight an issue for manual attention, input the id of the issue and "!" as the option id.

To provide invaluable assistance to the maintainers of the Issues Spoiler List, a series of helpful priorities are provided in the priorities.csv file of this repository. Currently, these priorities are focused on gaining eligibility for the rare issue #1353; which requires you to have a one-child policy *and* prohibit abortion.

### Running
To run the script, open command prompt (or terminal) to the folder where your puppets.csv and priorities.csv files are located. To do this on Windows, go to the folder, then shift+right click and press "open powershell window here". For Mac, follow [these steps](https://stackoverflow.com/questions/420456/open-terminal-here-in-mac-os-finder/7054045#7054045).

Then, type the command ```py -3.8 -m answerer``` (mac users should do ```python3 -m answerer```). This should run the script and generate both an output.txt file and an output.html file, in the same folder. These files have links, following which should answer your puppets' issues. 

The output.txt file *should* be empty, as the **only supported method** of using this script is by the *issue_link_output.html* file *with* the *answerer_userscript* userscript installed. This is to ensure it remains compliant with [this ruling by [violet]](https://forum.nationstates.net/viewtopic.php?p=37664553#p37664553).

#### ANOTHER, MORE IMPORTANT SECURITY DISCLAIMER ####
The userscript needs to match on local files in order to work. This requires changing your browser settings ([tutorials for Chrome and Firefox here](https://stackoverflow.com/questions/9931115/run-greasemonkey-on-html-files-located-on-the-local-filesystem)) to allow this functionality. The setting defaults to off because there is the potential for a malicious userscript to open any of your local files (if this setting is on) and send them off to a malicious party. I'm explaining this *because I'm **not** doing it*; you can read the entire source of the provided *answerer_userscript* to verify - but if you turn this setting on, you are creating and accepting that risk.

To minimise the risk of malicious activity, ensure that you fully trust every active userscript you have installed *before* changing these settings.

### License
The [original](https://github.com/jmikk/gotIssues) *gotIssues* script package by 9003 is licensed under the MIT License.<br>
The modified script package (known as *answerer*) by SherpDaWerp is licensed under the Apache License 2.0.
