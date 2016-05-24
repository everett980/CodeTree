# CodeTree
###What it does
CodeTree is a tool that allows users to enter code, and see if they are or are not using a predefined structure of JavaScript code. Users can see watch the criteria update as they type, as well as be informed of any syntax errors they have made. Users can also easily add their own rules through an easy pop up, or delete any rule. If a user has created a set of rules which they are particularly fond of, they can get an easy, shareable link to send to anyone else. A CodeTree link generated this way will automatically add all of the rules the previous user defined, as well as continue to allow the new user to add their own rules or delete any rules.

###Technology Used
This is an entirely front-end application built using the ReactJS framework. Redux is used to provide convenient data management. React-Router is used in order to handle shared links. React-Modal greatly simplifies the creation of the pop up used when adding rules. Lastly, and most importantly, Acorn was used to parse the JavaScript code provided by the user. I chose Acorn over other options because it claims to be faster than other parsers, and it is also smaller than other parsers. Being smaller means it is less demanding to load the framework onto the front end, which is always a benefit.

###How to Try It
After cloning the repo, change directory to browser and npm install. After that run npm run dev and then go to localhost:3000. Ctrl + H will toggle the view of the redux store. Enter code into the text area and watch the rules on the left automatically pass and fail appropriately. Easily add rules through a pop up modal, then edit your code and see if you are still passing all the rules! Any parsing errors will be displayed below.

###Files Worth Looking At
#####browser/src/containers/CodeAnalysis/CodeAnalysis.js
This is where the tree traversal logic is as well as displaying all the UI either directly or through child components.
#####browser/src/redux/modules/ruleManager.js
This contains the reducer and actions I wrote for managing the tests that a user has added as well as if they are black listed or white listed and any locations where the rule is found.
#####browser/src/components/RuleBox/RuleBox.js
This component contains child components which display each rule as well as whether or not the rule is passing or failing.
#####browser/src/components/DisplayRule/DisplayRule.js
This component displays all the details of a current rule, whether it is white listed or black listed, as well as if it is currently passing or failing.
#####browser/src/components/ErrorDisplay/ErrorDisplay.js
This component simply displays any syntax errors found by acorn, or tells the user they are all clear.
#####browser/src/components/ModalWrapper/ModalWrapper.js
This is where I created the modal used to add new rules.
#####browser/src/redux/modules/modalCtrl.js
This is a very simple reducer used to toggle whether the add rule modal is open or closed, accessed from multiple components.
