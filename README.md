# pq

## Created as a prototype for my internship at PracticeQuest.
A mix-and-match style program with a randomizable order of questions. Clicking _Generate Question_ creates a question that requires the user to either number order the steps or match a step to an order number. 

### Question Types
1. Number Order
   - Assign the number to the item in the correct order.
2. Item Order
   - Order the items according to the step listed.

### Features
1. Shuffle Questions
   - Randomizes the item order for both types of questions (you'll have to generate a new question for this to take place).
2. Generate Fake Responses
   - This is for the second question type. In practice, it will draw a question from a different database that isn't in the question object itself.

### Grading
Grading in this program works differently and provides partial credit. Partial credit comes from a sequence-like system that can be better explained [here](https://moodle.org/mod/forum/discuss.php?d=378830).

**Disclaimer**: The grading system in the prototype is not a 1 on 1 match with the concept explained in the forum. The difference is that an element can be in the right spot, but it won't get 100% unless all of the elements before it are there and same for after.


<sub> Please don't judge the style of the .js file. It's for me to laugh at later when I get better at JavaScript. I only had a week to do all of this 😭. </sub>
