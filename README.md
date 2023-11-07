# NursingSelection Program

## UML Diagram
![Nursing Program](http://plantuml.com/plantuml/svg/5SqnZW8n34RXVa-nN22MAAdc9YEJiJ8HiHFzjeMuFKprklTj7en87N-tRdNa8OdnVqOiVn21twNrEFEPBgZJGYnAdKel-IJkoaYoX7Th-y9iO2Lb3m6jmNQDzzOzohg8JUpuzGi0)


The `NursingSelection` program is a Java application designed to simulate the selection process of students for a nursing program based on various academic criteria. It uses a binary tree to evaluate each student's qualifications and a simple scoring system to determine their eligibility.

## Program Architecture

### Classes and Nested Classes

The program consists of the following classes and nested static classes:

- `NursingSelection`
    - This is the main class that contains the `main` method and other helper methods such as `generateRandomName` to support the simulation of the student selection process.

- `Node`
    - This nested static class represents the nodes of a binary tree, each holding a criterion, a weight, and references to child nodes.

- `BinaryTree`
    - Another nested static class which represents the decision-making structure with a root node and a method `evaluateGPA` to assess student criteria against the tree structure.

- `Student`
    - This nested static class encapsulates student data including name, score breakdown, and total score.

### Binary Tree Structure

The binary tree is used to model the decision criteria:

- The root node checks if a student has all prerequisites.
- The left subtree checks science GPA related criteria.
- The right subtree checks non-science GPA related criteria.

Each leaf node represents a terminal criterion with an associated weight.

### Student Evaluation

The program generates a list of 1000 students with random names and randomly determined criteria. Each student's qualifications are evaluated against the binary tree structure to calculate their total score.

## Code Structure

The code is structured as a single Java file with multiple nested classes to represent the program's logic. It uses standard Java libraries and the `org.json` library to handle JSON operations.

## Requirements

 - The program requires Java 8 or higher to run.
 - The program requires the `org.json` library to generate JSON files. (can be included as a Maven or Gradle dependency if you are using a build tool)

## Usage

To run the `NursingSelection` program:

1. Ensure you have Java installed on your system.
2. Compile the Java file:
   ```shell
   javac NursingSelection.java
    ```
3. Run the program:
4. ```shell
   java NursingSelection
   ```
5. The program will generate a list of 1000 students and display the top 10 students with the highest scores.
6. The program will also generate two JSON files:
   - `selected.json` contains the list of selected students.
   - `rejected.json` contains the list of rejected students.
   - Each JSON file contains the student's name, total score, and score breakdown.

## Sample JSON Output
### selected.json
```json
{"selectedCandidates": [
    {
        "scoreBreakdown": {
            "hasAllPreReqs": 20,
            "nonScienceGPAGreaterThan2_5": 25,
            "hasAaAs": 10,
            "scienceGPAGreaterThan3_0": 25,
            "teasScoreGreaterThan62": 20
        },
        "name": "William Hamilton",
        "totalScore": 100
    },
    {
        "scoreBreakdown": {
            "hasAllPreReqs": 20,
            "nonScienceGPAGreaterThan2_5": 25,
            "hasAaAs": 10,
            "scienceGPAGreaterThan3_0": 25,
            "teasScoreGreaterThan62": 20
        },
        "name": "Steven Patterson",
        "totalScore": 100
    }
]}
```

### rejected.json
```json
{"rejectedCandidates": [
    {
        "scoreBreakdown": {
            "hasAllPreReqs": 20,
            "nonScienceGPAGreaterThan2_5": 25,
            "hasAaAs": 0,
            "scienceGPAGreaterThan3_0": 0,
            "teasScoreGreaterThan62": 0
        },
        "name": "Dorothy Smith",
        "totalScore": 45
    },
    {
        "scoreBreakdown": {
            "hasAllPreReqs": 20,
            "nonScienceGPAGreaterThan2_5": 25,
            "hasAaAs": 0,
            "scienceGPAGreaterThan3_0": 25,
            "teasScoreGreaterThan62": 0
        },
        "name": "Mary Johnson",
        "totalScore": 70
    }
]}
```
This project is licensed under the MIT License - see the LICENSE file for details.
