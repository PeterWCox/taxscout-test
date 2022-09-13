# TAXSCOUT - TAKEHOME TEST (PETER COX)

## 1 Demo
![Alt Text](./demo.gif)

## 2 Getting Started
1. git clone git@github.com:PeterWCox/taxscout-test.git
2. cd taxscout-test && npm i 
3. Run npm start as usual

## 3 Tech Stack
1. ReactJS
2. Typescript (used liberally in some places)
3. Redux (Redux-Toolkit)

## 4 Learning Points
1. Used a lot of CSS I hadn't done much of before (i.e. searchbar tooltip)
2. The API is annoying in that the typing of the response can only be known at runtime (i.e. response.works can be either an arry of objects if >1 search result, but just a plain object if only 1 result)
3. The API docs are not great - it was not obvious that you could embed a search term in '' marks, at first I thought the API
only worked for one word. 
4. Importance of testing API's and having a play instead of taking them for granted.
5. The Tooltip CSS is a bit of a fudge, I really struggled to get the width to scale as I liked - however does look good on most
resolutions.

## 5 Wish I could have dones
1. Scaffold a Next.JS app (not enough experience)
2. Unit testing (I have done some unit testing in the past, but not enough experience to do it quickly)
3. Better CSS for tooltip 
4. Lift more of the stateup into redux (e.g. searchTerm etc) instead of mix and matching
5. Accessibility i.e. ARIA
6. Add something nice on the home page i.e. a grid of cards, but ran out of time
7. Use a service class instead of doing all the work in the repository class
8. Styled components (only have a very basic understanding of them but don't look too hard if not relying on 
a framework like MaterialUI
9. Use a framework like MaterialUI.....
10. I couldn't get 'click away' to work, without making the anchor tags ipossible to click - have tried moving the onblur/onfocus events but had no success.

With that in mind, I tried to write really clean code without going too overboard with the components - you can see
that all the logic is abstracted away from the components and reducer which in my view makes for really nice clean code. 

Peter Cox