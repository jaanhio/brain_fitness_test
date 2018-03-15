# WDI Project #1: The Game

This is a memory game that requires users to remember the light up sequence and input the correct sequence correctly in order to proceed to next level.

DEMO: https://jaanhio.github.io/brain_fitness_test/

Further details on project scope: https://github.com/wdi-sg/wdi-better-underdog/tree/master/project-1

---

# Design process

Sketch + invision are used in the design process via creation of mockups.

As increasing number of users are moving towards the mobile platform, i have decided to take the mobile-first approach for my MVP. Once building of MVP is completed, design for larger screen devices (e.g desktop, laptops, tablets) will be implemented to allow for a better user experience.

To ensure an enjoyable user experience, layouts and dimensions of components are carefully considered. 

I have decided to go for a clean minimalist approach to make it clear what users have to do without further explanations.

Buttons and game components are centered horizontally and placed closer to bottom of screen to allow for comfortable access using one hand.

Colors (pastel colors), fonts, shapes, animations are selected for a more cheerful gaming experience.

Further details on my design can be found here: 
https://projects.invisionapp.com/share/MAG9LNDNW93#/screens/283952611

---

# Challenges 

The main challenge of building this project is implementing the game sequence (i.e tile lighting sequence, user inputs, checking of inputs etc) correctly. 

Due to the asynchronous nature of Javascript, various web APIs methods (setTimeout, setInterval, clearInterval) are used to queue the sequences.

An alternative to the above might be with the use of Promises. More research/testing has to be done to check feasiblity of implementatiom with Promises.

---

Feel free to drop me a message if there's any question!