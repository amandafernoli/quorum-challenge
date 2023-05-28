# Quorum Challenge

### What was done

For this coding challenge, was provided a dataset of legislators, bills, votes, and vote results in CSV files. 

The goal is to develop a program to bring the list of how many bills a certain legislator voted yes and how many voted no.
Also how many and which legislators voted yes and no for each given bill. After that, the result set must be stored in CSV files.


### Running the application

You should have [Node.js](https://nodejs.org/en) to run this application. The version used was 18.12.1.

To run this app, clone the repository, go to main folder and run the commands below in terminal

- Installing the dependencies
```shell
npm i
```

- Running the application
```shell
npm run dev
```


### Answering the challenge questions

1. Discuss your solution’s time complexity. What tradeoffs did you make?

I used the principle of single responsibility, I tried to use as few loops as possible to reduce complexity. I believe that in BillService the complexity is O(n²) and this is the highest complexity of the project. I reduced the coupling of functions whenever possible. I think the code would improve a lot if the responsibility for fetching the foreign key was in the database access query and not in the code.

2. How would you change your solution to account for future columns that might be requested, such as “Bill Voted On Date” or “Co-Sponsors”?

I would change the models to receive the data, I would add data parameters in the functions to filter by dates but optionally. If it were, for example, the Co-sponsor, I would add one more field in the Bills interface. But I believe it would not have a huge impact on the project.

3. How would you change your solution if instead of receiving CSVs of data, you were given a list of legislators or bills that you should generate a CSV for?

My solution could receive the list without major impacts, as the function to read the CSV is modular and I could stop using it if that happened and create a new function to receive the list.

4. How long did you spend working on the assignment?

Around 4 hours. Finding the best library to work with CSV, defining the folder structure, designing the entities as if they were tables for a better understanding of the links between them, developing the solution and CSV conversion, were the steps I took to develop the solution.
