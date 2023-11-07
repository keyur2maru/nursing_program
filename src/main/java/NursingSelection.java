import java.io.IOException;
import java.util.*;
import java.nio.file.*;
import org.json.*;

// Define a class named NursingSelection
public class NursingSelection {

    // Define a static nested class named Node to represent nodes in a binary tree
    static class Node {
        String criterion; // A criterion string associated with the node
        int weight;      // A weight assigned to the criterion
        Node left;       // Reference to the left child node
        Node right;      // Reference to the right child node

        // Constructor to initialize a Node object
        public Node(String criterion, int weight) {
            this.criterion = criterion;
            this.weight = weight;
            left = null;
            right = null;
        }
    }

    // Define a static nested class named BinaryTree
    static class BinaryTree {
        Node root; // Reference to the root node of the binary tree

        // Constructor to initialize a BinaryTree object with a null root
        public BinaryTree() {
            root = null;
        }

        // Method to evaluate the GPA (Grade Point Average) of a student based on criteria
        public Map<String, Integer> evaluateGPA(Node currentNode, Map<String, Boolean> studentCriteria) {
            Map<String, Integer> scoreMap = new HashMap<>();
    
            if (currentNode == null) return scoreMap;
    
            Boolean metCriterion = studentCriteria.get(currentNode.criterion);
            
            // Assign zero score if criterion is not met, otherwise the actual weight
            scoreMap.put(currentNode.criterion, metCriterion != null && metCriterion ? currentNode.weight : 0);
            
            // Merge the maps from left and right subtrees regardless of the criterion being met or not
            Map<String, Integer> leftScores = evaluateGPA(currentNode.left, studentCriteria);
            Map<String, Integer> rightScores = evaluateGPA(currentNode.right, studentCriteria);
            
            // Merge the left and right scores into the scoreMap, this will ensure all criteria are included
            scoreMap.putAll(leftScores);
            scoreMap.putAll(rightScores);
            
            return scoreMap;
        }
    }

    // Define a static nested class named Student
    static class Student {
        String name;                   // Student's name
        Map<String, Integer> scoreBreakdown; // Map of criterion scores
        int totalScore;                // Total score calculated from the criterion scores

        // Constructor to initialize a Student object
        Student(String name, Map<String, Integer> scoreBreakdown) {
            this.name = name;
            this.scoreBreakdown = scoreBreakdown;

            // Calculate the total score by summing the values in the scoreBreakdown map
            this.totalScore = scoreBreakdown.values().stream().mapToInt(Integer::intValue).sum();
        }
    }

    // Method to generate a random name
    public static String generateRandomName() {
        String[] firstNames = {"John", "Jane", "Michael", "Emily", "William", "Linda", "Robert", "Jessica", "David", "Sarah", "Richard", "Karen", "Joseph", "Nancy", "Thomas", "Susan", "Charles", "Lisa", "Christopher", "Betty", "Daniel", "Margaret", "Matthew", "Sandra", "Anthony", "Ashley", "Donald", "Kimberly", "Mark", "Donna", "Paul", "Carol", "Steven", "Michelle", "Andrew", "Emily", "Kenneth", "Amanda", "George", "Melissa", "Joshua", "Deborah", "Kevin", "Stephanie", "Brian", "Rebecca", "Edward", "Laura", "Ronald", "Sharon", "Timothy", "Cynthia", "Jason", "Kathleen", "Jeffrey", "Amy", "Ryan", "Shirley", "Gary", "Angela", "Jacob", "Helen", "Nicholas", "Anna", "Eric", "Brenda", "Stephen", "Pamela", "Jonathan", "Nicole", "Larry", "Samantha", "Justin", "Katherine", "Scott", "Emma", "Brandon", "Ruth", "Benjamin", "Christine", "Samuel", "Catherine", "Gregory", "Debra", "Frank", "Rachel", "Alexander", "Carolyn", "Raymond", "Janet", "Patrick", "Virginia", "Jack", "Maria", "Dennis", "Heather", "Jerry", "Diane", "Tyler", "Julie", "Aaron", "Joyce", "Jose", "Victoria", "Adam", "Olivia", "Henry", "Kelly", "Nathan", "Christina", "Douglas", "Lauren", "Zachary", "Joan", "Peter", "Evelyn", "Kyle", "Judith", "Walter", "Megan", "Ethan", "Cheryl", "Jeremy", "Andrea", "Harold", "Hannah", "Keith", "Martha", "Roger", "Jacqueline", "Noah", "Frances", "Gerald", "Gloria", "Carl", "Ann", "Terry", "Teresa", "Sean", "Kathryn", "Arthur", "Sara", "Lawrence", "Janice", "Austin", "Jean", "Jesse", "Alice"};
        String[] lastNames = {"Smith", "Johnson", "Brown", "Williams", "Jones", "Miller", "Davis", "Garcia", "Rodriguez", "Wilson", "Martinez", "Anderson", "Taylor", "Thomas", "Hernandez", "Moore", "Martin", "Jackson", "Thompson", "White", "Lopez", "Lee", "Gonzalez", "Harris", "Clark", "Lewis", "Robinson", "Walker", "Perez", "Hall", "Young", "Allen", "Sanchez", "Wright", "King", "Scott", "Green", "Baker", "Adams", "Nelson", "Hill", "Ramirez", "Campbell", "Mitchell", "Roberts", "Carter", "Phillips", "Evans", "Turner", "Torres", "Parker", "Collins", "Edwards", "Stewart", "Flores", "Morris", "Nguyen", "Murphy", "Rivera", "Cook", "Rogers", "Morgan", "Peterson", "Cooper", "Reed", "Bailey", "Bell", "Gomez", "Kelly", "Howard", "Ward", "Cox", "Diaz", "Richardson", "Wood", "Watson", "Brooks", "Bennett", "Gray", "James", "Reyes", "Cruz", "Hughes", "Price", "Myers", "Long", "Foster", "Sanders", "Ross", "Morales", "Powell", "Sullivan", "Russell", "Ortiz", "Jenkins", "Gutierrez", "Perry", "Butler", "Barnes", "Fisher", "Henderson", "Coleman", "Simmons", "Patterson", "Jordan", "Reynolds", "Hamilton", "Graham", "Kim", "Gonzales", "Alexander", "Ramos", "Wallace", "Griffin", "West", "Cole", "Hayes", "Chavez", "Gibson", "Bryant", "Ellis", "Stevens", "Murray", "Ford", "Marshall", "Owens", "Mcdonald", "Harrison", "Ruiz", "Kennedy", "Wells", "Alvarez", "Woods", "Mendoza", "Castillo", "Olson", "Webb"};

        Random rand = new Random();
        return firstNames[rand.nextInt(firstNames.length)] + " " + lastNames[rand.nextInt(lastNames.length)];
    }

    // Main method where program execution begins
    public static void main(String[] args) {
        BinaryTree tree = new BinaryTree(); // Create a binary tree

        // Create the structure of the binary tree with criteria and weights
        tree.root = new Node("hasAllPreReqs", 20);

        // Science GPA check
        tree.root.left = new Node("scienceGPAGreaterThan3_0", 25);
        tree.root.left.left = new Node("hasAaAs", 10);
        tree.root.left.left.left = new Node("teasScoreGreaterThan62", 20);

        // Non-Science GPA check
        tree.root.right = new Node("nonScienceGPAGreaterThan2_5", 25);
        tree.root.right.left = new Node("hasAaAs", 10);
        tree.root.right.left.left = new Node("teasScoreGreaterThan62", 20);

        List<Integer> totalScores = new ArrayList<>(); // List to store total scores of students
        Random rand = new Random();
        List<Student> students = new ArrayList<>(); // List to store student objects
        List<String> alreadyGeneratedNames = new ArrayList<>(); // List to store already generated names

        // Simulate the evaluation for 1000 students
        for (int i = 0; i < 1000; i++) {
            // Generate a random name that is not already generated
            String studentName = generateRandomName();
            while (alreadyGeneratedNames.contains(studentName)) {
                studentName = generateRandomName();
            }
            alreadyGeneratedNames.add(studentName);
            Map<String, Boolean> studentCriteria = new HashMap<>(); // Map to store student criteria

            // Generate random values for student criteria
            studentCriteria.put("hasAllPreReqs", rand.nextBoolean());
            studentCriteria.put("scienceGPAGreaterThan3_0", rand.nextBoolean());
            studentCriteria.put("nonScienceGPAGreaterThan2_5", rand.nextBoolean());
            studentCriteria.put("hasAaAs", rand.nextBoolean());
            studentCriteria.put("teasScoreGreaterThan62", rand.nextBoolean());

            // Evaluate GPA based on criteria and modify scores accordingly
            Map<String, Integer> scoreBreakdown = tree.evaluateGPA(tree.root, studentCriteria);

            // Calculate the total score of the student
            int totalScore = scoreBreakdown.values().stream().mapToInt(Integer::intValue).sum();
            totalScores.add(totalScore); // Add the total score to the list

            // Display student information and scores
            System.out.println(studentName + ":");
            scoreBreakdown.forEach((criterion, score) -> System.out.println("  " + criterion + " - " + score + " points"));
            System.out.println("Total score: " + totalScore);
            System.out.println("-----");

            // Create a Student object and add it to the list of students
            students.add(new Student(studentName, scoreBreakdown));
        }

        // Calculate the average score of all students
        int sum = totalScores.stream().mapToInt(Integer::intValue).sum();
        System.out.println("Average score: " + sum / totalScores.size());

        // Sort the list of students based on their total scores in descending order
        students.sort((s1, s2) -> Integer.compare(s2.totalScore, s1.totalScore));

        // Create JSON objects to store selected and rejected candidates
        JSONObject selectedJSONOutput = new JSONObject();
        JSONArray selectedCandidates = new JSONArray();

        // Add the top 200 students with the highest scores to the selectedCandidates JSON array
        for (int i = 0; i < 200 && i < students.size(); i++) {
            JSONObject studentJSON = new JSONObject();
            studentJSON.put("name", students.get(i).name);
            studentJSON.put("totalScore", students.get(i).totalScore);
            studentJSON.put("scoreBreakdown", students.get(i).scoreBreakdown);
            selectedCandidates.put(studentJSON);
        }
        selectedJSONOutput.put("selectedCandidates", selectedCandidates);

        // Create JSON objects to store rejected candidates
        JSONObject rejectedJSONOutput = new JSONObject();
        JSONArray rejectedCandidates = new JSONArray();

        // Add students beyond the top 200 to the rejectedCandidates JSON array
        for (int i = 200; i < students.size(); i++) {
            JSONObject studentJSON = new JSONObject();
            studentJSON.put("name", students.get(i).name);
            studentJSON.put("totalScore", students.get(i).totalScore);
            studentJSON.put("scoreBreakdown", students.get(i).scoreBreakdown);
            rejectedCandidates.put(studentJSON);
        }
        rejectedJSONOutput.put("rejectedCandidates", rejectedCandidates);

        try {
            // Write the selected and rejected JSON outputs to files with indentation
            Files.write(Paths.get("selected.json"), selectedJSONOutput.toString(4).getBytes());
            Files.write(Paths.get("rejected.json"), rejectedJSONOutput.toString(4).getBytes());
        } catch (IOException e) {
            e.printStackTrace(); // Print any IOException that occurs during file writing
        }
    }
}